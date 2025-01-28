"use client";

import { useRouter } from 'next/navigation';

/**
 * Login Component
 * 
 * This component renders a sign-in interface for the application.
 * Users are required to enter their email and password before allowed to click the "Sign in" button.
 * The "Sign in" button redirects the user to the dashboard.
 * 
 * @returns Elements in the UI design.
 */

export default function Login() {
  const router = useRouter(); //Initializes the router for navigation.

  /**
   * Handles the login from submission
   * 
   * @param event - From submission event.
   * Prevents default form submission behavior and redirects the user to the dashboard.
   */
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    router.push('/dashboard'); //Redirect user to dashboard
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow">
      <div>
        <img
          className="w-auto h-12 mx-auto"
          src="/logo.png"
          alt="Your Company"
        />
        <h2 className="mt-6 text-2xl font-extrabold text-center text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleLogin}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}
