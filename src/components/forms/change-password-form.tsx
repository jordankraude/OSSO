import React, { useState } from 'react';

const PasswordChangeInitiator: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const handleRequestVerification = async () => {
    // Send a request to the API to send the verification code to the email
    const response = await fetch('/api/auth/send-verification-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      setIsVerifying(true);
      alert('Verification code sent to your email.');
    } else {
      alert('Failed to send verification code.');
    }
  };

  const handleVerifyCode = async () => {
    // Send the verification code to the server for verification
    const response = await fetch('/api/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code: verificationCode }),
    });

    if (response.ok) {
      setIsCodeVerified(true);
      alert('Verification successful. You can now change your password.');
    } else {
      alert('Invalid verification code.');
    }
  };

  return (
    <div>
      {!isVerifying ? (
        <div>
          <h2>Verify Your Email</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button onClick={handleRequestVerification}>Send Verification Code</button>
        </div>
      ) : !isCodeVerified ? (
        <div>
          <h2>Enter Verification Code</h2>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter verification code"
            required
          />
          <button onClick={handleVerifyCode}>Verify Code</button>
        </div>
      ) : (
        <div>
          <h2>Change Your Password</h2>
          {/* Include your Password Update Form here */}
          <PasswordUpdateForm email={email} />
        </div>
      )}
    </div>
  );
};

// Placeholder for the PasswordUpdateForm component
const PasswordUpdateForm: React.FC<{ email: string }> = ({ email }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = async () => {
    // Implement password change logic
    // Call your API endpoint to update the password
    console.log('Updating password for:', email, 'New Password:', newPassword);
  };

  return (
    <div>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New Password"
        required
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        required
      />
      <button onClick={handlePasswordChange}>Update Password</button>
    </div>
  );
};

export default PasswordChangeInitiator;

