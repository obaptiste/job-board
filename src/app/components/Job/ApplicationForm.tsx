import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useSession } from "next-auth/react";

interface ApplicationFormData {
  resume: FileList;
  coverLetter?: string;
}

interface ApplicationFormProps {
  jobId: number;
  onSubmit: (data: ApplicationFormData) => Promise<void>;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  jobId,
  onSubmit,
}) => {
  const { data: session } = useSession();
  const { register, handleSubmit } = useForm<ApplicationFormData>();
  const [error, setError] = useState("");

  if (!session) {
    return (
      <Typography variant="body1">
        You must be logged in to apply for this job.
      </Typography>
    );
  }

  const submitApplication = async (data: ApplicationFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      setError("Error submitting application. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Apply for this job
      </Typography>
      <form onSubmit={handleSubmit(submitApplication)}>
        <TextField
          {...register("resume", { required: true })}
          type="file"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          {...register("coverLetter")}
          multiline
          variant="outlined"
          label="Cover letter"
          margin="normal"
          rows={4}
          fullWidth
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" fullWidth color="primary">
          Submit Application
        </Button>
      </form>
    </Container>
  );
};

export default ApplicationForm;
