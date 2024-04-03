import { GetServerSideProps } from "next";
import prisma from "@/app/lib/prisma";
import { Job } from "@prisma/client";
import { Container, Typography, Button } from "@mui/material";

interface JobDetailsPageProps {
  job: Job;
}

const JobDetailsPage: React.FC<JobDetailsPageProps> = ({ job }) => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        {job.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {job.company}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {job.location}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {job.description}
      </Typography>
      <Button variant="contained" color="primary">
        Apply
      </Button>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const jobId = parseInt(params?.id as string);
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
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
