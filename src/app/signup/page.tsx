// app/signup/page.tsx
import React from 'react';
import SignupForm from '@/components/forms/signup-form';

const SignupPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignupForm />
    </div>
  );
};

export default SignupPage;
