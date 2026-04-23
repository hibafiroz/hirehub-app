function Footer() {
  return (
      <footer className="mt-17 bg-teal-700/90 border-t border-white/10 text-slate-400">
  <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

    <div>
      <h2 className="text-xl font-semibold text-white">
        Job<span className="text-teal-400 italic">Portal</span>
      </h2>
      <p className="mt-4 text-sm text-slate-200 leading-relaxed">
        Connecting talent with opportunity. Find your dream job or hire top professionals across industries.
      </p>
    </div>

    <div>
      <h3 className="text-white font-medium mb-4">About</h3>
      <ul className="space-y-2 text-sm text-slate-300">
        <li><a href="/about" className="hover:text-teal-300 transition">About Us</a></li>
        <li><a href="/browse-jobs" className="hover:text-teal-300 transition">Browse Jobs</a></li>
        <li><a href="/companies" className="hover:text-teal-300 transition">Companies</a></li>
      </ul>
    </div>

    <div>
      <h3 className="text-white font-medium mb-4">Support</h3>
      <ul className="space-y-2 text-sm text-slate-300">
        <li><a href="/contact" className="hover:text-teal-300 transition">Contact</a></li>
        <li><a href="/privacy-policy" className="hover:text-teal-300 transition">Privacy Policy</a></li>
        <li><a href="/terms" className="hover:text-teal-300 transition">Terms & Conditions</a></li>
      </ul>
    </div>

    <div>
      <h3 className="text-white font-medium mb-4">Follow Us</h3>
      <div className="flex gap-4 text-slate-300">
        <a href="#" className="hover:text-teal-300 transition">
          <i className="fab fa-linkedin text-lg"></i>
        </a>
        <a href="#" className="hover:text-teal-300 transition">
          <i className="fab fa-github text-lg"></i>
        </a>
        <a href="#" className="hover:text-teal-300 transition">
          <i className="fab fa-twitter text-lg"></i>
        </a>
      </div>
    </div>

  </div>

  <div className="border-t border-white/10 py-4 text-center text-sm text-slate-300">
    © 2025 Job<span className="italic text-teal-400">Portal</span>. Designed & Developed for academic purpose.
  </div>

</footer>
  )
}

export default Footer