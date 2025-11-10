import { Target, Shield, Users, Heart, Award, Zap } from 'lucide-react';
import Button from '../components/Button';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">ReviewBoost</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to empower freelancers worldwide by providing a trusted platform
            for verified reviews that accelerate career growth and build lasting credibility.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                ReviewBoost was founded with a simple yet powerful vision: to level the playing
                field for emerging freelancers who struggle to break into competitive markets
                without an established track record.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We understand the challenge of the "experience paradox" freelancers face needing
                reviews to get work, but needing work to get reviews. That's why we created a
                transparent, skill-verified system that helps talented professionals showcase
                their abilities authentically.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through our rigorous AI-powered vetting process combined with human oversight,
                we ensure every review reflects genuine skill and competence, maintaining trust
                for both freelancers and the clients who hire them.
              </p>
            </div>
            <div className="bg-gradient-to-br from-teal-100 to-emerald-100 p-12 rounded-3xl shadow-xl">
              <Target className="text-teal-600 mb-6" size={64} />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To become the world's most trusted platform for freelancer credential verification,
                setting the gold standard for authentic skill validation in the gig economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto leading-relaxed">
            These principles guide everything we do at ReviewBoost
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <Shield className="text-teal-500 mb-4" size={48} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Transparency</h3>
              <p className="text-gray-600 leading-relaxed">
                We operate with complete openness about our vetting process, review methodology,
                and commitment to authenticity. No hidden practices, just honest verification.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <Award className="text-emerald-500 mb-4" size={48} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Every freelancer profile undergoes rigorous skill assessment and credential
                verification. We never compromise on quality to maintain platform integrity.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <Users className="text-cyan-500 mb-4" size={48} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Community</h3>
              <p className="text-gray-600 leading-relaxed">
                We're building more than a platform we're fostering a supportive community where
                freelancers can grow, learn, and succeed together.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <Heart className="text-pink-500 mb-4" size={48} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Empowerment</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe in second chances. Freelancers who don't pass vetting receive
                personalized resources and guidance to improve and reapply successfully.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <Zap className="text-yellow-500 mb-4" size={48} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI-powered matching engine continuously evolves to provide smarter, faster,
                and more accurate skill assessments for freelancers worldwide.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <Target className="text-teal-500 mb-4" size={48} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Results</h3>
              <p className="text-gray-600 leading-relaxed">
                We're focused on delivering measurable impact helping freelancers land better
                projects, command higher rates, and build sustainable careers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Our Commitment to You
          </h2>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-8 rounded-2xl border-l-4 border-teal-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">For Freelancers</h3>
              <p className="text-gray-700 leading-relaxed">
                We promise to provide a fair, transparent vetting process that truly assesses
                your skills. Whether you're approved immediately or need time to improve, we're
                committed to supporting your professional growth with resources, feedback, and
                encouragement every step of the way.
              </p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 p-8 rounded-2xl border-l-4 border-emerald-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">For Clients & Platforms</h3>
              <p className="text-gray-700 leading-relaxed">
                We guarantee that every review issued through ReviewBoost represents genuine
                skill verification. Our multi-stage vetting process with AI analysis and admin
                approval ensures that you can trust the credentials of freelancers on our
                platform, reducing hiring risk and improving project outcomes.
              </p>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-teal-50 p-8 rounded-2xl border-l-4 border-cyan-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">For the Industry</h3>
              <p className="text-gray-700 leading-relaxed">
                We're dedicated to elevating standards across the freelance ecosystem. By
                promoting authentic skill validation and transparent review practices, we're
                working to build greater trust between freelancers, clients, and platforms
                ultimately creating a healthier, more sustainable gig economy for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-500 to-emerald-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-teal-50 mb-8 leading-relaxed">
            Be part of the movement to transform how freelance credibility is built and verified
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate('signup')}
              variant="outline"
              size="lg"
              className="bg-white text-teal-600 hover:bg-gray-50 border-0"
            >
              Get Started as Freelancer
            </Button>
            <Button
              onClick={() => onNavigate('contact')}
              variant="secondary"
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Partner With Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
