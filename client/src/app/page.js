import Link from "next/link";
import { ArrowRight, Users, Calendar, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br bg-slate-900 text-white    py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight mb-8">
              Bring Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">Community</span> Together
            </h1>
            <p className="text-xl text-gray-500 mb-10 leading-relaxed">
              Create, discover, and participate in local events. Whether it's a workshop,
              a sports meetup, or a volunteering drive, Community Connect is the place to make it happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/explore" className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-base font-medium rounded-full shadow-none text-white bg-indigo-500 hover:bg-indigo-600 hover:scale-105 transition-all duration-200">
                Explore Events
              </Link>
              <Link href="/create" className="inline-flex justify-center items-center px-8 py-3.5 border-2 border-indigo-600  text-base font-medium rounded-full text-indigo-400  hover:bg-indigo-50 hover:bg-indigo-900/30 hover:scale-105 transition-all duration-200">
                Host an Event
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-40 ">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl rounded-blob animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl rounded-blob animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl rounded-blob animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Why Community Connect?</h2>
            <p className="mt-4 text-lg text-gray-500">Everything you need to build meaningful local connections.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-indigo-950/30 bg-slate-900 text-white p-8 rounded-2xl text-center card-hover">
              <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-indigo-400 " />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Meet New People</h3>
              <p className="text-gray-500">Connect with like-minded individuals in your area who share your interests.</p>
            </div>

            <div className="bg-pink-950/30 bg-slate-900 text-white p-8 rounded-2xl text-center card-hover">
              <div className="w-16 h-16 mx-auto bg-pink-100 rounded-full flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-pink-400 " />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Organize Easily</h3>
              <p className="text-gray-500">Our simple tools let you create and manage events without any hassle.</p>
            </div>

            <div className="bg-emerald-950/30 bg-slate-900 text-white p-8 rounded-2xl text-center card-hover">
              <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-emerald-400 " />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Discover Local Spots</h3>
              <p className="text-gray-500">Find hidden gems in your city by attending events at unique local venues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-500  py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to start connecting?</h2>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of users who are already discovering and creating amazing local experiences.
          </p>
          <Link href="/register" className="inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-400 bg-slate-900 text-white hover:bg-gray-50 transition-colors shadow-none">
            Create Free Account <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
