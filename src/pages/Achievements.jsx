import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  Paper,
  IconButton,
} from "@mui/material";
import { FaTrophy, FaTrash } from "react-icons/fa";

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [achievement, setAchievement] = useState("");

  const addAchievement = () => {
    if (achievement.trim()) {
      setAchievements([...achievements, achievement]);
      setAchievement("");
    }
  };

  const deleteAchievement = (index) => {
    setAchievements(achievements.filter((_, i) => i !== index));
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
          maxWidth: 600,
          borderRadius: 4,
          background: "linear-gradient(135deg, #fff3e0, #ffffff)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={3}
          color="secondary"
        >
          🏆 Achievements
        </Typography>

        {/* Input + Button */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            mb: 3,
          }}
        >
          <TextField
            label="Enter Achievement"
            value={achievement}
            onChange={(e) => setAchievement(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={addAchievement}
            sx={{ minWidth: 120 }}
          >
            Add
          </Button>
        </Box>

        {/* List of Achievements */}
        <List>
          {achievements.length === 0 ? (
            <Typography color="text.secondary" textAlign="center">
              No achievements added yet.
            </Typography>
          ) : (
            achievements.map((ach, i) => (
              <Paper
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  mb: 2,
                  borderRadius: 3,
                  boxShadow: 2,
                  bgcolor: "#fff8e1",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FaTrophy color="#ff9800" />
                  <Typography>{ach}</Typography>
                </Box>
                <IconButton color="error" onClick={() => deleteAchievement(i)}>
                  <FaTrash />
                </IconButton>
              </Paper>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
}
