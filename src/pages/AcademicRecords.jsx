import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

export default function AcademicRecords() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ course: "", grade: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addRecord = () => {
    if (form.course && form.grade) {
      setRecords([...records, form]);
      setForm({ course: "", grade: "" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        bgcolor: "#f5f6fa",
        p: 3,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 700,
          borderRadius: 4,
          background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={3}
          color="primary"
        >
          📘 Academic Records
        </Typography>

        {/* Input fields */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            mb: 3,
          }}
        >
          <TextField
            label="Course"
            name="course"
            value={form.course}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Grade"
            name="grade"
            value={form.grade}
            onChange={handleChange}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addRecord}
            sx={{ minWidth: 120 }}
          >
            Add
          </Button>
        </Box>

        {/* Records Table */}
        <Paper elevation={2} sx={{ overflowX: "auto", borderRadius: 3 }}>
          <Table>
            <TableHead sx={{ bgcolor: "primary.main" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Course
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Grade
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    <Typography color="text.secondary">
                      No records added yet.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                records.map((rec, i) => (
                  <TableRow key={i}>
                    <TableCell>{rec.course}</TableCell>
                    <TableCell>{rec.grade}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>
      </Paper>
    </Box>
  );
}
