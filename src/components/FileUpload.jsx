import { useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";

export default function FileUpload({ onFileSelect }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (onFileSelect) {
      onFileSelect(selected);
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        border: "2px dashed #90caf9",
        borderRadius: 3,
        p: 4,
        textAlign: "center",
        bgcolor: "#f9fbff",
        cursor: "pointer",
        transition: "0.3s",
        "&:hover": { borderColor: "#1976d2", bgcolor: "#f1f5ff" },
      }}
    >
      <Typography variant="h6" gutterBottom>
        📂 Upload File
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {file ? `Selected: ${file.name}` : "Drag & Drop or Click to Upload"}
      </Typography>

      <Button
        variant="contained"
        component="label"
        sx={{ mt: 2, borderRadius: 2 }}
      >
        Choose File
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
    </Paper>
  );
}
