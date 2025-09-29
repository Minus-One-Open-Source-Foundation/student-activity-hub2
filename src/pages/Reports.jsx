import React, { useState, useEffect } from "react";
import { FaClock, FaCheck, FaTimes, FaSpinner } from "react-icons/fa";
import { facultyAPI } from "../services/api";

export default function PendingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  // Fetch pending requests on component mount
  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      setLoading(true);
      const pendingEvents = await facultyAPI.getPendingEvents();
      setRequests(pendingEvents);
      setError(null);
    } catch (err) {
      console.error('Error fetching pending requests:', err);
      setError('Failed to load pending requests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (eventId) => {
    try {
      setProcessingId(eventId);
      await facultyAPI.approveEvent(eventId);
      
      // Remove the approved request from the list
      setRequests(requests.filter(request => request.id !== eventId));
      
      // Show success message (you could use a toast notification here)
      alert('Event approved successfully!');
    } catch (err) {
      console.error('Error approving event:', err);
      alert('Failed to approve event. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (eventId) => {
    try {
      setProcessingId(eventId);
      await facultyAPI.rejectEvent(eventId);
      
      // Remove the rejected request from the list
      setRequests(requests.filter(request => request.id !== eventId));
      
      // Show success message (you could use a toast notification here)
      alert('Event rejected successfully!');
    } catch (err) {
      console.error('Error rejecting event:', err);
      alert('Failed to reject event. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getEventTypeDisplay = (type) => {
    switch (type) {
      case 'HACKATHON':
        return 'Hackathon';
      case 'WORKSHOP':
        return 'Workshop';
      case 'ACTIVITY':
        return 'Activity';
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div className="pending-requests-wrapper">
        <div className="loading-container">
          <FaSpinner className="spinner" />
          <p>Loading pending requests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pending-requests-wrapper">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={fetchPendingRequests} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pending-requests-wrapper">
      <h2 className="page-title">Pending Requests</h2>

      {requests.length === 0 ? (
        <div className="no-requests">
          <p>No pending requests at the moment.</p>
        </div>
      ) : (
        requests.map((req) => (
          <div className="request-box" key={req.id}>
            <div className="request-header">
              <h3>{getEventTypeDisplay(req.type)} Request</h3>
              <span className="pending-status">
                <FaClock /> Pending
              </span>
            </div>
            
            <div className="request-content">
              <p><strong>Student:</strong> {req.userEmail}</p>
              <p><strong>Title:</strong> {req.title}</p>
              {req.description && (
                <p><strong>Description:</strong> {req.description}</p>
              )}
              <p><strong>Event Date:</strong> {formatDate(req.eventDate)}</p>
              <p><strong>Submitted:</strong> {formatDate(req.createdAt)}</p>
              
              {/* File info */}
              {req.fileName && (
                <p><strong>File:</strong> {req.fileName}</p>
              )}
              
              <div className="action-buttons">
                <button 
                  className="approve-btn"
                  onClick={() => handleApprove(req.id)}
                  disabled={processingId === req.id}
                >
                  {processingId === req.id ? (
                    <FaSpinner className="spinner" />
                  ) : (
                    <FaCheck />
                  )}
                  Approve
                </button>
                <button 
                  className="reject-btn"
                  onClick={() => handleReject(req.id)}
                  disabled={processingId === req.id}
                >
                  {processingId === req.id ? (
                    <FaSpinner className="spinner" />
                  ) : (
                    <FaTimes />
                  )}
                  Reject
                </button>
              </div>
            </div>
            
            {/* Certificate/Document preview box */}
            <div className="document-preview-box">
              {req.imageUrl ? (
                <img 
                  src={req.imageUrl} 
                  alt="Event document" 
                  className="document-preview"
                />
              ) : (
                <div className="no-document">
                  <p>No document attached</p>
                </div>
              )}
            </div>
          </div>
        ))
      )}

  <style>{`
        .pending-requests-wrapper {
          min-height: 100vh;
          padding: 2rem;
          font-family: 'Inter', sans-serif;
          background: url("/src/assets/bg.jpg") no-repeat center center fixed;
          background-size: cover;
          color: #111;
        }
        .page-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: #333;
        }
        .loading-container, .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
          text-align: center;
        }
        .spinner {
          animation: spin 1s linear infinite;
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #007bff;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .error-message {
          color: #dc3545;
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }
        .retry-btn {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }
        .retry-btn:hover {
          background-color: #0056b3;
        }
        .no-requests {
          text-align: center;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 8px;
          margin: 2rem auto;
          max-width: 500px;
        }
        .request-box {
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          text-align: left;
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 200px;
          transition: transform 0.2s ease;
        }
        .request-content {
          padding-right: 200px;
          flex: 1;
        }
        .request-content p {
          margin: 0.5rem 0;
          line-height: 1.5;
        }
        .request-box:hover {
          transform: translateY(-4px);
        }
        .request-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
          padding-right: 200px;
        }
        .request-header h3 {
          font-size: 1.25rem;
          margin: 0;
        }
        .pending-status {
          display: flex;
          align-items: center;
          font-size: 0.9rem;
          color: #ff9800;
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        .pending-status svg {
          margin-right: 0.3rem;
        }
        .action-buttons {
          margin-top: 1.5rem;
          display: flex;
          gap: 0.75rem;
        }
        .approve-btn, .reject-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          border: none;
          padding: 0.7rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 600;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .approve-btn {
          background-color: #28a745;
          color: #fff;
        }
        .approve-btn:hover:not(:disabled) {
          background-color: #218838;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
        }
        .reject-btn {
          background-color: #dc3545;
          color: #fff;
        }
        .reject-btn:hover:not(:disabled) {
          background-color: #c82333;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
        }
        .approve-btn:disabled, .reject-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .document-preview-box {
          width: 180px;
          height: 160px;
          background: #f8f9fa;
          border: 2px dashed #dee2e6;
          border-radius: 8px;
          position: absolute;
          right: 1rem;
          top: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .document-preview {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 6px;
        }
        .no-document {
          text-align: center;
          color: #6c757d;
          font-size: 0.8rem;
          padding: 1rem;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .pending-requests-wrapper {
            padding: 1rem;
          }
          .request-box {
            min-height: auto;
            flex-direction: column;
          }
          .request-header {
            padding-right: 0;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          .request-content {
            padding-right: 0;
            margin-bottom: 1rem;
          }
          .document-preview-box {
            position: relative;
            right: auto;
            top: auto;
            margin: 1rem auto 0;
            width: 100%;
            max-width: 200px;
          }
          .action-buttons {
            flex-direction: column;
            gap: 0.5rem;
          }
          .approve-btn, .reject-btn {
            width: 100%;
            justify-content: center;
          }
        }

      `}</style>
    </div>
  );
}
