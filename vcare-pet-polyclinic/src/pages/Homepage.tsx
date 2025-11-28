import { Link } from 'react-router-dom';
import { Star, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Homepage() {
  const [selectedPetType, setSelectedPetType] = useState<'puppy' | 'dog' | 'kitten' | 'cat'>('dog');

  const services = [
    {
      title: 'Veterinary Consultation',
      description: 'Expert veterinary care for all pet health concerns',
      image: 'https://images.pexels.com/photos/6235241/pexels-photo-6235241.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '/services/veterinary-consultation',
    },
    {
      title: 'Grooming Services',
      description: 'Professional grooming to keep your pet looking their best',
      image: 'https://images.pexels.com/photos/6816857/pexels-photo-6816857.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '/services/grooming',
    },
    {
      title: 'Pet Food Delivery',
      description: '3-hour delivery of premium pet food and supplies',
      image: 'https://images.pexels.com/photos/8434791/pexels-photo-8434791.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '/services/pet-food-delivery',
    },
    {
      title: 'Diagnostics & Lab Tests',
      description: 'Advanced diagnostic services with quick results',
      image: 'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '/services/diagnostics',
    },
    {
      title: 'Surgery Services',
      description: 'State-of-the-art surgical facilities and expert care',
      image: 'https://images.pexels.com/photos/6235267/pexels-photo-6235267.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '/services/surgery',
    },
    {
      title: '24/7 Emergency Care',
      description: 'Round-the-clock emergency veterinary services',
      image: 'https://images.pexels.com/photos/6235128/pexels-photo-6235128.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '/services/emergency-care',
    },
  ];

  const petServices = {
    dog: [
      { name: 'Regular Health Check-Up', price: '₹500' },
      { name: 'Injury, Wound & Trauma Care', price: '₹800' },
      { name: 'Dental Care', price: '₹1200' },
      { name: 'Deworming', price: '₹300' },
      { name: 'Tick & Flea Control', price: '₹400' },
      { name: 'Vaccination', price: '₹600' },
    ],
    cat: [
      { name: 'Regular Health Check-Up', price: '₹500' },
      { name: 'Injury, Wound & Trauma Care', price: '₹800' },
      { name: 'Dental Care', price: '₹1000' },
      { name: 'Deworming', price: '₹300' },
      { name: 'Tick & Flea Control', price: '₹400' },
      { name: 'Vaccination', price: '₹600' },
    ],
    puppy: [
      { name: 'Puppy Health Check-Up', price: '₹500' },
      { name: 'Vaccination Series', price: '₹1500' },
      { name: 'Deworming', price: '₹300' },
      { name: 'Nutrition Consultation', price: '₹400' },
    ],
    kitten: [
      { name: 'Kitten Health Check-Up', price: '₹500' },
      { name: 'Vaccination Series', price: '₹1500' },
      { name: 'Deworming', price: '₹300' },
      { name: 'Nutrition Consultation', price: '₹400' },
    ],
  };

  const reviews = [
    {
      name: 'Priya Sharma',
      rating: 5,
      text: 'Excellent service! The doctors are very caring and knowledgeable. My dog Rocky received the best treatment here.',
      date: '2 weeks ago',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      name: 'Rahul Mehta',
      rating: 5,
      text: 'V-Care Pet Polyclinic has been a lifesaver! The emergency services are top-notch. Highly recommended!',
      date: '1 month ago',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      name: 'Anita Desai',
      rating: 5,
      text: 'The grooming service is fantastic! My cat looks and feels amazing after every visit.',
      date: '3 weeks ago',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
  ];

  const blogPosts = [
    {
      title: 'Preventive Care: From Grooming to Vaccines for Your Dog',
      category: 'Pet Care',
      image: 'https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: 5,
      slug: 'preventive-care-grooming-vaccines',
    },
    {
      title: 'Complete Nutrition Guide for Your Pet',
      category: 'Nutrition',
      image: 'https://images.pexels.com/photos/5731876/pexels-photo-5731876.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: 7,
      slug: 'nutrition-guide-for-pets',
    },
    {
      title: 'Understanding Pet Allergies: Symptoms and Treatment',
      category: 'Health',
      image: 'https://images.pexels.com/photos/8434641/pexels-photo-8434641.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: 6,
      slug: 'understanding-pet-allergies',
    },
  ];

  return (
    <div className="bg-white">
      <section className="relative bg-gradient-to-r from-orange-50 to-orange-100 py-20 md:py-32 overflow-hidden">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-text-primary leading-tight">
                Your Love, Our Care
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                Experience world-class veterinary healthcare for your beloved pets. From consultations to grooming, we've got everything covered.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/book-appointment" className="btn-primary text-lg">
                  Book Appointment
                </Link>
                <Link to="/shop" className="btn-secondary text-lg">
                  Order Pet Food
                </Link>
              </div>
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-semibold text-text-primary">5.0</span>
                </div>
                <div className="text-text-secondary">
                  <span className="font-semibold">72,000+</span> Happy Pet Parents
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4587959/pexels-photo-4587959.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Happy pets"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-b">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">45+</div>
              <div className="text-text-secondary">Clinics</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">11</div>
              <div className="text-text-secondary">Cities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-text-secondary">Expert Vets</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-text-secondary">Emergency Care</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Our Services
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Comprehensive pet healthcare services under one roof
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                to={service.link}
                className="card overflow-hidden group cursor-pointer"
              >
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary mb-4">{service.description}</p>
                  <span className="text-primary font-medium inline-flex items-center group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              How It Works
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Simple steps to get started with V-Care Pet Polyclinic
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-2xl font-semibold text-text-primary mb-4">
                Book Online
              </h3>
              <p className="text-text-secondary">
                Schedule an appointment through our website or app at your convenience
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-2xl font-semibold text-text-primary mb-4">
                Visit Clinic
              </h3>
              <p className="text-text-secondary">
                Visit our clinic or schedule an at-home grooming service
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-2xl font-semibold text-text-primary mb-4">
                Track & Reorder
              </h3>
              <p className="text-text-secondary">
                Access medical records and reorder medications with ease
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Services by Pet Type
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
              Specialized care tailored for your pet's needs
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              {(['puppy', 'dog', 'kitten', 'cat'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedPetType(type)}
                  className={`px-8 py-3 rounded-lg font-medium transition-all ${
                    selectedPetType === type
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-text-primary hover:bg-gray-100'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {petServices[selectedPetType].map((service, index) => (
              <div key={index} className="card p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-text-primary flex-1">
                    {service.name}
                  </h3>
                  <span className="text-primary font-bold text-lg">{service.price}</span>
                </div>
                <Link
                  to="/book-appointment"
                  className="text-primary font-medium inline-flex items-center hover:gap-2 transition-all"
                >
                  Book Now <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              What Pet Parents Say
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Trusted by thousands of pet parents across India
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-text-primary">{review.name}</h4>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-text-secondary mb-4">{review.text}</p>
                <span className="text-sm text-text-light">{review.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Pet Care Tips & Advice
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Expert advice to keep your pets healthy and happy
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="card overflow-hidden group cursor-pointer"
              >
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-primary bg-opacity-10 text-primary text-sm font-medium rounded-full mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-semibold text-text-primary mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-text-light text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/blog" className="btn-primary">
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Give Your Pet the Best Care?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Book an appointment today and experience the V-Care Pet Polyclinic difference
          </p>
          <Link
            to="/book-appointment"
            className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition shadow-lg"
          >
            Book Your Appointment Now
          </Link>
        </div>
      </section>
    </div>
  );
}
