import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Item = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh"
      }}
    >
      {children}
    </Box>
  );
};

const Register = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [contact, setContact] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      const saveUserResponse = await axios.post(
        "http://localhost:3172/auth/register",
        {
          name ,
          email,
          contact,
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
      onLogin();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const onLogin = () => {
    navigate("/login");
  };

  return (
    <Container fixed>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 9,
          bgcolor: "#cfe8fc"
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Item>
              <img
                src="https://images.unsplash.com/photo-1561571994-3c61c554181a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZ1bGwlMjBoZCUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="Random"
                style={{ width: "100%", height: "100%" }}
              />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Container maxWidth="xs">
                <Box mt={8}>
                  <Typography variant="h3" gutterBottom textAlign={"center"}>
                    {" "}
                    Register{" "}
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
                            id="contact"
                            label="Contact Number"
                            variant="outlined"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
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
                          Register{" "}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                  <Typography
                    variant="caption"
                    gutterBottom
                    textAlign={"left"}
                    onClick={() => {
                      onLogin();
                    }}
                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    {" "}
                    Already Have An Account? Login Here!{" "}
                  </Typography>
                </Box>
              </Container>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Register;
