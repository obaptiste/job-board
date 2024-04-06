import { GetServerSideProps } from "next";
import prisma from "../../app/lib/prisma";
import { Application, Job, User } from "@prisma/client";
import { Container, Typography, Grid, Button } from "@mui/material";
import { getSession } from "next-auth/react";
import JobCard from "../../app/components/Job/JobCard";
import { updateApplicationStatus } from "../../app/lib/application";

interface HiringManagerDashboardProps {
  jobs: (Job & {
    applications: (Application & {
      applicant: User;
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
              Applicants
            </Typography>
            <Grid container spacing={2}>
              {job.applications.map((application) => (
                <Grid item xs={12} sm={6} md={4} key={application.id}>
                  <Typography variant="body1">
                    {application.applicant.name}
                  </Typography>
                  <Typography variant="body2">
                    Application Status: {application.status}
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
  });

  if (!user || user?.role !== "HIRING_MANAGER") {
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
