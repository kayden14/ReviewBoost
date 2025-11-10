import { useEffect, useState } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, FileText, DollarSign } from 'lucide-react';
import { supabase, FreelancerProfile, ReviewRequest } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';

interface FreelancerDashboardProps {
  onNavigate: (page: string) => void;
}

export default function FreelancerDashboard({ onNavigate }: FreelancerDashboardProps) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<FreelancerProfile | null>(null);
  const [reviewRequests, setReviewRequests] = useState<ReviewRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      const { data: profileData } = await supabase
        .from('freelancer_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);

        const { data: requestsData } = await supabase
          .from('review_requests')
          .select('*')
          .eq('freelancer_id', profileData.id)
          .order('created_at', { ascending: false });

        setReviewRequests(requestsData || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'onboarded':
        return <Clock className="text-blue-500" size={24} />;
      case 'matched':
        return <CheckCircle className="text-emerald-500" size={24} />;
      case 'reviewed':
        return <CheckCircle className="text-teal-500" size={24} />;
      case 'rejected':
        return <XCircle className="text-red-500" size={24} />;
      default:
        return <AlertCircle className="text-gray-500" size={24} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'onboarded':
        return 'Profile Under Review';
      case 'matched':
        return 'Approved - Ready for Review Request';
      case 'reviewed':
        return 'Reviews Issued';
      case 'rejected':
        return 'Profile Needs Improvement';
      default:
        return status;
    }
  };

  const getRequestStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      approved: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300',
      completed: 'bg-teal-100 text-teal-800 border-teal-300',
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
            <AlertCircle className="mx-auto mb-6 text-amber-500" size={64} />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Your Freelancer Profile
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              You haven't set up your freelancer profile yet. Complete your profile to get vetted
              and start receiving review requests.
            </p>
            <Button onClick={() => onNavigate('profile-setup')} size="lg">
              Complete Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Freelancer Dashboard</h1>
          <p className="text-gray-600 text-lg">Track your vetting status and review requests</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Profile Status</h3>
              {getStatusIcon(profile.status)}
            </div>
            <p className="text-2xl font-bold text-teal-600 mb-2">
              {getStatusText(profile.status)}
            </p>
            <p className="text-sm text-gray-600">
              {profile.status === 'onboarded' && 'Our team is reviewing your credentials'}
              {profile.status === 'matched' && 'You can now request reviews'}
              {profile.status === 'reviewed' && 'Your reviews have been issued'}
              {profile.status === 'rejected' && 'Check recommendations below'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Review Requests</h3>
              <FileText className="text-emerald-500" size={24} />
            </div>
            <p className="text-2xl font-bold text-emerald-600 mb-2">{reviewRequests.length}</p>
            <p className="text-sm text-gray-600">Total requests submitted</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Completed Reviews</h3>
              <CheckCircle className="text-teal-500" size={24} />
            </div>
            <p className="text-2xl font-bold text-teal-600 mb-2">
              {reviewRequests.filter((r) => r.status === 'completed').length}
            </p>
            <p className="text-sm text-gray-600">Reviews successfully issued</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Profile Details</h2>
            {profile.status === 'matched' && (
              <Button onClick={() => onNavigate('review-request')} size="md">
                Request Review
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">Skills</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Portfolio</label>
              <p className="mt-2 text-gray-900">
                {profile.portfolio_url ? (
                  <a
                    href={profile.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 underline"
                  >
                    View Portfolio
                  </a>
                ) : (
                  'Not provided'
                )}
              </p>
            </div>

            {profile.vetting_notes && (
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600">Admin Notes</label>
                <div className="mt-2 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-gray-700">{profile.vetting_notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Requests History</h2>

          {reviewRequests.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto mb-4 text-gray-400" size={64} />
              <p className="text-gray-600 text-lg mb-4">No review requests yet</p>
              {profile.status === 'matched' && (
                <Button onClick={() => onNavigate('review-request')}>
                  Submit Your First Request
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {reviewRequests.map((request) => (
                <div
                  key={request.id}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <div className="flex items-center gap-3 mb-2 sm:mb-0">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getRequestStatusBadge(
                          request.status
                        )}`}
                      >
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(request.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                      <DollarSign size={20} />
                      <span>${request.payment_amount}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3 leading-relaxed">
                    {request.review_description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {request.platforms.map((platform, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>

                  {request.admin_notes && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm font-medium text-gray-600 mb-1">Admin Feedback:</p>
                      <p className="text-gray-700">{request.admin_notes}</p>
                    </div>
                  )}

                  {request.completed_at && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-teal-600">
                      <CheckCircle size={16} />
                      <span>
                        Completed on {new Date(request.completed_at).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
