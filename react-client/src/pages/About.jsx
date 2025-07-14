import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaHome, FaChartLine, FaHandshake } from 'react-icons/fa';
import { MdSecurity, MdOutlineSupportAgent } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';
import CountUp from 'react-countup';

const teamMembers = [
  {
    name: "Rahul Sharma",
    role: "Founder & CEO",
    bio: "20+ years in real estate with a passion for client education",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    social: { facebook: "#", linkedin: "#", twitter: "#" }
  },
  {
    name: "Neha Kapoor",
    role: "Sales Director",
    bio: "Specializes in luxury properties and investment portfolios",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    social: { instagram: "#", linkedin: "#" }
  },
  {
    name: "Vikram Mehta",
    role: "Technology Head",
    bio: "Building the digital tools that make your search easier",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    social: { twitter: "#", linkedin: "#" }
  }
];

const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger once
    threshold: 0.4, // When 30% of element is visible
  });

  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (inView) {
      setStartAnimation(true);
    }
  }, [inView]);

  const stats = [
    { number: 500, suffix: "+", label: "Happy Clients" },
    { number: 120, suffix: "+", label: "Properties Sold" },
    { number: 15, suffix: "", label: "Cities Served" },
    { number: 98, suffix: "%", label: "Client Satisfaction" },
  ];

  return (
    <section
      ref={ref}
      className="bg-gradient-to-r from-teal-600 to-indigo-600 rounded-xl mb-20 p-12 text-white"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Our Impact in Numbers</h2>
        <p className="text-teal-100">Real results for real people</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index}>
            <h3 className="text-5xl font-bold mb-2">
              {startAnimation ? (
                <CountUp
                  end={stat.number}
                  duration={2.5}
                  suffix={stat.suffix}
                />
              ) : (
                <span>0{stat.suffix}</span>
              )}
            </h3>
            <p className="text-teal-100">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};


export default function About() {
  return (
    <div className="pt-20 px-4 max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="mb-20 text-center">
        <h1 className="text-5xl font-bold mb-6 text-slate-800">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-600 drop-shadow-[0_2px_8px_rgba(20,184,166,0.3)]">Bricks</span> &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-600 drop-shadow-[0_2px_8px_rgba(79,70,229,0.3)]">Clicks</span>
        </h1>
        <p className="max-w-3xl mx-auto text-slate-600 text-xl leading-relaxed">
          Where traditional real estate values meet digital innovation to deliver exceptional service
        </p>
      </section>

      {/* About Text Section */}
      <section className="mb-20 bg-white rounded-xl shadow-sm p-8 border border-gray-100">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-800">Our Story</h2>
            <p className="mb-5 text-slate-600 text-lg leading-relaxed">
              Founded in 2015, <strong className="text-teal-600">Bricks & Clicks</strong> began with a simple mission: to revolutionize real estate by combining the personal touch of traditional brokerage with cutting-edge technology.
            </p>
            <p className="mb-5 text-slate-600 text-lg leading-relaxed">
              What started as a small team of passionate agents has grown into one of the most trusted names in real estate, serving hundreds of satisfied clients across multiple cities.
            </p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-700">Our Mission</h3>
            <p className="text-slate-700 mb-4">
              To empower every client with knowledge, tools, and personalized service that makes property transactions transparent, efficient, and rewarding.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-indigo-700 mt-6">Our Vision</h3>
            <p className="text-slate-700">
              To become the most client-centric real estate platform where everyone can find their perfect space with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800">Our Core Values</h2>
          <p className="text-slate-500 mt-2">The foundation of everything we do</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <MdSecurity size={40} className="text-teal-600" />, title: "Integrity", desc: "Honest advice with full transparency" },
            { icon: <FaHome size={40} className="text-indigo-600" />, title: "Expertise", desc: "Deep market knowledge you can trust" },
            { icon: <FaChartLine size={40} className="text-teal-600" />, title: "Innovation", desc: "Smart tools for smarter decisions" },
            { icon: <FaHandshake size={40} className="text-indigo-600" />, title: "Commitment", desc: "Dedicated to your success" },
            { icon: <RiTeamFill size={40} className="text-teal-600" />, title: "Collaboration", desc: "Teamwork for better results" },
            { icon: <MdOutlineSupportAgent size={40} className="text-indigo-600" />, title: "Service", desc: "Always putting you first" },
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />
      {/* <section className="bg-gradient-to-r from-teal-600 to-indigo-600 rounded-xl mb-20 p-12 text-white">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Our Impact in Numbers</h2>
          <p className="text-teal-100">Real results for real people</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { number: 500, suffix: "+", label: "Happy Clients" },
            { number: 120, suffix: "+", label: "Properties Sold" },
            { number: 15, suffix: "", label: "Cities Served" },
            { number: 98, suffix: "%", label: "Client Satisfaction" },
          ].map((stat, index) => (
            <div key={index}>
              <h3 className="text-5xl font-bold mb-2">
                <CountUp end={stat.number} duration={3} />
                {stat.suffix}
              </h3>
              <p className="text-teal-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Team Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800">Meet Our Leadership</h2>
          <p className="text-slate-500 mt-2">The experienced professionals guiding your journey</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100">
              <div className="h-64 bg-gray-50 flex items-center justify-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800">{member.name}</h3>
                <p className="text-indigo-600 mb-3">{member.role}</p>
                <p className="text-slate-600 mb-4">{member.bio}</p>
                <div className="flex space-x-4">
                  {member.social.facebook && (
                    <a href={member.social.facebook} className="text-indigo-600 hover:text-indigo-800">
                      <FaFacebook className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="text-teal-600 hover:text-teal-800">
                      <FaTwitter className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="text-indigo-600 hover:text-indigo-800">
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.instagram && (
                    <a href={member.social.instagram} className="text-teal-600 hover:text-teal-800">
                      <FaInstagram className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-500 to-indigo-500 rounded-xl p-12 text-center text-white mb-20">
        <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Real Estate Journey?</h2>
        <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
          Whether you're buying, selling, or renting, our team is here to guide you every step of the way with expert advice and personalized service.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition hover:shadow-lg">
            Contact Our Team
          </button>
          {/* <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition hover:shadow-lg">
            Browse Properties
          </button> */}
        </div>
      </section>
    </div>
  );
}