export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-teal-400 mb-4">ReviewBoost</h3>
            <p className="text-gray-400 leading-relaxed">
              Build Trust, Boost Your Freelance Career in days not months.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-teal-400 transition-colors cursor-pointer">
                For Freelancers
              </li>
              <li className="hover:text-teal-400 transition-colors cursor-pointer">
                About Us
              </li>
              <li className="hover:text-teal-400 transition-colors cursor-pointer">
                Contact
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>support@reviewboost.com</li>
              <li>Available 24/7</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ReviewBoost. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
