import React, { useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const isInitialMount = useRef(true);
  const navigate = useNavigate()


  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3172/users");
      setUsers(response.data.data);
      console.log(users);
    } catch (error) {
      console.error("users Getting failed:", error);
    }
  };

  function handleDelete() {
    // code to run when the first button in the first button group is clicked
  }

  const handleCreateUser=async() => {
    navigate("/add-edit-user")
  //  try {
  //     const response = await axios.post("http://localhost:3172/auth/register", );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("users Getting failed:", error);
  //   }
  }

  function handleEdit() {
    // code to run when the second button in the first button group is clicked
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      getUsers();
      console.log("useEffect called");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container
      sx={{
        maxWidth: 1000,
        alignItems: "center",
        textAlign: "center",
        mt: 5
      }}
    >
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateUser}>
        Add
      </Button>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row._id}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.password}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => handleDelete(row)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        endIcon={<EditIcon />}
                        color="success"
                        onClick={() => handleEdit(row)}
                      >
                        Edit
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Dashboard;
