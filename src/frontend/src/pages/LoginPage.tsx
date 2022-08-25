import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";

type LoginUserDate = {
  username: string;
  password: string;
};

enum ROLE {
  ADMIN,
  USER,
}

type LoginUserOutput = {
  access_token: string;
  user: {
    username: string;
    role: ROLE;
  };
};

export default function LoginPage() {
  const { data, mutate } = useMutation<LoginUserOutput, unknown, LoginUserDate>(
    (values) => axios.post("api/login", values),
    {
      onSuccess: (data) => {
        console.log("aldf");
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <Paper elevation={4}>
      <Grid
        container
        sx={{
          height: "80vh",
          width: "70vw",
        }}
      >
        <Grid
          item
          xs={5}
          sx={{
            backgroundColor: "red",
          }}
        >
          image
        </Grid>
        <Grid
          item
          xs={7}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            sx={{
              width: "90%",
              padding: "10px",
            }}
            onSubmit={formik.handleSubmit}
            noValidate
            autoComplete="off"
          >
            <Stack
              spacing={4}
              sx={{
                alignItems: "center",
              }}
            >
              <Typography variant="h3">Welcome to login Page</Typography>

              <TextField
                size="medium"
                label="Username"
                placeholder="Enter Username"
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                fullWidth
              />

              <TextField
                size="medium"
                label="Password"
                type="password"
                name="password"
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
              />

              <Button type="submit">Submit</Button>

              <Typography />
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
