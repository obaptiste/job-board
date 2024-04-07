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
  const [jobs, setJobs] = useState<Job[]>(initialJobs || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/jobs?search=${searchTerm}&filter=${filterTerm}`
        );
        const data = await response.json();
        setJobs(data.jobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("An error occurred while fetching jobs.");
      }
      setLoading(false);
    };
    fetchJobs();
  }, [searchTerm, filterTerm]);

  return (
    <div>
      <h1>Find Your Dream Job</h1>
      <p>Explore a wide range of exciting opportunities</p>
      <TextField
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search jobs..."
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
        <MenuItem value="full-time">Full-time</MenuItem>
        <MenuItem value="part-time">Part-time</MenuItem>
        <MenuItem value="remote">Remote</MenuItem>
      </Select>
      {error && <div>Error: {error}</div>}
      <Grid container spacing={2}>
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <JobCard job={job} />
            </Grid>
          ))
        ) : (
          <div>No jobs found.</div>
        )}
      </Grid>
      {loading && (
        <Backdrop open={true}>
          <CircularProgress />
        </Backdrop>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const jobs = await prisma.job.findMany();
  const serializableJobs = jobs.map((job) => ({
    ...job,
    createdAt: job.createdAt?.toISOString(),
    updatedAt: job.updatedAt?.toISOString(),
  }));
  return {
    props: {
      initialJobs: serializableJobs,
    },
  };
};

export default HomePage;
