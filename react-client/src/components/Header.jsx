import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);

    return (
        <header className='bg-gradient-to-r from-teal-800 to-indigo-800 shadow-lg border-b border-teal-600'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to={'/'}>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-teal-200'>Bricks</span>
                        <span className='text-indigo-300'>&</span>
                        <span className='text-indigo-100'>Clicks</span>
                    </h1>
                </Link>

                <form
                    onSubmit={handleSubmit}
                    className='bg-white/10 p-2 rounded-lg flex items-center border border-teal-400/30 focus-within:ring-2 focus-within:ring-teal-300 focus-within:border-transparent transition-all'
                >
                    <input
                        type='text'
                        placeholder='Search...'
                        className='bg-transparent focus:outline-none w-24 sm:w-64 text-white placeholder-teal-200'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className='p-1'>
                        <FaSearch className='text-teal-200 hover:text-white transition-colors' />
                    </button>
                </form>

                <ul className='flex gap-4 items-center'>
                    <Link to='/'>
                        <li className='hidden sm:inline text-teal-100 hover:text-white hover:underline transition-colors'>
                            Home
                        </li>
                    </Link>
                    <Link to='/about'>
                        <li className='hidden sm:inline text-teal-100 hover:text-white hover:underline transition-colors'>
                            About
                        </li>
                    </Link>
                    <Link to='/profile'>
                        {currentUser ? (
                            <img
                                className='rounded-full h-7 w-7 object-cover border-2 border-teal-400 hover:border-white transition-colors'
                                src={currentUser.avatar}
                                alt='profile'
                            />
                        ) : (
                            <li className='text-teal-100 hover:text-white hover:underline transition-colors'>
                                Sign in
                            </li>
                        )}
                    </Link>
                </ul>
            </div>
        </header>
    );
}