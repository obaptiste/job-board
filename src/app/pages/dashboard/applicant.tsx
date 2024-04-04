import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import { Application, Job } from "@prisma/client";
import { Container, Typography, Grid } from "@mui/material";
import { getSession } from "next-auth/react";
import JobCard from "../../components/Job/JobCard";

interface ApplicantDashboardProps {
  applications: (Application & {
    job: Job;
  })[];
}

const ApplicantDashboard: React.FC<ApplicantDashboardProps> = ({
  applications,
}) => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        My Applications
      </Typography>
      <Grid container spacing={3}>
        {applications.map((application) => (
          <Grid item xs={12} sm={6} md={4} key={application.id}>
            <JobCard
              job={{
                id: application.id,
                title: application.job.title,
                company: application.job.company,
                location: application.job.location,
              }}
            />
            <Typography variant="body2">
              Application Status: {application.status}
            </Typography>
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

  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const applications = await prisma.application.findMany({
    where: {
      applicantId: user.id,
    },
    include: {
      job: true,
    },
  });

  return {
    props: {
      applications: JSON.parse(JSON.stringify(applications)),
    },
  };
};

export default ApplicantDashboard;
