import { GetServerSideProps } from "next";
import prisma from "../../app/lib/prisma";
import { Job } from "@prisma/client";
import { Container, Typography, Grid } from "@mui/material";
import JobCard from "../../app/components/Job/JobCard";

interface JobsPageProps {
  jobs: Job[];
}

const JobsPage: React.FC<JobsPageProps> = ({ jobs }) => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Available Jobs
      </Typography>
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const jobs = await prisma.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return {
    props: {
      jobs: JSON.parse(JSON.stringify(jobs)),
    },
  };
};

export default JobsPage;
