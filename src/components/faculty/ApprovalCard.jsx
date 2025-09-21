// src/components/faculty/ApprovalCard.jsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  TextField,
  Link,
  Stack,
  Divider,
} from "@mui/material";
import "../../styles/faculty.css";

export default function ApprovalCard({ activity, onApprove, onReject }) {
  const [showReason, setShowReason] = useState(false);
  const [reason, setReason] = useState("");
  const [processing, setProcessing] = useState(false);

  const id = activity.id ?? activity._id;
  const student = activity.student ?? activity.submittedBy ?? {};
  const attachments = activity.attachments ?? activity.files ?? [];

  async function handleApprove() {
    setProcessing(true);
    try {
      await onApprove(id);
    } finally {
      setProcessing(false);
    }
  }

  async function handleReject() {
    setProcessing(true);
    try {
      await onReject(id, reason);
      setShowReason(false);
      setReason("");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <Card variant="outlined" className="approval-card">
      <CardContent>
        <Typography variant="h6" className="title">
          {activity.title ?? "Untitled Activity"}
        </Typography>

        <Typography variant="body2" className="student-line">
          By: {student.name || student.fullName || "Unknown"} —{" "}
          {student.enrollment || student.id || ""}
        </Typography>

        <Typography variant="body1" className="desc">
          {activity.description ?? ""}
        </Typography>

        {attachments.length > 0 && (
          <Stack direction="column" spacing={0.5} className="attachments">
            {attachments.map((att, idx) => (
              <Link
                key={idx}
                href={att.url ?? att.blobUrl ?? att.sasUrl}
                target="_blank"
                rel="noreferrer"
              >
                {att.filename ?? att.name ?? `Attachment ${idx + 1}`}
              </Link>
            ))}
          </Stack>
        )}
      </CardContent>

      <CardActions className="actions">
        <Button
          size="small"
          className="approve"
          onClick={handleApprove}
          disabled={processing}
        >
          {processing ? "Processing..." : "Approve"}
        </Button>
        <Button
          size="small"
          className="reject"
          onClick={() => setShowReason((s) => !s)}
        >
          {showReason ? "Cancel" : "Reject"}
        </Button>
      </CardActions>

      {showReason && (
        <Box className="reject-reason">
          <TextField
            label="Reason for rejection (optional)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            size="small"
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 1 }}>
            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={handleReject}
              disabled={processing}
            >
              Submit Reject
            </Button>
          </Box>
        </Box>
      )}
    </Card>
  );
}
