import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import { CheckCircle } from 'lucide-react';

interface ProfileSetupProps {
  onNavigate: (page: string) => void;
}

export default function ProfileSetup({ onNavigate }: ProfileSetupProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    skills: '',
    portfolioUrl: '',
    credentialsUrl: '',
    preferences: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const skillsArray = formData.skills
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s);

      const { error: insertError } = await supabase.from('freelancer_profiles').insert([
        {
          user_id: user?.id,
          skills: skillsArray,
          portfolio_url: formData.portfolioUrl || null,
          credentials_url: formData.credentialsUrl || null,
          preferences: formData.preferences ? JSON.parse(formData.preferences) : {},
          status: 'onboarded',
        },
      ]);

      if (insertError) throw insertError;

      setSuccess(true);
      setTimeout(() => {
        onNavigate('dashboard');
      }, 2000);
    } catch (err) {
      setError('Failed to create profile. Please try again.');
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Profile Created!</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Your profile has been submitted for vetting. You'll receive an email notification
            once the review is complete.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Provide your skills and credentials to get vetted by our team
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Skills (comma-separated)"
              placeholder="e.g., Web Development, React, Node.js, UI/UX Design"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              required
            />

            <Input
              label="Portfolio URL (optional)"
              type="url"
              placeholder="https://your-portfolio.com"
              value={formData.portfolioUrl}
              onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
            />

            <Input
              label="Credentials URL (optional)"
              type="url"
              placeholder="Link to certificates, degrees, etc."
              value={formData.credentialsUrl}
              onChange={(e) => setFormData({ ...formData, credentialsUrl: e.target.value })}
            />

            <TextArea
              label="Preferences (optional JSON format)"
              placeholder='{"preferred_platforms": ["Upwork", "Fiverr"], "work_hours": "flexible"}'
              rows={4}
              value={formData.preferences}
              onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
            />

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <div className="flex gap-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? 'Submitting...' : 'Submit Profile'}
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
          <h3 className="font-bold text-blue-900 mb-3 text-lg">What happens next?</h3>
          <ol className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="font-bold mr-2">1.</span>
              <span>Our AI-powered engine analyzes your skills and credentials</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">2.</span>
              <span>Admin team reviews and verifies your profile</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">3.</span>
              <span>You receive email notification with the decision</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">4.</span>
              <span>If approved, you can submit review requests immediately</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
