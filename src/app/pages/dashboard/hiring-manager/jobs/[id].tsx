import { GetServerSideProps } from "next";
import prisma from "../../../../lib/prisma";
import { Job, Application } from "@prisma/client";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { getSession } from "next-auth/react";

interface JobDetailsPageProps {
  job: Job & {
    applications: (Application & {
      applicant: {
        name: string;
        email: string;
      };
    })[];
  };
}

const JobDetailsPage: React.FC<JobDetailsPageProps> = ({ job }) => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        {job.title}
      </Typography>
      <Typography gutterBottom>{job.company}</Typography>
      <Typography gutterBottom>{job.location}</Typography>
      <Typography variant="body1" gutterBottom>
        {job.description}
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Applicants
      </Typography>
      <Grid container spacing={3}>
        {job.applications.map((application) => (
          <Grid item xs={12} sm={6} md={4} key={application.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {application.applicant.name}
                </Typography>
                <Typography color="textSecondary">
                  {application.applicant.email}
                </Typography>
                <Typography color="textSecondary">
                  Application Status:{" "}
                  {application.statusId === 1 ? "Pending" : "Under Review"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const session = await getSession({ req });

  if (!session || session?.user?.role?.name !== "hiring_manager") {
    return {
      notFound: true,
    };
  }

  const jobId = parseInt(params?.id as string);
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
    include: {
      applications: {
        include: {
          applicant: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!job) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      job: JSON.parse(JSON.stringify(job)),
    },
  };
};

export default JobDetailsPage;
