import React from 'react';
import CountUp from 'react-countup';
import { FaStar, FaRegStar } from 'react-icons/fa';

export default function About() {
  return (
    <div className="pt-20 px-4 max-w-6xl mx-auto">
      {/* About Text Section */}
      <section className="mb-20">
        <h1 className="text-4xl font-bold mb-6 text-slate-700">
          About <span className="text-slate-500">Bricks</span> &{' '}
          <span className="text-slate-500">Clicks</span>
        </h1>
        <p className="mb-5 text-slate-700 text-lg leading-relaxed">
          Welcome to <strong>Bricks & Clicks</strong>, your trusted partner in real estate! Whether you're searching for your dream home, listing a property, or exploring rental opportunities, we make the journey smooth, smart, and satisfying.
        </p>
        <p className="mb-5 text-slate-700 text-lg leading-relaxed">
          With a perfect blend of traditional real estate values (<em>Bricks</em>) and modern digital convenience (<em>Clicks</em>), we deliver an unmatched experience powered by local expertise, market insight, and a people-first approach.
        </p>
        <p className="mb-5 text-slate-700 text-lg leading-relaxed">
          Our experienced agents are passionate about helping you make confident decisions — whether it's your first home, a smart investment, or a new rental. We’re not just selling properties; we’re helping you build your future.
        </p>
        <p className="mb-5 text-slate-700 text-lg leading-relaxed">
          At Bricks & Clicks, we believe in transparency, integrity, and creating relationships that last beyond the transaction.
        </p>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-100 rounded-xl mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-700">Our Impact in Numbers</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center px-4">
          <div>
            <h3 className="text-4xl font-bold text-blue-600">
              <CountUp end={500} duration={3} />+
            </h3>
            <p className="text-slate-700 mt-2">Happy Clients</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">
              <CountUp end={120} duration={3} />+
            </h3>
            <p className="text-slate-700 mt-2">Properties Sold</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">
              <CountUp end={15} duration={3} />
            </h3>
            <p className="text-slate-700 mt-2">Cities Served</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">
              <CountUp end={98} duration={3} />%
            </h3>
            <p className="text-slate-700 mt-2">Client Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-white py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800">What Our Clients Say</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3 px-8">
          {/* Review 1 */}
          <div className="bg-slate-100 p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-3 text-yellow-500">
              {[...Array(5)].map((_, i) => <FaStar key={i} />)}
            </div>
            <p className="text-slate-700 mb-4 italic">
              "Bricks & Clicks helped me find my dream home with zero hassle. Their team was supportive, knowledgeable, and always available."
            </p>
            <h3 className="font-semibold text-slate-800">— Priya Mehta</h3>
          </div>

          {/* Review 2 */}
          <div className="bg-slate-100 p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-3 text-yellow-500">
              {[...Array(4)].map((_, i) => <FaStar key={i} />)}
              <FaRegStar />
            </div>
            <p className="text-slate-700 mb-4 italic">
              "I sold my property above asking price thanks to their amazing marketing strategy. Highly recommend them!"
            </p>
            <h3 className="font-semibold text-slate-800">— Arjun Patel</h3>
          </div>

          {/* Review 3 */}
          <div className="bg-slate-100 p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-3 text-yellow-500">
              {[...Array(4)].map((_, i) => <FaStar key={i} />)}
              <FaRegStar />
            </div>
            <p className="text-slate-700 mb-4 italic">
              "From the first viewing to closing, they made everything seamless. I felt guided and respected throughout."
            </p>
            <h3 className="font-semibold text-slate-800">— Sneha Rao</h3>
          </div>

          {/* Review 4 */}
          <div className="bg-slate-100 p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-3 text-yellow-500">
              {[...Array(3)].map((_, i) => <FaStar key={i} />)}
              <FaRegStar />
              <FaRegStar />
            </div>
            <p className="text-slate-700 mb-4 italic">
              "Professional, polite, and prompt! The agents understood exactly what I was looking for and delivered beyond expectations."
            </p>
            <h3 className="font-semibold text-slate-800">— Rohit Desai</h3>
          </div>

          {/* Review 5 */}
          <div className="bg-slate-100 p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-3 text-yellow-500">
              {[...Array(4)].map((_, i) => <FaStar key={i} />)}
              <FaRegStar />
            </div>
            <p className="text-slate-700 mb-4 italic">
              "I had a tight deadline and a tight budget, and Bricks & Clicks still found me a fantastic place to live!"
            </p>
            <h3 className="font-semibold text-slate-800">— Meenal Shah</h3>
          </div>

          {/* Review 6 */}
          <div className="bg-slate-100 p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-3 text-yellow-500">
              {[...Array(5)].map((_, i) => <FaStar key={i} />)}
            </div>
            <p className="text-slate-700 mb-4 italic">
              "Hands down the best real estate experience I’ve had. Efficient communication and no last-minute surprises!"
            </p>
            <h3 className="font-semibold text-slate-800">— Ankit Rawal</h3>
          </div>
        </div>
      </section>

    </div>
  );
}
