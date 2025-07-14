import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutUserStart } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaSignOutAlt, FaUserCircle, FaHome } from 'react-icons/fa';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  // const [formData, setFormData] = useState({
  //   username: currentUser.username,
  //   email: currentUser.email,
  //   avatar: currentUser.avatar
  // });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
        {/* Profile Header */}
        <div className='bg-gradient-to-r from-teal-600 to-indigo-600 p-6 text-white'>
          <h1 className='text-2xl font-bold text-center'>Your Profile</h1>
        </div>

        {/* Profile Content */}
        <div className='p-6 md:p-8'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Avatar Upload */}
            <div className='flex flex-col items-center'>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type='file'
                ref={fileRef}
                hidden
                accept='image/*'
              />
              <img
                onClick={() => fileRef.current.click()}
                src={formData.avatar || currentUser.avatar}
                alt='profile'
                className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
              />
              <p className='text-sm self-center'>
                {fileUploadError ? (
                  <span className='text-red-700'>
                    Error Image upload (image must be less than 2 mb)
                  </span>
                ) : filePerc > 0 && filePerc < 100 ? (
                  <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
                ) : filePerc === 100 ? (
                  <span className='text-green-700'>Image successfully uploaded!</span>
                ) : (
                  ''
                )}
              </p>
            </div>

            {/* Form Fields */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label htmlFor='username' className='block text-sm font-medium text-indigo-700 mb-1'>
                  Username
                </label>
                <input
                  type='text'
                  id='username'
                  defaultValue={currentUser.username}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition'
                />
              </div>
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-indigo-700 mb-1'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  defaultValue={currentUser.email}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition'
                />
              </div>
              <div>
                <label htmlFor='password' className='block text-sm font-medium text-indigo-700 mb-1'>
                  Password (leave blank to keep current)
                </label>
                <input
                  type='password'
                  id='password'
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition'
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col space-y-4 pt-4'>
              <button
                disabled={loading}
                className='w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 disabled:opacity-70 transition-colors flex items-center justify-center'
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : 'Update Profile'}
              </button>

              <Link
                to='/create-listing'
                className='w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2'
              >
                <FaHome /> Create New Listing
              </Link>
            </div>
          </form>

          {/* Account Actions */}
          <div className='mt-8 pt-6 border-t border-indigo-100 flex flex-col sm:flex-row justify-between items-center gap-4'>
            <button
              onClick={handleShowListings}
              className='text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2 transition-colors'
            >
              <FaHome /> {userListings.length > 0 ? 'Hide My Listings' : 'Show My Listings'}
            </button>

            <div className='flex gap-4'>
              <button
                onClick={handleDeleteUser}
                className='text-red-600 hover:text-red-800 flex items-center gap-2 transition-colors'
              >
                <FaTrash /> Delete Account
              </button>
              <button
                onClick={handleSignOut}
                className='text-indigo-600 hover:text-indigo-800 flex items-center gap-2 transition-colors'
              >
                <FaSignOutAlt /> Sign Out
              </button>
            </div>
          </div>

          {/* Status Messages */}
          {error && (
            <div className='mt-6 p-3 bg-red-50 rounded-lg'>
              <p className='text-red-600 text-center'>{error}</p>
            </div>
          )}
          {updateSuccess && (
            <div className='mt-6 p-3 bg-teal-50 rounded-lg'>
              <p className='text-teal-600 text-center'>Profile updated successfully!</p>
            </div>
          )}
          {showListingsError && (
            <div className='mt-6 p-3 bg-red-50 rounded-lg'>
              <p className='text-red-600 text-center'>Error loading listings</p>
            </div>
          )}

          {/* User Listings */}
          {userListings && userListings.length > 0 && (
            <div className='mt-10'>
              <h2 className='text-2xl font-bold text-indigo-800 mb-6 pb-2 border-b border-indigo-100'>
                Your Listings
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {userListings.map((listing) => (
                  <div
                    key={listing._id}
                    className='bg-white border border-indigo-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'
                  >
                    <Link to={`/listing/${listing._id}`} className='block'>
                      <img
                        src={listing.imageUrls[0]}
                        alt='listing cover'
                        className='w-full h-48 object-cover'
                      />
                      <div className='p-4'>
                        <h3 className='text-lg font-semibold text-indigo-900 truncate'>{listing.name}</h3>
                        <p className='text-indigo-700 text-sm mt-1'>
                          {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                        </p>
                        <p className='text-teal-600 font-medium mt-2'>
                          ${listing.offer ? listing.discountPrice.toLocaleString() : listing.regularPrice.toLocaleString()}
                          {listing.type === 'rent' && '/mo'}
                        </p>
                      </div>
                    </Link>
                    <div className='p-4 border-t border-indigo-50 flex justify-between'>
                      <button
                        onClick={() => handleListingDelete(listing._id)}
                        className='text-red-600 hover:text-red-800 flex items-center gap-1 text-sm'
                      >
                        <FaTrash size={14} /> Delete
                      </button>
                      <Link
                        to={`/update-listing/${listing._id}`}
                        className='text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-sm'
                      >
                        <FaEdit size={14} /> Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}