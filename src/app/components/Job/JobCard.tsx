import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface JobCardProps {
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { data: session } = useSession();
  const isHiringManager = session?.user?.role === "HIRING_MANAGER";
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {job.title}
        </Typography>
        <Typography color="textSecondary">{job.company}</Typography>
        <Typography color="textSecondary">{job.location}</Typography>
        <Link
          href={
            isHiringManager
              ? `/dashboard/hiring-manager/jobs/${job.id}`
              : `/jobs/${job.id}`
          }
          passHref
        >
          <Button variant="contained" color="primary" component="a">
            {isHiringManager ? "Edit Job" : "Apply for Job"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default JobCard;
