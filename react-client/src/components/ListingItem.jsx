import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { FaBed, FaBath } from 'react-icons/fa';

export default function ListingItem({ listing }) {
    return (
        <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[500px] border border-gray-100 min-h-80'>
            <Link to={`/listing/${listing._id}`} className='group'>
                <div className='overflow-hidden'>
                    <img
                        src={
                            listing.imageUrls[0] ||
                            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
                        }
                        alt='listing cover'
                        className='h-[320px] sm:h-[220px] w-full object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                </div>
                <div className='p-4 flex flex-col gap-2 w-full'>
                    <p className='truncate text-lg font-semibold text-indigo-900 group-hover:text-teal-600 transition-colors'>
                        {listing.name}
                    </p>
                    <div className='flex items-center gap-1'>
                        <MdLocationOn className='h-4 w-4 text-teal-600' />
                        <p className='text-sm text-indigo-700 truncate w-full'>
                            {listing.address}
                        </p>
                    </div>
                    <p className='text-sm text-indigo-600 line-clamp-2'>
                        {listing.description}
                    </p>
                    <p className='text-teal-700 mt-2 font-semibold text-lg'>
                        $
                        {listing.offer
                            ? listing.discountPrice.toLocaleString('en-US')
                            : listing.regularPrice.toLocaleString('en-US')}
                        {listing.type === 'rent' && ' / month'}
                    </p>
                    <div className='text-indigo-700 flex gap-4 mt-2'>
                        <div className='font-medium text-sm flex items-center gap-1'>
                            <FaBed className='text-teal-600' />
                            {listing.bedrooms > 1
                                ? `${listing.bedrooms} beds`
                                : `${listing.bedrooms} bed`}
                        </div>
                        <div className='font-medium text-sm flex items-center gap-1'>
                            <FaBath className='text-teal-600' />
                            {listing.bathrooms > 1
                                ? `${listing.bathrooms} baths`
                                : `${listing.bathrooms} bath`}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}