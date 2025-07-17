'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [showRequirements, setShowRequirements] = useState<boolean>(false); // New state for showing requirements
  const router = useRouter();

  const validatePassword = (password: string) => {
    const hasMinimumLength = password.length >= 10;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return { hasMinimumLength, hasUpperCase, hasNumber, hasSpecialCharacter };
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const { hasMinimumLength, hasUpperCase, hasNumber, hasSpecialCharacter } = validatePassword(newPassword);
    setPasswordValid(hasMinimumLength && hasUpperCase && hasNumber && hasSpecialCharacter);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(password === newConfirmPassword);
  };

  const handleFocus = () => {
    setShowRequirements(true);
  };

  const handleBlur = () => {
    setShowRequirements(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    } else {
      setSuccess("Signup successful!");
      router.push('/login');
    }
  };

  // Get the validation results for the current password
  const passwordRequirements = validatePassword(password);
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96 text-black">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        className="w-full p-2 border mb-4"
        required
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        className="w-full p-2 border mb-4"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border mb-4"
        required
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
        className="w-full p-2 border mb-4"
        onFocus={handleFocus} // Show requirements on focus
        onBlur={handleBlur} // Hide requirements on blur
        required
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        placeholder="Confirm Password"
        className="w-full p-2 border mb-4"
        onFocus={handleFocus} // Show requirements on focus
        onBlur={handleBlur} // Hide requirements on blur
        required
      />
      
      {showRequirements && ( // Show requirements only if focused
        <ul className="mt-4 space-y-1">
          <li className={`flex items-center ${
            passwordRequirements.hasMinimumLength ? 'text-green-500' : 'text-red-500'
          }`}>
            <span className="mr-2">•</span> At least 10 characters long
          </li>
          <li className={`flex items-center ${
            passwordRequirements.hasUpperCase ? 'text-green-500' : 'text-red-500'
          }`}>
            <span className="mr-2">•</span> At least one uppercase letter
          </li>
          <li className={`flex items-center ${
            passwordRequirements.hasNumber ? 'text-green-500' : 'text-red-500'
          }`}>
            <span className="mr-2">•</span> At least one number
          </li>
          <li className={`flex items-center ${
            passwordRequirements.hasSpecialCharacter ? 'text-green-500' : 'text-red-500'
          }`}>
            <span className="mr-2">•</span> At least one special character
          </li>
          {confirmPassword && (
            <li className={`flex items-center ${
              passwordsMatch ? 'text-green-500' : 'text-red-500'
            }`}>
              <span className="mr-2">•</span> {passwordsMatch ? "Passwords match." : "Passwords do not match."}
            </li>
          )}
        </ul>
      )}

      <button 
        type="submit" 
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4" 
        disabled={!passwordValid || (confirmPassword !== "" && !passwordsMatch)} // Updated condition
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
