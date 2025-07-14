import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='p-6 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-10'>
      <div className='p-8'>
        <h1 className='text-3xl text-center font-bold text-indigo-900 mb-8'>Create Your Account</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <div className='space-y-4'>
            <input
              type='text'
              placeholder='Username'
              className='w-full px-4 py-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition'
              id='username'
              onChange={handleChange}
              required
            />
            <input
              type='email'
              placeholder='Email'
              className='w-full px-4 py-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition'
              id='email'
              onChange={handleChange}
              required
            />
            <input
              type='password'
              placeholder='Password'
              className='w-full px-4 py-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition'
              id='password'
              onChange={handleChange}
              required
            />
          </div>

          <button
            disabled={loading}
            className='w-full bg-teal-600 text-white p-3 rounded-lg uppercase font-medium hover:bg-teal-700 disabled:opacity-70 transition-colors duration-300'
          >
            {loading ? (
              <span className='flex items-center justify-center'>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Sign Up'}
          </button>

          <div className='relative flex items-center'>
            <div className='flex-grow border-t border-indigo-200'></div>
            <span className='flex-shrink mx-4 text-indigo-500'>OR</span>
            <div className='flex-grow border-t border-indigo-200'></div>
          </div>

          <OAuth />
        </form>

        <div className='mt-6 text-center text-indigo-700'>
          <p>Already have an account?{' '}
            <Link to={'/sign-in'} className='font-medium text-teal-600 hover:text-teal-700 hover:underline'>
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <div className='mt-6 p-3 bg-red-50 rounded-lg'>
            <p className='text-red-600 text-center'>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}