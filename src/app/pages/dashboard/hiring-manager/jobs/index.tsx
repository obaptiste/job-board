import { GetServerSideProps } from "next";
import prisma from "../../../../lib/prisma";
import { Application, Job, User, ApplicationStatus } from "@prisma/client";
import { Container, Typography, Grid, Button } from "@mui/material";
import { getSession } from "next-auth/react";
import JobCard from "../../../../components/Job/JobCard";
import { updateApplicationStatus } from "../../../../lib/application";

interface HiringManagerDashboardProps {
  jobs: (Job & {
    applications: (Application & {
      applicant: {
        User: User;
        status: ApplicationStatus;
      };
    })[];
  })[];
}

const HiringManagerDashboard: React.FC<HiringManagerDashboardProps> = ({
  jobs,
}) => {
  const handleStatusUpdate = async (
    applicationId: number,
    status: "PENDING" | "UNDER REVIEW" | "ACCEPTED" | "REJECTED"
  ) => {
    try {
      await updateApplicationStatus(applicationId, status);
      //Refresh the page or update the application status in the UI
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        My Job Listings
      </Typography>
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} key={job.id}>
            <JobCard
              job={{
                id: job.id,
                title: job.title,
                company: job.company,
                location: job.location,
              }}
            />
            <Typography variant="h6" gutterBottom>
              Applicants ({job.applications.length})
            </Typography>
            <Grid container spacing={2}>
              {job.applications.map((application) => (
                <Grid item xs={12} sm={6} md={4} key={application.id}>
                  <Typography variant="body1">
                    {application.applicant.User.name}
                  </Typography>
                  <Typography variant="body2">
                    Application Status:{" "}
                    {application.applicant.status
                      ? application?.applicant.status.name
                      : "PENDING"}
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleStatusUpdate(application.id, "ACCEPTED")
                    }
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      handleStatusUpdate(application.id, "REJECTED")
                    }
                  >
                    Reject
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  console.log(req.headers.cookie); // Log the cookies to see if the session cookie is being sent

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
    include: {
      role: true,
    },
  });

  if (!user || user?.role.name !== "hiring_manager") {
    return {
      notFound: true,
    };
  }

  const jobs = await prisma.job.findMany({
    where: {
      creatorId: user.id,
    },
    include: {
      applications: {
        include: {
          applicant: true,
          status: true,
        },
      },
      _count: {
        select: {
          applications: true, // Count the applications for each job
        },
      },
    },
  });

  return {
    props: {
      jobs: JSON.parse(JSON.stringify(jobs)),
    },
  };
};

export default HiringManagerDashboard;
