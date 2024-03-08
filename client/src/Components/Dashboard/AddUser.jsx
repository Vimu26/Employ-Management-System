import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AddUser = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const saveUserResponse = await axios.post(
        "http://localhost:3172/auth/register",
        {
          name,
          email,
          password
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const savedUser = saveUserResponse.data;
      console.log(savedUser);
      onClick();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const onClick = () => {
    navigate("/dashboard");
  };

  return (
    <Container fixed>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 5,
          marginBottom: 9,
          height: "80vh"
        }}
      >
        <Container maxWidth="xs">
          <Box mt={12}>
            <Typography variant="h3" gutterBottom textAlign={"center"}>
              {" "}
              Create User{" "}
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      id="name"
                      label="Name"
                      variant="outlined"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      id="email"
                      label="Email"
                      variant="outlined"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      id="password"
                      label="Password"
                      variant="outlined"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    {" "}
                    Create User{" "}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default AddUser;
