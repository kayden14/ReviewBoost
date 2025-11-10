import { CheckCircle, Shield, Zap, Award, TrendingUp, Users } from 'lucide-react';
import Button from '../components/Button';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Build Trust, Boost Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">
                {' '}
                Freelance Career
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Earn verified, paid reviews on freelancing platforms in days, not months.
              Build credibility through our vetted skill-matching engine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button onClick={() => onNavigate('signup')} size="lg">
                Request Review Now
              </Button>
              <Button onClick={() => onNavigate('freelancers')} variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-teal-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-teal-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">100% Verified</h3>
              <p className="text-gray-600 leading-relaxed">
                Every review is vetted and verified through our rigorous skill assessment process
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-emerald-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Zap className="text-emerald-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Results</h3>
              <p className="text-gray-600 leading-relaxed">
                Get approved reviews in days, not months. Accelerate your freelance growth
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-cyan-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Award className="text-cyan-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Trusted Platform</h3>
              <p className="text-gray-600 leading-relaxed">
                Join thousands of freelancers building credibility through authentic reviews
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-500 to-emerald-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sign Up</h3>
              <p className="text-gray-600 leading-relaxed">
                Create your profile with skills, credentials, and portfolio
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-500 to-emerald-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Vetted</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI-powered engine assesses your skills and credentials
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-500 to-emerald-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Request Review</h3>
              <p className="text-gray-600 leading-relaxed">
                Submit your review request with payment for target platforms
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-500 to-emerald-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Reviewed</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive verified reviews on your chosen freelancing platforms
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Why ReviewBoost?
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto leading-relaxed">
            We're the trusted leader in verified freelance reviews, committed to transparency
            and authenticity
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <CheckCircle className="text-teal-500 mb-4" size={40} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Skill-Verified Feedback</h3>
              <p className="text-gray-600 leading-relaxed">
                Every review comes from verified skill assessments and credential checks,
                ensuring authenticity and trust for both freelancers and clients.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <TrendingUp className="text-emerald-500 mb-4" size={40} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Accelerate Your Growth</h3>
              <p className="text-gray-600 leading-relaxed">
                Bypass the months-long wait for organic reviews. Build credibility quickly
                and start winning high-value projects sooner.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Shield className="text-cyan-500 mb-4" size={40} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Admin-Approved Process</h3>
              <p className="text-gray-600 leading-relaxed">
                Our rigorous vetting process with admin approval ensures only qualified
                freelancers receive reviews, maintaining platform integrity.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Users className="text-teal-500 mb-4" size={40} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Supportive Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Didn't pass vetting? We provide personalized resources and mentorship
                to help you improve and reapply successfully.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            What Freelancers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "ReviewBoost helped me get my first reviews in just 5 days. The vetting
                process was thorough but fair. Now I'm landing better projects!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  SA
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-900">Faith Ortega</p>
                  <p className="text-gray-600 text-sm">Front-end Developer</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "The skill assessment was challenging, which made the verified review even
                more valuable. Clients trust my profile now more than ever."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  MR
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-900">Philip</p>
                  <p className="text-gray-600 text-sm">FullStack Developer</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "I didn't pass the first time, but the resources they provided helped me
                improve. Second attempt was successful and totally worth it!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  LP
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-900">Rhoda Idor</p>
                  <p className="text-gray-600 text-sm">Product Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-500 to-emerald-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Boost Your Freelance Career?
          </h2>
          <p className="text-xl text-teal-50 mb-8 leading-relaxed">
            Join thousands of freelancers who have accelerated their success with verified reviews
          </p>
          <Button
            onClick={() => onNavigate('signup')}
            variant="outline"
            size="lg"
            className="bg-white text-teal-600 hover:bg-gray-50 border-0"
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
}
