import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
        minPrice: '50',
        maxPrice: '',
    });

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [priceError, setPriceError] = useState('');

    const fetchListings = async (searchQuery = '') => {
        setLoading(true);
        setShowMore(false);
        try {
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            if (data.length > 8) {
                setShowMore(true);
            }
            setListings(data);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const fetchAndUpdateState = async () => {
            await fetchListings(urlParams.toString());
        };
        fetchAndUpdateState();
    }, [window.location.search]);

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;

        setSidebardata(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value,
            ...(id === 'all' || id === 'rent' || id === 'sale') && { type: id }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (sidebardata.maxPrice && parseInt(sidebardata.minPrice) > parseInt(sidebardata.maxPrice)) {
            setPriceError('Minimum price cannot be greater than maximum price');
            return;
        }
        setPriceError('');

        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        if (sidebardata.minPrice) urlParams.set('minPrice', sidebardata.minPrice);
        if (sidebardata.maxPrice) urlParams.set('maxPrice', sidebardata.maxPrice);

        const queryString = urlParams.toString();
        navigate(`/search?${queryString}`);
        await fetchListings(queryString); // Immediate fetch after navigation
    };

    const onShowMoreClick = async () => {
        const startIndex = listings.length;
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('startIndex', startIndex);

        const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
        const data = await res.json();
        if (data.length < 9) setShowMore(false);
        setListings([...listings, ...data]);
    };

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    {/* Search Term */}
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                        <input
                            type='text'
                            id='searchTerm'
                            placeholder='Search...'
                            className='border rounded-lg p-3 w-full'
                            value={sidebardata.searchTerm}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Type Filter */}
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Type:</label>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='all'
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.type === 'all'}
                            />
                            <span>Rent & Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='rent'
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.type === 'rent'}
                            />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='sale'
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.type === 'sale'}
                            />
                            <span>Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='offer'
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.offer}
                            />
                            <span>Offer</span>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Amenities:</label>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='parking'
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.parking}
                            />
                            <span>Parking</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='furnished'
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.furnished}
                            />
                            <span>Furnished</span>
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-2'>
                            <label className='whitespace-nowrap font-semibold'>Min Price ($):</label>
                            <input
                                type='number'
                                id='minPrice'
                                min='0'
                                placeholder='50'
                                className='border rounded-lg p-3 w-full'
                                value={sidebardata.minPrice}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex items-center gap-2'>
                            <label className='whitespace-nowrap font-semibold'>Max Price ($):</label>
                            <input
                                type='number'
                                id='maxPrice'
                                min='0'
                                placeholder='No limit'
                                className='border rounded-lg p-3 w-full'
                                value={sidebardata.maxPrice}
                                onChange={handleChange}
                            />
                        </div>
                        {priceError && <p className='text-red-500 text-sm'>{priceError}</p>}
                    </div>

                    {/* Sort */}
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort:</label>
                        <select
                            onChange={handleChange}
                            defaultValue={'created_at_desc'}
                            id='sort_order'
                            className='border rounded-lg p-3'
                        >
                            <option value='regularPrice_desc'>Price high to low</option>
                            <option value='regularPrice_asc'>Price low to high</option>
                            <option value='createdAt_desc'>Latest</option>
                            <option value='createdAt_asc'>Oldest</option>
                        </select>
                    </div>

                    <button
                        type='submit'
                        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Results */}
            <div className='flex-1'>
                <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
                    Listing results:
                </h1>
                <div className='p-7 flex flex-wrap gap-4'>
                    {!loading && listings.length === 0 && (
                        <p className='text-xl text-slate-700'>No listing found!</p>
                    )}
                    {loading && (
                        <p className='text-xl text-slate-700 text-center w-full'>
                            Loading...
                        </p>
                    )}

                    {!loading && listings.map((listing) => (
                        <ListingItem key={listing._id} listing={listing} />
                    ))}

                    {showMore && (
                        <button
                            onClick={onShowMoreClick}
                            className='text-green-700 hover:underline p-7 text-center w-full'
                        >
                            Show more
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}