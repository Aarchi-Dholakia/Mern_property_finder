import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import { FaSearch, FaHome, FaKey, FaMoneyBillWave, FaChartLine, FaShieldAlt, FaUsers } from 'react-icons/fa';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=3');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=3');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  const services = [
    { icon: <FaSearch className="text-3xl text-teal-600" />, title: "Property Search", description: "Find your dream home with our advanced search tools" },
    // { icon: <FaHome className="text-3xl text-teal-600" />, title: "Home Valuation", description: "Get accurate estimates for your property's value" },
    {
      icon: <FaUsers className="text-3xl text-teal-600" />,
      title: "Buyer Representation",
      description: "Dedicated agent to advocate for your best interests when purchasing property"
    },
    { icon: <FaKey className="text-3xl text-teal-600" />, title: "Rental Management", description: "Professional management for your rental properties" },
    { icon: <FaMoneyBillWave className="text-3xl text-teal-600" />, title: "Investment Advice", description: "Expert guidance for real estate investments" },
  ];

  const stats = [
    { value: "10,000+", label: "Properties Listed" },
    { value: "5,000+", label: "Happy Clients" },
    { value: "100+", label: "Locations" },
    { value: "15+", label: "Years Experience" },
  ];

  return (
    <div className='min-h-screen bg-[#f5f7ff]'>
      {/* Hero Section */}
      <div className="relative">
        <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto relative z-10'>
          <h1 className='text-indigo-900 font-bold text-3xl lg:text-6xl'>
            Find your <span className='text-teal-600'>perfect</span> home
            <br />
            with Bricks & Clicks
          </h1>
          <div className='text-indigo-700 text-lg max-w-2xl'>
            Bricks & Clicks helps you discover properties that match your lifestyle, with personalized service and expert advice every step of the way.
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              to={'/search'}
              className='px-6 py-3 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors text-center font-medium'
            >
              Browse Property Listings
            </Link>
            <Link
              to={'/about'}
              className='px-6 py-3 rounded-lg border-2 border-teal-600 text-teal-600 hover:bg-teal-50 transition-colors text-center font-medium'
            >
              Learn About Us
            </Link>
            <Link
              to='/create-listing'
              className='w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2'
            >
              <FaHome /> Create New Listing
            </Link>
          </div>
        </div>
        {/* <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-transparent opacity-90"></div> */}
      </div>

      {/* Featured Properties Slider */}
      <div className="bg-indigo-50 -mt-8"> {/* Added negative margin-top */}
        <div className="max-w-6xl mx-auto px-4 pb-12"> {/* Adjusted padding */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-indigo-900">Featured Properties</h2>
            <p className="text-indigo-700 mt-2">Discover our most popular listings</p>
          </div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            loop={offerListings.length > 1}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            spaceBetween={30}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet bg-indigo-300',
              bulletActiveClass: 'swiper-pagination-bullet-active bg-teal-600'
            }}
            navigation
            className="pb-12"
          >
            {offerListings &&
              offerListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full">
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${listing.imageUrls[0]})` }}
                    ></div>
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold text-indigo-900">{listing.name}</h3>
                        <span className="bg-teal-100 text-teal-800 text-sm px-2 py-1 rounded">
                          {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                        </span>
                      </div>
                      <p className="text-indigo-700 mt-2">{listing.address}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xl font-bold text-teal-600">
                          ${listing.offer ? listing.discountPrice.toLocaleString() : listing.regularPrice.toLocaleString()}
                          {listing.type === 'rent' && '/mo'}
                        </span>
                        <Link
                          to={`/listing/${listing._id}`}
                          className="text-indigo-600 hover:text-teal-600 font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>

      {/* Our Services */}
      <div className="py-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-indigo-900">Our Services</h2>
          <p className="text-indigo-700 mt-2">Comprehensive real estate solutions tailored to your needs</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-indigo-50">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-indigo-900 mb-2">{service.title}</h3>
              <p className="text-indigo-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Property Listings */}
      <div className='max-w-6xl mx-auto px-4 py-12'>
        {rentListings && rentListings.length > 0 && (
          <div className='mb-16'>
            <div className='flex justify-between items-center mb-8'> {/* Increased margin-bottom */}
              <div>
                <h2 className='text-2xl font-bold text-indigo-900'>Properties for Rent</h2>
                <p className='text-indigo-700 mt-2'>Find your perfect rental home</p> {/* Added margin-top */}
              </div>
              <Link
                className='px-4 py-2 rounded-lg bg-white text-teal-600 hover:bg-teal-50 border border-teal-600 transition-colors font-medium'
                to={'/search?type=rent'}
              >
                View All Rentals
              </Link>
            </div>
            <div className='grid sm:grid-cols-1 grid-cols-2 gap-8'> {/* Added gap-6 for spacing */}
              {rentListings.map((listing) => (
                <div key={listing._id} className="w-full"> {/* Added container div with full width */}
                  <ListingItem listing={listing} />
                </div>
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className='mb-16'>
            <div className='flex justify-between items-center mb-6'>
              <div>
                <h2 className='text-2xl font-bold text-indigo-900'>Properties for Sale</h2>
                <p className='text-indigo-700'>Discover homes for your next chapter</p>
              </div>
              <Link
                className='px-4 py-2 rounded-lg bg-white text-teal-600 hover:bg-teal-50 border border-teal-600 transition-colors font-medium'
                to={'/search?type=sale'}
              >
                View All Sales
              </Link>
            </div>
            <div className='grid sm:grid-cols-1 grid-cols-2 gap-6'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-teal-100 mb-8 text-lg">Our team at Bricks & Clicks is here to help you every step of the way</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to={'/contact'}
              className='px-8 py-3 rounded-lg bg-white text-teal-600 hover:bg-indigo-50 font-medium transition-colors'
            >
              Contact an Agent
            </Link>
            <Link
              to={'/search'}
              className='px-8 py-3 rounded-lg border-2 border-white text-white hover:bg-teal-700 font-medium transition-colors'
            >
              Browse Listings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}