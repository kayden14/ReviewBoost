import { Target, FileCheck, UserCheck, Star, CheckCircle2, BookOpen } from 'lucide-react';
import Button from '../components/Button';

interface FreelancersPageProps {
  onNavigate: (page: string) => void;
}

export default function FreelancersPage({ onNavigate }: FreelancersPageProps) {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            For <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">Freelancers</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your freelance career with verified reviews that build trust and credibility
            with potential clients. Our skill-matching engine ensures authenticity.
          </p>
          <Button onClick={() => onNavigate('signup')} size="lg">
            Join as Freelancer
          </Button>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Why Verified Reviews Matter
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto leading-relaxed">
            In today's competitive freelance marketplace, credibility is everything
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <Target className="text-teal-500 mb-4" size={40} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Stand Out</h3>
              <p className="text-gray-600 leading-relaxed">
                New freelancers with verified reviews get 3x more profile views and project
                invitations than those without.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <Star className="text-emerald-500 mb-4" size={40} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Build Trust Faster</h3>
              <p className="text-gray-600 leading-relaxed">
                Verified reviews signal to clients that your skills have been independently
                validated, reducing their hiring risk.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <UserCheck className="text-cyan-500 mb-4" size={40} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Command Higher Rates</h3>
              <p className="text-gray-600 leading-relaxed">
                Freelancers with verified credentials and reviews earn 40% more on average
                than those without.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            The Signup & Assessment Process
          </h2>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="bg-gradient-to-br from-teal-500 to-emerald-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                  1
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Create Your Profile</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Sign up with your email and create a comprehensive profile showcasing:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="text-teal-500 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Your core skills and specializations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-teal-500 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Professional credentials and certifications</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-teal-500 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Portfolio links to your best work</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-teal-500 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Preferences for platforms and review types</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 bg-white p-8 rounded-2xl shadow-xl">
                <FileCheck className="text-teal-500 mx-auto mb-4" size={80} />
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="flex-1">
                <div className="bg-gradient-to-br from-teal-500 to-emerald-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                  2
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Vetting</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Our smart matching engine analyzes your profile through:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="text-emerald-500 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Skill assessment tests tailored to your expertise</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-emerald-500 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Credential verification and validation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-emerald-500 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Portfolio quality review</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-emerald-500 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Final admin approval for quality assurance</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 bg-white p-8 rounded-2xl shadow-xl">
                <UserCheck className="text-emerald-500 mx-auto mb-4" size={80} />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="bg-gradient-to-br from-teal-500 to-emerald-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                  3
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Get Matched & Reviewed</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Once approved, you'll move through our streamlined process:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="text-cyan-500 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Receive email notification when matched</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-cyan-500 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Submit review request with payment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-cyan-500 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Track progress in your dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-cyan-500 mr-2 mt-1 flex-shrink-0" size={20} />
                    <span>Receive verified reviews on your target platforms</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 bg-white p-8 rounded-2xl shadow-xl">
                <Star className="text-cyan-500 mx-auto mb-4" size={80} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-12 rounded-3xl shadow-xl border-2 border-amber-200">
            <div className="flex items-start gap-6">
              <BookOpen className="text-amber-600 flex-shrink-0" size={48} />
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Didn't Pass Vetting? We've Got You Covered
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  We believe in growth and improvement. If your profile doesn't meet our current
                  standards, you'll receive:
                </p>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li className="flex items-start">
                    <CheckCircle2 className="text-amber-600 mr-3 mt-1 flex-shrink-0" size={24} />
                    <span>
                      <strong>Personalized feedback</strong> highlighting specific areas for improvement
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-amber-600 mr-3 mt-1 flex-shrink-0" size={24} />
                    <span>
                      <strong>Curated resources</strong> including courses, templates, and mentorship opportunities
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-amber-600 mr-3 mt-1 flex-shrink-0" size={24} />
                    <span>
                      <strong>Reapplication guidance</strong> to help you succeed on your next attempt
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-amber-600 mr-3 mt-1 flex-shrink-0" size={24} />
                    <span>
                      <strong>Progress tracking</strong> to monitor your skill development journey
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-500 to-emerald-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-teal-50 mb-8 leading-relaxed">
            Join ReviewBoost today and accelerate your freelance success with verified reviews
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate('signup')}
              variant="outline"
              size="lg"
              className="bg-white text-teal-600 hover:bg-gray-50 border-0"
            >
              Create Free Account
            </Button>
            <Button
              onClick={() => onNavigate('contact')}
              variant="secondary"
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Have Questions?
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
