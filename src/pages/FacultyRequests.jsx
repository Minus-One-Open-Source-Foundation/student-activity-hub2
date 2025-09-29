import React, { useState, useEffect } from 'react';
import { getAllPendingEvents, getPendingEventsByType, approveEvent, rejectEvent, getAllEvents, getEventsByStatus } from '../services/api';
import './FacultyRequests.css';

const FacultyRequests = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'approved', 'rejected'
  const [typeFilter, setTypeFilter] = useState('all'); // 'all', 'HACKATHON', 'WORKSHOP', 'INTERNSHIP'
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    fetchEvents();
  }, [filter, typeFilter]);

  const fetchEvents = async () => {
    setLoading(true);
    setError('');
    try {
      let response;
      
      if (filter === 'all') {
        response = await getAllEvents();
      } else if (filter === 'pending') {
        if (typeFilter === 'all') {
          response = await getAllPendingEvents();
        } else {
          response = await getPendingEventsByType(typeFilter);
        }
      } else {
        response = await getEventsByStatus(filter.toUpperCase());
      }
      
      setEvents(response.data || []);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to fetch events. Please try again.');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (eventId) => {
    setActionLoading(prev => ({ ...prev, [eventId]: 'approving' }));
    try {
      const response = await approveEvent(eventId);
      if (response.data.success) {
        await fetchEvents(); // Refresh the list
        alert('Event approved successfully!');
      } else {
        alert(response.data.message || 'Failed to approve event');
      }
    } catch (err) {
      console.error('Error approving event:', err);
      alert('Failed to approve event. Please try again.');
    } finally {
      setActionLoading(prev => ({ ...prev, [eventId]: null }));
    }
  };

  const handleReject = async (eventId) => {
    setActionLoading(prev => ({ ...prev, [eventId]: 'rejecting' }));
    try {
      const response = await rejectEvent(eventId);
      if (response.data.success) {
        await fetchEvents(); // Refresh the list
        alert('Event rejected successfully!');
      } else {
        alert(response.data.message || 'Failed to reject event');
      }
    } catch (err) {
      console.error('Error rejecting event:', err);
      alert('Failed to reject event. Please try again.');
    } finally {
      setActionLoading(prev => ({ ...prev, [eventId]: null }));
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'PENDING': return 'status-pending';
      case 'APPROVED': return 'status-approved';
      case 'REJECTED': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'HACKATHON': return '💻';
      case 'WORKSHOP': return '🛠️';
      case 'INTERNSHIP': return '🏢';
      default: return '📅';
    }
  };

  return (
    <div className="faculty-requests">
      <div className="requests-header">
        <h1>Student Event Requests</h1>
        <p>Review and manage student activity requests</p>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Status Filter:</label>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Events</option>
            <option value="pending">Pending Only</option>
            <option value="approved">Approved Only</option>
            <option value="rejected">Rejected Only</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Type Filter:</label>
          <select 
            value={typeFilter} 
            onChange={(e) => setTypeFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="HACKATHON">Hackathons</option>
            <option value="WORKSHOP">Workshops</option>
            <option value="INTERNSHIP">Internships</option>
          </select>
        </div>

        <button onClick={fetchEvents} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading events...</p>
        </div>
      ) : (
        <>
          {/* Events Count */}
          <div className="events-count">
            Found {events.length} event{events.length !== 1 ? 's' : ''}
          </div>

          {/* Events List */}
          <div className="events-container">
            {events.length === 0 ? (
              <div className="no-events">
                <h3>No events found</h3>
                <p>There are no events matching your current filters.</p>
              </div>
            ) : (
              events.map((event) => (
                <div key={event.id} className="event-card">
                  <div className="event-header">
                    <div className="event-title-section">
                      <span className="event-icon">{getTypeIcon(event.type)}</span>
                      <div>
                        <h3>{event.title}</h3>
                        <p className="event-type">{event.type}</p>
                      </div>
                    </div>
                    <span className={`status-badge ${getStatusBadgeClass(event.status)}`}>
                      {event.status}
                    </span>
                  </div>

                  <div className="event-content" style={{ position: 'relative' }}>
                    <p className="event-description">{event.description}</p>
                    <div className="event-details">
                      <div className="detail-item">
                        <strong>Student:</strong> {event.userEmail}
                      </div>
                      <div className="detail-item">
                        <strong>Event Date:</strong> {formatDate(event.eventDate)}
                      </div>
                      <div className="detail-item">
                        <strong>Submitted:</strong> {formatDate(event.createdAt)}
                      </div>
                      {event.fileName && (
                        <div className="detail-item">
                          <strong>File:</strong> {event.fileName}
                        </div>
                      )}
                    </div>
                    {event.imageUrl && (
                      <div className="event-image">
                        <img src={event.imageUrl} alt="Event" />
                      </div>
                    )}
                    {/* Status below the event-image/file, inside event-content */}
                    <div style={{ position: 'absolute', right: '2rem', bottom: '1.2rem', width: '120px', textAlign: 'center' }}>
                      {event.status === 'APPROVED' ? (
                        <span className="approved">
                          <FaCheckCircle /> Approved
                        </span>
                      ) : event.status === 'REJECTED' ? (
                        <span className="rejected">
                          <FaExclamationCircle /> Rejected
                        </span>
                      ) : (
                        <span className="pending">
                          <FaExclamationCircle /> Pending
                        </span>
                      )}
                    </div>

                  {event.status === 'PENDING' && (
                    <div className="event-actions">
                      <button
                        onClick={() => handleApprove(event.id)}
                        disabled={actionLoading[event.id]}
                        className="approve-btn"
                      >
                        {actionLoading[event.id] === 'approving' ? (
                          <>
                            <span className="action-spinner"></span>
                            Approving...
                          </>
                        ) : (
                          '✅ Approve'
                        )}
                      </button>
                      <button
                        onClick={() => handleReject(event.id)}
                        disabled={actionLoading[event.id]}
                        className="reject-btn"
                      >
                        {actionLoading[event.id] === 'rejecting' ? (
                          <>
                            <span className="action-spinner"></span>
                            Rejecting...
                          </>
                        ) : (
                          '❌ Reject'
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FacultyRequests;
