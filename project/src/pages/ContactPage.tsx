import { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import Button from '../components/Button';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    messageType: 'general',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase.from('contact_submissions').insert([
        {
          name: formData.name,
          email: formData.email,
          message_type: formData.messageType,
          message: formData.message,
          status: 'new',
        },
      ]);

      if (insertError) throw insertError;

      setSuccess(true);
      setFormData({ name: '', email: '', messageType: 'general', message: '' });

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError('Failed to submit. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">Touch</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Have questions? We'd love to hear from you. Send us a message and we'll respond
            within 24-48 hours.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <Mail className="text-teal-500 mb-4" size={40} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-3">Our team is here to help</p>
              <a href="mailto:support@reviewboost.com" className="text-teal-600 hover:text-teal-700 font-medium">
                support@reviewboost.com
              </a>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <Phone className="text-emerald-500 mb-4" size={40} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-3">Available 24/7</p>
              <p className="text-emerald-600 font-medium">
                Use the chat icon at bottom right
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <MapPin className="text-cyan-500 mb-4" size={40} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600 mb-3">Serving freelancers worldwide</p>
              <p className="text-cyan-600 font-medium">
                Remote-first company
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>

              {success && (
                <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="text-teal-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-semibold text-teal-900">Message sent successfully!</p>
                    <p className="text-teal-700 text-sm">
                      We'll get back to you within 24-48 hours.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Your Name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />

                <Select
                  label="Message Type"
                  value={formData.messageType}
                  onChange={(e) => setFormData({ ...formData, messageType: e.target.value })}
                  required
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="other">Other</option>
                </Select>

                <TextArea
                  label="Message"
                  placeholder="Tell us how we can help you..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                <Button type="submit" disabled={loading} className="w-full" size="lg">
                  <Send className="mr-2" size={20} />
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-8 rounded-2xl border border-teal-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">How long does vetting take?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Most profiles are reviewed within 3-5 business days. You'll receive an email
                      notification once the review is complete.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">What if I don't pass vetting?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      You'll receive personalized feedback and curated resources to help you
                      improve. You can reapply after addressing the identified areas.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">How are reviews delivered?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Reviews are posted directly on your chosen platforms within 5-7 business
                      days after request approval and payment processing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border border-amber-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Response Time</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We strive to respond to all inquiries promptly:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">•</span>
                    <span><strong>Live Chat:</strong> Instant to 5 minutes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">•</span>
                    <span><strong>Email:</strong> Within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">•</span>
                    <span><strong>Contact Form:</strong> Within 24-48 hours</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Business Hours</h3>
                <p className="text-gray-700 leading-relaxed">
                  While our chat support is available 24/7, our team operates globally to ensure
                  your questions are answered promptly regardless of your timezone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
