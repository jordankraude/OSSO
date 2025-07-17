// app/unauthorized/page.tsx
import React from 'react';

const UnauthorizedPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold">Unauthorized Access</h1>
            <p className="mt-4">You do not have permission to view this page.</p>
            <a href="/" className="mt-6 text-blue-500 hover:underline">
                Go back to the homepage
            </a>
        </div>
    );
};

export default UnauthorizedPage;
