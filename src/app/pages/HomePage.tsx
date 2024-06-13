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
import { Job } from "@prisma/client";
import { HomePageProps } from ".";

export const HomePage = ({ initialJobs }: HomePageProps) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
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
      <Box mt={4}>
        <Grid container spacing={3}>
          {jobs &&
            jobs?.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job.id}>
                <Card
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="h5">{job.title}</Typography>
                    <Typography variant="subtitle1">{job.company}</Typography>
                    <Typography variant="body1">{job.location}</Typography>
                    <Typography variant="body2">{job.description}</Typography>
                  </Box>
                  <Box mt={2}>
                    <Button variant="contained" color="primary">
                      Apply
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
      <Backdrop open={loading} style={{ zIndex: 999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};
