import React, { useState, useEffect } from "react";
import { FaUpload, FaDownload, FaTrash, FaFilePdf, FaPlus, FaEye, FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import { resumeAPI } from "../services/api";

export default function URMS() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showResumeViewer, setShowResumeViewer] = useState(false);
  const [viewingResume, setViewingResume] = useState(null);
  const [loadingViewer, setLoadingViewer] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    role: '',
    customRole: '',
    isCustomRole: false,
    file: null
  });

  // Function to close the resume viewer and cleanup blob URL
  const closeResumeViewer = () => {
    if (viewingResume && viewingResume.url && viewingResume.url.startsWith('blob:')) {
      URL.revokeObjectURL(viewingResume.url);
    }
    setShowResumeViewer(false);
    setViewingResume(null);
    setLoadingViewer(false);
  };

  // Function to switch between different PDF viewer modes
  const switchViewerMode = (mode) => {
    // Hide all viewers
    const viewers = ['google-viewer', 'direct-viewer'];
    const tabs = ['google-tab', 'direct-tab'];
    
    viewers.forEach(id => {
      const element = document.getElementById(id);
      if (element) element.style.display = 'none';
    });
    
    tabs.forEach((id, index) => {
      const tab = document.getElementById(id);
      if (tab) {
        tab.classList.remove('active');
        if (tabs[index] === `${mode}-tab`) {
          tab.classList.add('active');
        }
      }
    });
    
    // Show selected viewer
    const activeViewer = document.getElementById(`${mode}-viewer`);
    if (activeViewer) {
      activeViewer.style.display = 'block';
    }
  };

  // Predefined company roles that students commonly apply for
  const predefinedRoles = [
    'Software Development Engineer (SDE)',
    'Software Development Engineer in Test (SDET)',
    'Data Analyst',
    'Data Scientist',
    'Business Analyst',
    'Product Manager',
    'UI/UX Designer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'DevOps Engineer',
    'Machine Learning Engineer',
    'Quality Assurance Engineer',
    'Technical Writer',
    'Sales Executive',
    'Marketing Analyst',
    'Financial Analyst',
    'Human Resources Specialist',
    'Consultant',
    'Research Analyst'
  ];

  // Function to categorize roles for better organization
  const getRoleCategory = (role) => {
    const roleUpper = role.toUpperCase();
    if (roleUpper.includes('SOFTWARE') || roleUpper.includes('SDE') || roleUpper.includes('DEVELOPER')) {
      return { category: 'Engineering', color: '#3b82f6' };
    } else if (roleUpper.includes('DATA') || roleUpper.includes('ANALYST') || roleUpper.includes('SCIENTIST')) {
      return { category: 'Analytics', color: '#8b5cf6' };
    } else if (roleUpper.includes('DESIGN') || roleUpper.includes('UI') || roleUpper.includes('UX')) {
      return { category: 'Design', color: '#ec4899' };
    } else if (roleUpper.includes('MARKETING') || roleUpper.includes('SALES')) {
      return { category: 'Sales & Marketing', color: '#f59e0b' };
    } else if (roleUpper.includes('FINANCIAL') || roleUpper.includes('FINANCE')) {
      return { category: 'Finance', color: '#10b981' };
    } else if (roleUpper.includes('HUMAN') || roleUpper.includes('HR')) {
      return { category: 'HR', color: '#ef4444' };
    } else if (roleUpper.includes('PRODUCT') || roleUpper.includes('MANAGER')) {
      return { category: 'Management', color: '#6366f1' };
    } else {
      return { category: 'Other', color: '#64748b' };
    }
  };

  // Get user email from localStorage
  const getUserEmail = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      return user.email;
    }
    return null;
  };

  // Load user resumes on component mount
  useEffect(() => {
    loadUserResumes();
  }, []);

  const loadUserResumes = async () => {
    try {
      setLoading(true);
      const userEmail = getUserEmail();
      if (!userEmail) {
        setError('Please log in to view your resumes');
        return;
      }

      const resumesData = await resumeAPI.getUserResumes(userEmail);
      setResumes(resumesData);
      setError(null);
    } catch (err) {
      console.error('Error loading resumes:', err);
      setError('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please select a PDF file only');
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('File size should be less than 10MB');
        return;
      }
      setUploadForm({...uploadForm, file});
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!uploadForm.role.trim()) {
      alert('Please select or enter a role');
      return;
    }
    
    if (!uploadForm.file) {
      alert('Please select a PDF file');
      return;
    }

    try {
      setUploading(true);
      const userEmail = getUserEmail();
      
      await resumeAPI.uploadResume(userEmail, uploadForm.role.trim(), uploadForm.file);
      
      // Reset form
      setUploadForm({ role: '', customRole: '', isCustomRole: false, file: null });
      setShowUploadForm(false);
      
      // Reload resumes
      await loadUserResumes();
      
      alert('Resume uploaded successfully!');
    } catch (err) {
      console.error('Error uploading resume:', err);
      alert('Failed to upload resume. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleView = async (resume) => {
    try {
      console.log('Viewing resume:', resume);
      console.log('File URL:', resume.fileUrl);
      
      setLoadingViewer(true);
      setShowResumeViewer(true);
      
      // For PDF viewing, we'll use the direct URL but prevent automatic downloads
      let viewUrl = resume.fileUrl;
      
      // Check if the URL needs any modifications for better inline viewing
      if (viewUrl.includes('blob.core.windows.net')) {
        // Azure Blob Storage - ensure no download disposition
        console.log('Detected Azure Blob Storage URL');
        // Don't navigate directly to the URL to prevent download
      }
      
      console.log('Using view URL for iframe:', viewUrl);
      
      // Set the viewing resume without triggering a download
      setViewingResume({ ...resume, url: viewUrl });
      setLoadingViewer(false);
      
    } catch (err) {
      console.error('Error loading resume for view:', err);
      setLoadingViewer(false);
      setShowResumeViewer(false);
      alert('Failed to load resume for viewing. Please try downloading it instead.');
    }
  };

  const handleDownload = async (resume) => {
    try {
      const userEmail = getUserEmail();
      const downloadUrl = await resumeAPI.getDownloadUrl(userEmail, resume.id);
      
      // Open the download URL in a new tab
      window.open(downloadUrl, '_blank');
    } catch (err) {
      console.error('Error downloading resume:', err);
      alert('Failed to download resume. Please try again.');
    }
  };

  const handleDelete = async (resume) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the resume for "${resume.role}"? This action cannot be undone.`
    );
    
    if (!confirmed) return;

    try {
      const userEmail = getUserEmail();
      await resumeAPI.deleteResume(userEmail, resume.id);
      
      // Reload resumes
      await loadUserResumes();
      
      alert('Resume deleted successfully');
    } catch (err) {
      console.error('Error deleting resume:', err);
      alert('Failed to delete resume');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="urms-container">
      <header className="urms-header">
        <h1>Unified Resume Management System</h1>
        <p>Upload, preview, and manage your resumes for different roles</p>
      </header>

      {/* Resume Summary */}
      {!loading && !error && resumes.length > 0 && (
        <div className="resume-summary">
          <div className="summary-card">
            <h3>Resume Portfolio</h3>
            <div className="summary-stats">
              <div className="stat">
                <span className="stat-number">{resumes.length}</span>
                <span className="stat-label">Total Resumes</span>
              </div>
              <div className="stat">
                <span className="stat-number">{[...new Set(resumes.map(r => r.role))].length}</span>
                <span className="stat-label">Different Roles</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Button */}
      <div className="upload-section">
        <button 
          className="upload-btn"
          onClick={() => setShowUploadForm(true)}
          disabled={uploading}
        >
          <FaPlus /> Upload New Resume
        </button>
      </div>

      {/* Upload Form Modal */}
      {showUploadForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Upload Resume</h3>
            <form onSubmit={handleUpload}>
              <div className="form-group">
                <label>Role/Position:</label>
                <select
                  value={uploadForm.isCustomRole ? 'custom' : uploadForm.role}
                  onChange={(e) => {
                    if (e.target.value === 'custom') {
                      setUploadForm({...uploadForm, isCustomRole: true, role: ''});
                    } else {
                      setUploadForm({...uploadForm, isCustomRole: false, role: e.target.value, customRole: ''});
                    }
                  }}
                  required
                >
                  <option value="">Select a role</option>
                  {predefinedRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                  <option value="custom">Custom Role</option>
                </select>
                
                {uploadForm.isCustomRole && (
                  <input
                    type="text"
                    placeholder="Enter custom role/position"
                    value={uploadForm.customRole}
                    onChange={(e) => setUploadForm({...uploadForm, customRole: e.target.value, role: e.target.value})}
                    required
                    style={{ marginTop: '10px' }}
                  />
                )}
              </div>
              
              <div className="form-group">
                <label>Resume (PDF only):</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  required
                />
                {uploadForm.file && (
                  <div className="file-info">
                    <FaFilePdf /> {uploadForm.file.name} ({formatFileSize(uploadForm.file.size)})
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => {
                  setShowUploadForm(false);
                  setUploadForm({ role: '', customRole: '', isCustomRole: false, file: null });
                }}>
                  Cancel
                </button>
                <button type="submit" disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Upload Resume'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Resume Viewer Modal */}
      {showResumeViewer && (
        <div className="resume-viewer-overlay" onClick={closeResumeViewer}>
          <div className="resume-viewer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="resume-viewer-header">
              <div className="resume-viewer-info">
                <h3>{viewingResume ? viewingResume.role : 'Loading...'}</h3>
                <p>{viewingResume ? viewingResume.fileName : 'Please wait'}</p>
              </div>
              <button 
                className="close-viewer-btn"
                onClick={closeResumeViewer}
                title="Close"
              >
                <FaTimes />
              </button>
            </div>
            <div className="resume-viewer-content">
              {loadingViewer ? (
                <div className="viewer-loading">
                  <div className="loading-spinner"></div>
                  <p>Loading PDF...</p>
                </div>
              ) : viewingResume && viewingResume.url ? (
                <div className="pdf-viewer-container">
                  <div className="pdf-viewer-tabs">
                    <button 
                      className="viewer-tab active" 
                      onClick={() => switchViewerMode('google')}
                      id="google-tab"
                    >
                      Google Viewer
                    </button>
                    <button 
                      className="viewer-tab" 
                      onClick={() => switchViewerMode('direct')}
                      id="direct-tab"
                    >
                      Direct View
                    </button>
                  </div>
                  
                  <div className="pdf-content">
                    {/* Google Docs Viewer - Usually most reliable and won't download */}
                    <iframe
                      id="google-viewer"
                      src={`https://docs.google.com/gview?url=${encodeURIComponent(viewingResume.url)}&embedded=true&v=1&format=pdf`}
                      title={`${viewingResume.role} Resume - Google Viewer`}
                      className="resume-iframe active-viewer"
                      allowFullScreen
                      sandbox="allow-scripts allow-same-origin"
                    />
                    
                    {/* Direct PDF Viewer with embed parameters */}
                    <iframe
                      id="direct-viewer"
                      src={`${viewingResume.url}#view=FitH&toolbar=0&navpanes=0&scrollbar=1&embedded=true`}
                      title={`${viewingResume.role} Resume - Direct`}
                      className="resume-iframe"
                      type="application/pdf"
                      allowFullScreen
                      style={{ display: 'none' }}
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>
                </div>
              ) : (
                <div className="viewer-error">
                  <p>Failed to load PDF</p>
                  <button onClick={closeResumeViewer}>Close</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your resumes...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error-container">
          <p>{error}</p>
          <button onClick={loadUserResumes}>Retry</button>
        </div>
      )}

      {/* Resumes Grid */}
      {!loading && !error && (
        <div className="resumes-grid">
          {resumes.length === 0 ? (
            <div className="no-resumes">
              <FaFilePdf className="no-resumes-icon" />
              <h3>No resumes uploaded yet</h3>
              <p>Upload your first resume to get started</p>
            </div>
          ) : (
            resumes.map((resume) => (
              <div key={resume.id} className="resume-card">
                <div className="resume-header">
                  <FaFilePdf className="pdf-icon" />
                  <div className="resume-info">
                    <div className="role-header">
                      <h3>{resume.role}</h3>
                      <span 
                        className="role-badge" 
                        style={{ backgroundColor: getRoleCategory(resume.role).color }}
                      >
                        {getRoleCategory(resume.role).category}
                      </span>
                    </div>
                    <p className="filename">{resume.fileName}</p>
                    <p className="file-details">
                      {formatFileSize(resume.fileSize)} • {formatDate(resume.uploadedAt)}
                    </p>
                  </div>
                </div>
                
                <div className="resume-actions">
                  <button 
                    className="action-btn view-btn"
                    onClick={() => handleView(resume)}
                    title="View Resume"
                  >
                    <FaEye />
                  </button>
                  <button 
                    className="action-btn download-btn"
                    onClick={() => handleDownload(resume)}
                    title="Download Resume"
                  >
                    <FaDownload />
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(resume)}
                    title="Delete Resume"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .urms-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Inter', sans-serif;
        }

        .urms-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .urms-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .urms-header p {
          color: #64748b;
          font-size: 1.1rem;
        }

        .resume-summary {
          margin-bottom: 2rem;
        }

        .summary-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          padding: 2rem;
          color: white;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .summary-card h3 {
          margin: 0 0 1.5rem 0;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .summary-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 2rem;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .upload-section {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .upload-btn {
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: transform 0.2s;
        }

        .upload-btn:hover {
          transform: translateY(-2px);
        }

        .upload-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .modal-content h3 {
          margin-bottom: 1.5rem;
          color: #1e293b;
          font-size: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #374151;
        }

        .form-group input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .form-group input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .file-info {
          margin-top: 0.5rem;
          padding: 0.5rem;
          background: #f8fafc;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          font-size: 0.9rem;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .form-actions button {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .form-actions button[type="button"] {
          background: #f1f5f9;
          color: #64748b;
          border: 1px solid #e2e8f0;
        }

        .form-actions button[type="submit"] {
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
        }

        .loading-container, .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          text-align: center;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e5e7eb;
          border-left: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-container p {
          color: #dc2626;
          margin-bottom: 1rem;
        }

        .error-container button {
          background: #dc2626;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
        }

        .resumes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .no-resumes {
          grid-column: 1/-1;
          text-align: center;
          padding: 3rem;
          color: #64748b;
        }

        .no-resumes-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          color: #cbd5e1;
        }

        .resume-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
          border: 1px solid #e2e8f0;
        }

        .resume-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .resume-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .pdf-icon {
          font-size: 2rem;
          color: #dc2626;
          margin-top: 0.25rem;
        }

        .resume-info h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .role-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .role-header h3 {
          margin: 0;
          flex: 1;
        }

        .role-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .filename {
          color: #64748b;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .file-details {
          color: #94a3b8;
          font-size: 0.8rem;
        }

        .resume-actions {
          display: flex;
          gap: 0.5rem;
          justify-content: flex-end;
        }

        .action-btn {
          padding: 0.5rem;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .download-btn {
          background: #10b981;
          color: white;
        }

        .download-btn:hover {
          background: #059669;
        }

        .delete-btn {
          background: #ef4444;
          color: white;
        }

        .delete-btn:hover {
          background: #dc2626;
        }

        .view-btn {
          background: #3b82f6;
          color: white;
        }

        .view-btn:hover {
          background: #2563eb;
        }

        /* Resume Viewer Styles */
        .resume-viewer-overlay {
          position: fixed;
          top: 60px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
          padding: 1rem;
        }

        .resume-viewer-modal {
          width: 85vw;
          height: 80vh;
          max-width: 1000px;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          margin-top: 2rem;
          margin-bottom: 2rem;
        }

        .resume-viewer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }

        .resume-viewer-info h3 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
        }

        .resume-viewer-info p {
          margin: 0.25rem 0 0 0;
          font-size: 0.875rem;
          color: #64748b;
        }

        .close-viewer-btn {
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }

        .close-viewer-btn:hover {
          background: #dc2626;
          transform: scale(1.05);
        }

        .resume-viewer-content {
          flex: 1;
          padding: 0;
          background: #f1f5f9;
        }

        .resume-iframe {
          width: 100%;
          height: 100%;
          border: none;
          background: white;
        }

        .pdf-fallback {
          position: absolute;
          bottom: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.8);
          padding: 0.75rem 1rem;
          border-radius: 8px;
          color: white;
          font-size: 0.9rem;
        }

        .pdf-fallback p {
          margin: 0 0 0.5rem 0;
          font-size: 0.8rem;
        }

        .pdf-link {
          color: #60a5fa;
          text-decoration: none;
          font-weight: 500;
        }

        .pdf-link:hover {
          color: #3b82f6;
          text-decoration: underline;
        }

        .viewer-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #64748b;
        }

        .viewer-loading .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        .viewer-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #ef4444;
        }

        .viewer-error button {
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .viewer-error button:hover {
          background: #dc2626;
        }

        .pdf-viewer-container {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .fallback-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .pdf-fallback-main {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          background: #f8fafc;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
        }

        .fallback-content {
          text-align: center;
          padding: 2rem;
        }

        .fallback-content h3 {
          color: #374151;
          margin-bottom: 1rem;
        }

        .fallback-content p {
          color: #6b7280;
          margin-bottom: 2rem;
        }

        .fallback-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary, .btn-secondary {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s;
          display: inline-block;
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
        }

        .btn-primary:hover {
          background: #2563eb;
        }

        .btn-secondary {
          background: #e5e7eb;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .btn-secondary:hover {
          background: #d1d5db;
        }

        .pdf-viewer-tabs {
          display: flex;
          border-bottom: 2px solid #e5e7eb;
          margin-bottom: 0;
          background: #f9fafb;
        }

        .viewer-tab {
          padding: 0.75rem 1.5rem;
          border: none;
          background: transparent;
          color: #6b7280;
          cursor: pointer;
          font-weight: 500;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }

        .viewer-tab:hover {
          color: #374151;
          background: #f3f4f6;
        }

        .viewer-tab.active {
          color: #3b82f6;
          border-bottom-color: #3b82f6;
          background: white;
        }

        .pdf-content {
          height: calc(100% - 50px);
          position: relative;
        }

        .active-viewer {
          display: block !important;
        }

        .download-option {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          background: #f8fafc;
        }

        .download-content {
          text-align: center;
          padding: 2rem;
        }

        .pdf-icon-large {
          font-size: 4rem;
          color: #ef4444;
          margin-bottom: 1rem;
        }

        .download-content h3 {
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .download-content p {
          color: #6b7280;
          margin-bottom: 2rem;
        }

        .download-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .download-actions .btn-primary,
        .download-actions .btn-secondary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        @media (max-width: 768px) {
          .resumes-grid {
            grid-template-columns: 1fr;
          }
          
          .urms-header h1 {
            font-size: 2rem;
          }
          
          .modal-content {
            margin: 1rem;
          }

          .resume-viewer-modal {
            width: 95vw;
            height: 95vh;
            margin: 2.5vh 2.5vw;
          }

          .resume-viewer-header {
            padding: 1rem;
          }

          .resume-viewer-info h3 {
            font-size: 1.1rem;
          }

          .close-viewer-btn {
            padding: 0.5rem;
          }

          .resume-actions {
            gap: 0.25rem;
          }

          .action-btn {
            padding: 0.4rem;
            font-size: 0.875rem;
          }

          .pdf-viewer-tabs {
            flex-wrap: wrap;
          }

          .viewer-tab {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
            flex: 1;
            min-width: 80px;
          }

          .download-actions {
            flex-direction: column;
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
