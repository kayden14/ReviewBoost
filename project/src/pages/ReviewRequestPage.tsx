import { useState, useEffect } from 'react';
import { supabase, FreelancerProfile } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import Button from '../components/Button';
import { CheckCircle, DollarSign } from 'lucide-react';

interface ReviewRequestPageProps {
  onNavigate: (page: string) => void;
}

const PLATFORMS = ['Upwork', 'Fiverr', 'Freelancer.com', 'Toptal', 'PeoplePerHour', 'Other'];
const PAYMENT_OPTIONS = [50, 100, 150, 200, 250, 300];

export default function ReviewRequestPage({ onNavigate }: ReviewRequestPageProps) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<FreelancerProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    reviewDescription: '',
    paymentAmount: '100',
    platforms: [] as string[],
    additionalInfo: '',
  });

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('freelancer_profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (data) {
      setProfile(data);
      if (data.status !== 'matched' && data.status !== 'reviewed') {
        onNavigate('dashboard');
      }
    }
  };

  const handlePlatformToggle = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.platforms.length === 0) {
      setError('Please select at least one platform');
      setLoading(false);
      return;
    }

    try {
      const { error: insertError } = await supabase.from('review_requests').insert([
        {
          freelancer_id: profile?.id,
          review_description: formData.reviewDescription,
          payment_amount: parseFloat(formData.paymentAmount),
          platforms: formData.platforms,
          additional_info: formData.additionalInfo || null,
          status: 'pending',
          payment_status: 'completed',
        },
      ]);

      if (insertError) throw insertError;

      setSuccess(true);
      setTimeout(() => {
        onNavigate('dashboard');
      }, 2000);
    } catch (err) {
      setError('Failed to submit request. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white p-12 rounded-2xl shadow-lg text-center max-w-md">
          <CheckCircle className="mx-auto mb-6 text-teal-500" size={80} />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Submitted!</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Your review request has been submitted successfully. Our team will review it and
            process your reviews shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Request Review</h1>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Submit your review request with payment to receive verified reviews on your chosen
            platforms
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <TextArea
              label="Review Description"
              placeholder="Describe the kind of reviews you need (e.g., focus on communication skills, project delivery, technical expertise)"
              rows={4}
              value={formData.reviewDescription}
              onChange={(e) => setFormData({ ...formData, reviewDescription: e.target.value })}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Platforms
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {PLATFORMS.map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => handlePlatformToggle(platform)}
                    className={`p-4 border-2 rounded-lg text-sm font-medium transition-all ${
                      formData.platforms.includes(platform)
                        ? 'border-teal-500 bg-teal-50 text-teal-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-teal-300'
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Payment Amount
              </label>
              <div className="grid grid-cols-3 gap-3">
                {PAYMENT_OPTIONS.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentAmount: amount.toString() })}
                    className={`p-4 border-2 rounded-lg font-semibold transition-all ${
                      formData.paymentAmount === amount.toString()
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <DollarSign size={18} />
                      <span>{amount}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <TextArea
              label="Additional Information (optional)"
              placeholder="Any special requests or additional details"
              rows={3}
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
            />

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 rounded-xl p-6">
              <h3 className="font-bold text-teal-900 mb-2 text-lg">Payment Summary</h3>
              <div className="flex justify-between items-center text-lg">
                <span className="text-gray-700">Total Amount:</span>
                <span className="text-2xl font-bold text-teal-600">
                  ${formData.paymentAmount}
                </span>
              </div>
              <p className="text-sm text-teal-700 mt-3">
                Secure payment will be processed. Reviews will be issued within 5-7 business days
                after approval.
              </p>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? 'Processing...' : 'Submit Request & Pay'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onNavigate('dashboard')}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-3 text-lg">What happens after submission?</h3>
          <ol className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="font-bold mr-2">1.</span>
              <span>Your payment is processed securely</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">2.</span>
              <span>Admin team reviews your request details</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">3.</span>
              <span>Upon approval, reviews are issued on selected platforms</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">4.</span>
              <span>You receive confirmation with review links</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
