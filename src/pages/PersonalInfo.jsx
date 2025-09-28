import React, { useState, useEffect } from "react";
import { profileAPI } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export default function StudentProfile() {
  const { user } = useAuth();
  const [info, setInfo] = useState({
    name: "",
    dob: "",
    phone: "",
    email: "",
    department: "",
    regno: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Load profile data from backend on component mount
  useEffect(() => {
    const loadProfile = async () => {
      console.log('Starting profile load for user:', user);
      
      if (user?.email) {
        console.log('User email found:', user.email);
        try {
          // Try the standard approach first, then fallback to email-based
          let profileData;
          try {
            console.log('Attempting standard getUserProfile...');
            profileData = await profileAPI.getUserProfile();
            console.log('Standard approach successful:', profileData);
          } catch (authError) {
            console.log('Standard auth failed, error details:', {
              message: authError.message,
              status: authError.response?.status,
              data: authError.response?.data
            });
            console.log('Trying email-based approach with email:', user.email);
            profileData = await profileAPI.getUserProfileByEmail(user.email);
            console.log('Email-based approach successful:', profileData);
          }
          
          console.log('Raw profile data from backend:', JSON.stringify(profileData, null, 2));
          
          // Helper function to convert Indian date format (dd-MM-yyyy) to HTML date input format (yyyy-MM-dd)
          const convertIndianDateToISO = (indianDate) => {
            if (!indianDate) return "";
            
            console.log('Converting Indian date format:', indianDate);
            
            // Check if it's already in ISO format (yyyy-MM-dd)
            if (indianDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
              console.log('Date already in ISO format:', indianDate);
              return indianDate;
            }
            
            // Convert from dd-MM-yyyy to yyyy-MM-dd
            if (indianDate.match(/^\d{2}-\d{2}-\d{4}$/)) {
              const [day, month, year] = indianDate.split('-');
              const isoDate = `${year}-${month}-${day}`;
              console.log('Converted Indian date', indianDate, 'to ISO:', isoDate);
              return isoDate;
            }
            
            console.warn('Unrecognized date format:', indianDate);
            return "";
          };

          // Map backend data to frontend structure (matching your UserService DTO structure)
          setInfo({
            name: profileData.name || profileData.username || "",
            dob: convertIndianDateToISO(profileData.dateOfBirth), 
            phone: profileData.phoneNumber || profileData.phone ? String(profileData.phoneNumber || profileData.phone) : "", // Backend returns phoneNumber
            email: profileData.email || user.email || "",
            department: profileData.department || "",
            regno: profileData.registerNumber || "",
          });
          
          // Set profile image if available from backend
          if (profileData.profileImageUrl) {
            console.log('Setting profile image from backend:', profileData.profileImageUrl);
            setProfilePic(profileData.profileImageUrl);
          }
          
          console.log('Mapped profile info:', {
            name: profileData.name || profileData.username || "",
            dob: profileData.dateOfBirth || "",
            phone: profileData.phoneNumber || profileData.phone,
            email: profileData.email,
            department: profileData.department,
            registerNumber: profileData.registerNumber,
            profileImageUrl: profileData.profileImageUrl
          });
          console.log('🎂 Date of Birth loaded from backend:', profileData.dateOfBirth);
        } catch (error) {
          console.error('Failed to load profile:', error);
          
          // Show specific error messages to help debug
          if (error.message.includes('Authentication required')) {
            alert('Please log in again to access your profile.');
            // Optionally redirect to login
          } else if (error.message.includes('Profile not found')) {
            console.log('No existing profile found, starting with empty form');
          }
          
          // If profile doesn't exist or error occurs, initialize with user data
          console.log('Setting fallback user info with email:', user.email);
          setInfo(prev => ({
            ...prev,
            email: user.email || "",
            name: user.name || user.username || ""  // Set any available name from user context
          }));
        }
      } else {
        console.log('No user email available, skipping profile load. User object:', user);
      }
      setLoading(false);
    };

    console.log('PersonalInfo component mounted/updated. User:', user);
    
    // Load profile when we have a user email
    loadProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Real-time phone number validation - prevent spaces
    if (name === 'phone') {
      // Remove spaces as user types
      const cleanValue = value.replace(/\s+/g, '');
      if (cleanValue !== value) {
        // Show warning if spaces were removed
        console.log('Removed spaces from phone number');
      }
      setInfo({ ...info, [name]: cleanValue });
    } else {
      setInfo({ ...info, [name]: value });
    }
  };

  // Get field validation status
  const getFieldValidationClass = (fieldName) => {
    if (!isEditing) return '';
    
    const errors = validateForm();
    const hasError = errors.some(error => 
      error.toLowerCase().includes(fieldName.toLowerCase())
    );
    
    return hasError ? 'invalid' : '';
  };

  const validateForm = () => {
    const errors = [];

    // Name validation
    if (!info.name || info.name.trim().length === 0) {
      errors.push('Name is required');
    } else if (info.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    } else if (!/^[a-zA-Z\s]+$/.test(info.name.trim())) {
      errors.push('Name can only contain letters and spaces');
    }

    // Email validation
    if (!info.email || info.email.trim().length === 0) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email.trim())) {
      errors.push('Please enter a valid email address');
    }

    // Phone number validation
    if (!info.phone || info.phone.trim().length === 0) {
      errors.push('Phone number is required');
    } else {
      const cleanPhone = info.phone.replace(/\s+/g, ''); // Remove all spaces
      if (cleanPhone !== info.phone) {
        errors.push('Phone number should not contain spaces');
      } else if (!/^\d{10}$/.test(cleanPhone)) {
        errors.push('Phone number must be exactly 10 digits');
      } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        errors.push('Phone number must start with 6, 7, 8, or 9');
      }
    }

    // Department validation
    if (!info.department || info.department.trim().length === 0) {
      errors.push('Department is required');
    } else if (info.department.trim().length < 2) {
      errors.push('Department name must be at least 2 characters long');
    }

    // Register number validation
    if (!info.regno || info.regno.trim().length === 0) {
      errors.push('Register number is required');
    } else if (info.regno.trim().length < 3) {
      errors.push('Register number must be at least 3 characters long');
    } else if (!/^[a-zA-Z0-9]+$/.test(info.regno.trim())) {
      errors.push('Register number can only contain letters and numbers (no spaces or special characters)');
    }

    // Date of birth validation
    if (!info.dob) {
      errors.push('Date of birth is required');
    } else {
      const dobDate = new Date(info.dob);
      const today = new Date();
      const age = today.getFullYear() - dobDate.getFullYear();
      
      if (dobDate > today) {
        errors.push('Date of birth cannot be in the future');
      } else if (age < 16) {
        errors.push('You must be at least 16 years old');
      } else if (age > 100) {
        errors.push('Please enter a valid date of birth');
      }
    }

    return errors;
  };

  const handleSave = async () => {
    if (!user?.email) {
      alert('Please log in to save profile');
      return;
    }

    // Validate form before saving
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      alert('Please fix the following errors:\n\n' + validationErrors.join('\n'));
      return;
    }

    setSaving(true);
    
    console.log('=== PROFILE SAVE DEBUG START ===');
    console.log('Current form info state:', JSON.stringify(info, null, 2));
    console.log('User context:', JSON.stringify(user, null, 2));
    
    try {
      // Create FormData to match your controller's @ModelAttribute and MultipartFile expectations
      const formData = new FormData();
      
      // Helper function to convert ISO date format (yyyy-MM-dd) back to Indian format (dd-MM-yyyy) for backend
      const convertISOToIndianDate = (isoDate) => {
        if (!isoDate) return "";
        
        console.log('Converting ISO date to Indian format:', isoDate);
        
        // Check if it's in ISO format (yyyy-MM-dd)
        if (isoDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
          const [year, month, day] = isoDate.split('-');
          const indianDate = `${day}-${month}-${year}`;
          console.log('Converted ISO date', isoDate, 'to Indian:', indianDate);
          return indianDate;
        }
        
        // If already in Indian format, return as is
        console.log('Date already in Indian format or unrecognized:', isoDate);
        return isoDate;
      };

      // Add profile fields as form data (matches @ModelAttribute UserProfileDto)
      if (info.name) formData.append('name', info.name);
      if (info.department) formData.append('department', info.department);
      if (info.phone) formData.append('phoneNumber', info.phone);
      if (info.regno) formData.append('registerNumber', info.regno);
      if (info.dob) {
        const indianDateFormat = convertISOToIndianDate(info.dob);
        formData.append('dateOfBirth', indianDateFormat);
        console.log('🎂 Sending date to backend in Indian format:', indianDateFormat);
      }
      if (info.email) formData.append('email', info.email);
      
      // Add profile image file if selected (matches @RequestParam MultipartFile profileImage)
      if (profilePic && document.getElementById('fileInput').files[0]) {
        const imageFile = document.getElementById('fileInput').files[0];
        formData.append('profileImage', imageFile);
        console.log('Profile image file added:', {
          name: imageFile.name,
          size: imageFile.size,
          type: imageFile.type
        });
      }

      console.log('=== DATA BEING SENT TO BACKEND ===');
      console.log('Using FormData (multipart/form-data) format for @ModelAttribute');
      console.log('User Email for API call:', user.email);
      console.log('API Endpoint: PUT /api/profile/user/' + encodeURIComponent(user.email));
      console.log('Request Headers will include: Authorization: Bearer ' + (localStorage.getItem('token') ? '[TOKEN_PRESENT]' : '[NO_TOKEN]'));
      
      // Log FormData contents
      console.log('=== FORM DATA CONTENTS ===');
      console.log('Date of Birth field specifically:', info.dob, '(will be sent as dateOfBirth)');
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: [FILE] ${value.name} (${value.size} bytes, ${value.type})`);
        } else {
          console.log(`${key}: "${value}" (type: ${typeof value}, length: ${value?.length || 'null'})`);
          // Highlight dateOfBirth specifically
          if (key === 'dateOfBirth') {
            console.log(`🎂 DATE OF BIRTH: "${value}" - This will be stored in your backend!`);
          }
        }
      }
      
      // Use the email-based approach that matches your ProfileController
      console.log('=== API CALL START ===');
      console.log('Calling updateUserProfileByEmailWithFile with:');
      console.log('  - Email (path param):', user.email);
      console.log('  - Form Data (multipart):', 'FormData object with', formData.entries ? [...formData.entries()].length : 'unknown', 'entries');
      
      const updatedProfile = await profileAPI.updateUserProfileByEmailWithFile(user.email, formData);
      
      console.log('=== API RESPONSE RECEIVED ===');
      console.log('Updated Profile Response:', JSON.stringify(updatedProfile, null, 2));
      console.log('Response type:', typeof updatedProfile);
      if (updatedProfile && typeof updatedProfile === 'object') {
        console.log('Response keys:', Object.keys(updatedProfile));
      }
      
      console.log('=== SAVE SUCCESS ===');
      alert("Profile saved successfully!");
      setIsEditing(false); // Exit edit mode after saving
      
      // Update the form with the response data from backend
      if (updatedProfile) {
        console.log('Updating form with response data...');
        
        // Reuse the helper function to convert Indian date back to ISO for display
        const convertIndianDateToISO = (indianDate) => {
          if (!indianDate) return "";
          
          // Check if it's already in ISO format (yyyy-MM-dd)
          if (indianDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return indianDate;
          }
          
          // Convert from dd-MM-yyyy to yyyy-MM-dd
          if (indianDate.match(/^\d{2}-\d{2}-\d{4}$/)) {
            const [day, month, year] = indianDate.split('-');
            return `${year}-${month}-${day}`;
          }
          
          return "";
        };
        
        setInfo({
          name: updatedProfile.name || updatedProfile.username || info.name,
          dob: convertIndianDateToISO(updatedProfile.dateOfBirth) || info.dob,
          phone: updatedProfile.phoneNumber || (updatedProfile.phone ? String(updatedProfile.phone) : info.phone), // Fix: use phoneNumber from backend
          email: updatedProfile.email || info.email,
          department: updatedProfile.department || info.department,
          regno: updatedProfile.registerNumber || info.regno,
        });
        
        // Update profile image if backend returned a new URL
        if (updatedProfile.profileImageUrl) {
          console.log('Updating profile image from save response:', updatedProfile.profileImageUrl);
          setProfilePic(updatedProfile.profileImageUrl);
        }
      }
      
    } catch (error) {
      console.error('=== SAVE ERROR ===');
      console.error('Error object:', error);
      console.error('Error message:', error.message);
      console.error('Error response:', error.response);
      console.error('Error response data:', error.response?.data);
      console.error('Error response status:', error.response?.status);
      
      alert("Failed to save profile: " + (error.message || 'Unknown error'));
    } finally {
      setSaving(false);
      console.log('=== PROFILE SAVE DEBUG END ===');
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handlePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div className="profile-wrapper">
      <h2 className="title">Student Profile</h2>


      <div className="profile-card">
        <div className="profile-left">
          {/* Clickable circle for profile picture */}
          <label htmlFor="fileInput" className={`pic-box ${isEditing ? 'editable' : ''}`}>
            {profilePic ? (
              <img src={profilePic} alt="Profile" />
            ) : (
              <div className="placeholder">
                {isEditing ? 'Click to Upload Photo' : 'Profile Photo'}
              </div>
            )}
            {isEditing && (
              <div className="edit-overlay">
                <span>📷</span>
              </div>
            )}
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handlePicUpload}
            style={{ display: "none" }}
            disabled={!isEditing}
          />

          {/* Edit Profile Button */}
          <button className="edit-btn" onClick={toggleEditMode}>
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

        <div className="profile-right">
          <div className="form-group">
            <label>Full Name</label>
            <input
              placeholder="Enter full name"
              name="name"
              value={info.name}
              onChange={handleChange}
              className={`gradient-input ${!isEditing ? 'readonly' : ''} ${getFieldValidationClass('name')}`}
              readOnly={!isEditing}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={info.dob}
                onChange={handleChange}
                className={`gradient-input ${!isEditing ? 'readonly' : ''} ${getFieldValidationClass('date')}`}
                readOnly={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Register Number</label>
              <input
                placeholder="Enter register number"
                name="regno"
                value={info.regno}
                onChange={handleChange}
                className={`gradient-input ${!isEditing ? 'readonly' : ''} ${getFieldValidationClass('register')}`}
                readOnly={!isEditing}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone Number</label>
              <input
                placeholder="Enter phone number (10 digits, no spaces)"
                name="phone"
                value={info.phone}
                onChange={handleChange}
                className={`gradient-input ${!isEditing ? 'readonly' : ''} ${getFieldValidationClass('phone')}`}
                readOnly={!isEditing}
                maxLength="10"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                value={info.email}
                onChange={handleChange}
                className={`gradient-input ${!isEditing ? 'readonly' : ''} ${getFieldValidationClass('email')}`}
                readOnly={!isEditing}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              placeholder="Enter department"
              name="department"
              value={info.department}
              onChange={handleChange}
              className={`gradient-input ${!isEditing ? 'readonly' : ''} ${getFieldValidationClass('department')}`}
              readOnly={!isEditing}
            />
          </div>

          {isEditing && (
            <button className="save-btn" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          )}
        </div>
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner"></div>
            <p>Loading profile...</p>
          </div>
        </div>
      )}

      <style>{`
        :root {
          --primary: #090b0dff;
          --secondary: #43cea2;
          --text-dark: #222;
          --text-light: #555;
          --border: #ddd;
          --button-gradient: linear-gradient(90deg, #ff6a00, #ee0979);
        }

        .profile-wrapper {
          min-height: 100vh;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: url("/src/assets/bg.jpg") no-repeat center center fixed;
          background-size: cover;
          font-family: "Inter", system-ui, sans-serif;
          color: var(--text-dark);
        }

        .title {
          font-size: 2.4rem;
          font-weight: 700;
          margin-bottom: 30px;
          color: var(--primary);
          letter-spacing: 0.5px;
          position: relative;
        }

        .title::after {
          content: "";
          width: 120px;
          height: 4px;
          background: var(--secondary);
          display: block;
          margin: 8px auto 0;
          border-radius: 2px;
        }

        .profile-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 3rem;
          width: 100%;
          max-width: 1100px;
          min-height: 60vh;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          display: flex;
          gap: 2.5rem;
          animation: fadeIn 0.5s ease-in-out;
        }

        .profile-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .pic-box {
          width: 250px;
          height: 250px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid var(--border);
          display: flex;
          justify-content: center;
          align-items: center;
          background: #e0e0e0;
          margin-bottom: 12px;
          position: relative;
          cursor: pointer;
        }

        .pic-box:hover {
          opacity: 0.85;
        }

        .pic-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .placeholder {
          color: var(--text-light);
          font-size: 0.95rem;
        }

        /* Edit Button */
        .edit-btn {
          margin-top: 12px;
          padding: 10px 20px;
          border: none;
          border-radius: 12px;
          background: var(--button-gradient);
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.2s ease;
        }

        .edit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(238,9,121,0.2);
        }

        .profile-right {
          flex: 2;
          display: flex;
          flex-direction: column;
        }

        .form-group {
          margin-bottom: 2.4rem;
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          margin-bottom: 6px;
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-dark);
        }

        .form-group input {
          width: 100%;
          padding: 16px;
          border-radius: 10px;
          border: 1px solid var(--border);
          outline: none;
          font-size: 16px;
          background: #fafafa;
          transition: all 0.25s ease;
          text-align: left; /* Ensures text alignment */
        }

        .form-group input:focus {
          border-color: var(--primary);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(24, 90, 157, 0.2);
        }

        .form-row {
          display: flex;
          gap: 2.4rem;
        }

        .save-btn {
          margin-top: 24px;
          align-self: flex-end;
          padding: 16px 32px;
          border: none;
          border-radius: 14px;
          background: var(--button-gradient);
          color: #fff;
          font-weight: 700;
          font-size: 17px;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(238,9,121,0.2);
          transition: transform 0.15s ease-in-out, box-shadow 0.2s ease-in-out;
        }

        .save-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 34px rgba(238,9,121,0.3);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .profile-card {
            flex-direction: column;
          }
          .form-row {
            flex-direction: column;
          }
          .save-btn {
            width: 100%;
            align-self: center;
          }
        }

        .personal-info-wrapper {
          min-height: 100vh;
          padding: 2rem;
          font-family: 'Inter', sans-serif;
          background: url("/src/assets/bg.jpg") no-repeat center center fixed;
          background-size: cover;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .personal-info-form {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 6px 24px rgba(0,0,0,0.13);
          padding: 2rem;
          width: 100%;
          max-width: 600px;
        }
        .form-row {
          display: flex;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .form-group {
          flex: 1;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
        }
        .gradient-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          border: 1px solid #c5b3f7; /* Enhanced border contrast */
          background-color: #e5d1ff !important; /* Increased background contrast */
          color: #333;
          font-size: 1rem;
          outline: none;
        }
        .gradient-input::placeholder {
          color: #666;
          opacity: 0.8;
        }

        /* Loading overlay styles */
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .loading-content {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #ff6a00;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Disabled button styles */
        .save-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Read-only input styles */
        .gradient-input.readonly {
          background-color: #f5f5f5 !important;
          color: #666;
          cursor: default;
          border-color: #e0e0e0;
        }

        .gradient-input.readonly:focus {
          box-shadow: none;
          border-color: #e0e0e0;
        }

        /* Profile picture edit styles */
        .pic-box.editable {
          cursor: pointer;
          border-color: var(--secondary);
        }

        .pic-box.editable:hover {
          border-color: var(--primary);
          transform: scale(1.02);
        }

        .edit-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 50%;
        }

        .pic-box.editable:hover .edit-overlay {
          opacity: 1;
        }

        /* Edit button states */
        .edit-btn.editing {
          background: #dc3545;
        }

        .edit-btn.editing:hover {
          background: #c82333;
        }

        /* Validation styles */
        .gradient-input.invalid {
          border-color: #dc3545 !important;
          background-color: #fff5f5 !important;
          box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2) !important;
        }

        .gradient-input.invalid:focus {
          border-color: #dc3545 !important;
          box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.3) !important;
        }

        /* Validation helper text */
        .validation-helper {
          font-size: 0.85rem;
          color: #666;
          margin-top: 0.25rem;
          font-style: italic;
        }

        .validation-error {
          font-size: 0.85rem;
          color: #dc3545;
          margin-top: 0.25rem;
          font-weight: 500;
        }

        /* Phone number specific styling */
        input[name="phone"]::-webkit-outer-spin-button,
        input[name="phone"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[name="phone"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}
