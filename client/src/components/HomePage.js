import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';

function HomePage() {
  const location = useLocation();
  const username = location.state?.username;

  if (!username) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-extrabold text-gray-900">KudoSpot Home</h1>
                <p>Welcome, {username}!</p>
                <nav className="space-y-4">
                  <ul className="list-disc space-y-2">
                    <li>
                      <Link to="/give-kudos" className="text-cyan-600 hover:text-cyan-700 transition-colors duration-200">
                        Give Kudos
                      </Link>
                    </li>
                    <li>
                      <Link to="/analytics" className="text-cyan-600 hover:text-cyan-700 transition-colors duration-200">
                        Analytics
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

