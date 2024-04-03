import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import Link from "next/link";

interface JobCardProps {
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {job.title}
        </Typography>
        <Typography color="textSecondary">{job.company}</Typography>
        <Typography color="textSecondary">{job.location}</Typography>
        <Link href={`/jobs/${job.id}`}>
          <Button variant="contained" color="primary">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default JobCard;
