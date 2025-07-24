import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Building2, Globe, MessageSquare } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    state: '',
    country: '',
    query: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    // Validate required fields
    const requiredFields = ['fullName', 'email', 'mobile', 'city', 'state', 'country', 'query'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
    
    if (missingFields.length > 0) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        city: '',
        state: '',
        country: '',
        query: ''
      });
    }, 3000);
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50 mt-16">
      {/* Hero Banner */}
      <div className="relative h-96 overflow-hidden">
        {/* 4K Marble Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=1920&h=1080&fit=crop&q=80"
            alt="Premium Marble Background"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=80";
            }}
          />
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              Get In <span className="text-red-400">Touch</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed drop-shadow-md">
              Ready to transform your space with premium marble and granite? 
              We're here to help bring your vision to life with expert guidance and quality materials.
            </p>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Phone className="w-6 h-6 text-red-400" />
                <span className="text-lg">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Mail className="w-6 h-6 text-red-400" />
                <span className="text-lg">info@rkmarble.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-red-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-40 w-20 h-20 bg-red-400/15 rounded-full blur-lg"></div>
        <div className="absolute top-40 left-20 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Contact Details & Map Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <p className="text-gray-600 text-lg mb-8">
                Visit our showroom or reach out to us for personalized assistance with your marble and granite needs.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">123 Marble Street, Karol Bagh<br />New Delhi - 110005, India</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone Numbers</h3>
                    <p className="text-gray-600">+91 98765 43210<br />+91 11 2578 9999</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@rkmarble.com<br />sales@rkmarble.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">Mon - Sat: 9:00 AM - 7:00 PM<br />Sunday: 10:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delhi Map */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Location</h2>
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
              <div className="relative h-96 bg-gray-200 rounded-xl overflow-hidden">
                {/* Embedded Map Placeholder */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.48121261312!2d76.84887368359375!3d28.527149299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1635789012345!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                  title="RK Marble Location in Delhi"
                ></iframe>
                
                {/* Map Overlay for styling */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-gray-800">RK Marble Showroom</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Inquiry Form */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-red-50 px-8 py-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-red-600" />
              <h2 className="text-3xl font-bold text-gray-900">Business Inquiry</h2>
            </div>
            <p className="text-gray-600 mt-2">Share your requirements and we'll get back to you with the best solutions.</p>
          </div>

          <div className="p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h3>
                <p className="text-gray-600">Your inquiry has been submitted successfully. We'll contact you soon.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Form Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email ID"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Mobile No."
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Query Textarea */}
                <div>
                  <textarea
                    name="query"
                    placeholder="Query"
                    rows="6"
                    value={formData.query}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none flex items-center gap-3 mx-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactPage;