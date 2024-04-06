import react from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { createJob } from "../../lib/jobs";

interface JobFormData {
  title: string;
  company: string;
  location: string;
  description: string;
}

const JobForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<JobFormData>();
  const [error, setError] = useState("");

  const onSubmit = async (data: JobFormData) => {
    try {
      await createJob(data);
      reset();
    } catch (error) {
      setError("Error creating job listing. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Create a Job Listing
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("title", { required: true })}
          label="Job Title"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          {...register("company", { required: true })}
          label="Company"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          {...register("location", { required: true })}
          label="Location"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          {...register("description", { required: true })}
          label="Job Description"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        {error && <Typography color="error">{error}</Typography>}
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Job
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default JobForm;
