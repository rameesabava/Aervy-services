import React from 'react'

function Contact() {
  return (
    <div className="bg-gray-400 min-h-screen text-gray-800 overflow-hidden">

      {/* contact section */}
      <section className="relative bg-cover bg-center" style={{ backgroundImage: "url('/kochi.jpg')" }}>
        <div className="absolute inset-0 bg-white/60"></div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 grid lg:grid-cols-2 gap-10 items-center">

          {/* Left text content */}
          <div>
            <p className="text-green-950 font-bold tracking-wide uppercase text-sm mb-4">
              We'd love to hear from you
            </p>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Contact <span className="text-amber-700">Aervy</span>
            </h1>

            <p className="mt-6 text-lg max-w-xl font-semibold">
              We’re here to help you find trusted local services in Kochi. Have questions, feedback, or want to become a provider? Reach out anytime.
            </p>

          </div>

          {/* Right contact */}
          <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-[35px] p-8 border border-white/40">
            <h2 className="text-3xl font-bold mb-8">Get in touch</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 text-2xl">
                  ✉
                </div>
                <div>
                  <p className="font-semibold">Email Us</p>
                  <p className="text-gray-600">hello@aervy.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 text-2xl">
                  ☎
                </div>
                <div>
                  <p className="font-semibold">Call Us</p>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 text-2xl">
                  📍
                </div>
                <div>
                  <p className="font-semibold">Our Location</p>
                  <p className="text-gray-600">Kochi, Kerala, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 text-2xl">
                  🕒
                </div>
                <div>
                  <p className="font-semibold">Working Hours</p>
                  <p className="text-gray-600">Mon - Sat : 9 AM - 8 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CONTACT FORM */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 -mt-8 relative z-10">
        <div className="bg-white shadow-2xl rounded-[35px] p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">Send us a message</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-500 mt-4">
              We’ll get back to you as soon as possible.
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Full Name"
                className="bg-gray-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-400"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="bg-gray-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-400"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="bg-gray-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-400"
              />

              <input
                type="text"
                placeholder="Service Needed"
                className="bg-gray-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <textarea
              rows="6"
              placeholder="Your Message"
              className="w-full bg-gray-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-400"
            ></textarea>
            <button className="w-full bg-gradient-to-r from-amber-500 to-amber-700 hover:scale-[1.01] transition-all duration-300 text-white font-semibold py-4 rounded-2xl shadow-lg">
              Send Message
            </button>
          </form>
        </div>
      </section>


      {/* HELP SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">How can we help you?</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-[30px] p-8 shadow-lg hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-4xl mb-6">
              🎧
            </div>
            <h3 className="text-2xl font-bold mb-3 text-green-700">
              Customer Support
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Need help booking a service or have a general query?
            </p>
            <button className="mt-6 border border-green-600 text-green-700 px-6 py-3 rounded-2xl hover:bg-green-50 transition-all font-semibold">
              Chat Support
            </button>
          </div>
          <div className="bg-white rounded-[30px] p-8 shadow-lg hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center text-4xl mb-6">
              🛡
            </div>
            <h3 className="text-2xl font-bold mb-3 text-amber-700">
              Become a Provider
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Join Aervy and grow your business locally.
            </p>
            <button className="mt-6 border border-amber-600 text-amber-700 px-6 py-3 rounded-2xl hover:bg-amber-50 transition-all font-semibold">
              Apply Now
            </button>
          </div>

          <div className="bg-white rounded-[30px] p-8 shadow-lg hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center text-4xl mb-6">
              ⚡
            </div>
            <h3 className="text-2xl font-bold mb-3 text-red-600">
              Emergency Services
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Fast response for urgent repairs and assistance.
            </p>
            <button className="mt-6 border border-red-500 text-red-600 px-6 py-3 rounded-2xl hover:bg-red-50 transition-all font-semibold">
              Contact Now
            </button>
          </div>
        </div>
      </section>
      {/* COVERAGE SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <div className="bg-white rounded-[35px] shadow-2xl overflow-hidden grid lg:grid-cols-2 border border-gray-100">

          {/* LEFT */}
          <div className="p-10">
            <h2 className="text-4xl font-bold mb-5">Serving Across Kochi</h2>

            <p className="text-gray-600 leading-relaxed mb-8">
              From Fort Kochi to Kakkanad, our verified professionals are available in your neighbourhood.
            </p>

            <div className="grid grid-cols-2 gap-4 text-gray-700 font-medium">
              <p>✔ Kakkanad</p>
              <p>✔ Aluva</p>
              <p>✔ Fort Kochi</p>
              <p>✔ Kalamassery</p>
              <p>✔ Edappally</p>
              <p>✔ Vyttila</p>
            </div>
            <div className="flex gap-5 mt-10 flex-wrap">
              <div className="bg-gray-100 rounded-3xl px-6 py-5 shadow-sm">
                <h3 className="text-3xl font-bold text-green-700">800+</h3>
                <p className="text-gray-500">Verified Providers</p>
              </div>

              <div className="bg-gray-100 rounded-3xl px-6 py-5 shadow-sm">
                <h3 className="text-3xl font-bold text-green-700">15k+</h3>
                <p className="text-gray-500">Happy Users</p>
              </div>
            </div>
          </div>

          {/* MAP */}
          <div className="relative min-h-[400px]">
            <img
              src="/map.png"
              alt="map"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          </div>
        </div>
      </section>


      {/* CTA SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <div
          className="relative rounded-[35px] overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/background.png')" }}
        >
          <div className="absolute inset-0 bg-amber-900/75"></div>

          <div className="relative z-10 px-10 py-14 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-4xl font-bold text-white leading-tight">
                Ready to book trusted local services?
              </h2>
              <p className="text-amber-100 mt-4 text-lg">
                Find the right professional for the job — fast and easy.
              </p>
            </div>

            <div className="flex gap-4 flex-wrap">
              <button className="bg-white text-amber-700 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all shadow-xl">
                Find Services
              </button>

              <button className="border border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-amber-700 transition-all">
                Join as Provider
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact