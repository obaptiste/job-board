import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Box,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { GetServerSideProps } from "next";
import prisma from "../app/lib/prisma";
import { Job } from "@prisma/client";
import JobCard from "../app/components/Job/JobCard";

interface HomePageProps {
  initialJobs: Job[];
}

const HomePage = ({ initialJobs }: HomePageProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const response = await fetch(
        `/api/jobs?search=${searchTerm}&filter=${filterTerm}`
      );
      const data = await response.json();
      setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, [searchTerm, filterTerm]);

  return (
    <Box>
      <Box
        style={{
          background: "linear-gradient(to right, #4CAF50, #8BC34A)",
          padding: "3rem",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" gutterBottom>
          Find Your Dream Job
        </Typography>
        <Typography variant="h5" gutterBottom>
          Explore a wide range of exciting opportunities
        </Typography>
        <Box mt={4}>
          <TextField
            placeholder="Search jobs..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Select
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value as string)}
            style={{ marginLeft: "1rem" }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="fulltime">Full-time</MenuItem>
            <MenuItem value="parttime">Part-time</MenuItem>
            <MenuItem value="remote">Remote</MenuItem>
          </Select>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "1rem" }}
          >
            Search
          </Button>
        </Box>
      </Box>
      <Box mt={4} className="jobs-container">
        <Grid container spacing={3}>
          {jobs.length && jobs.map((job) => <JobCard key={job.id} job={job} />)}
          {initialJobs.length &&
            //TODO: swap initial jobs object with jobs state
            initialJobs.map((job) => <JobCard key={job.id} job={job} />)}
        </Grid>
      </Box>
      <Backdrop open={loading} style={{ zIndex: 999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const jobs = await prisma.job.findMany();

  // Convert each job to a serializable format
  const serializableJobs = jobs.map((job) => {
    return {
      ...job,
      // Assuming `createdAt` and `updatedAt` are the Date fields
      // Convert them to ISO strings. Adjust field names as necessary.
      createdAt: job.createdAt?.toISOString(),
      updatedAt: job.updatedAt?.toISOString(),
    };
  });

  return {
    props: {
      initialJobs: serializableJobs,
    },
  };
};

export default HomePage;
