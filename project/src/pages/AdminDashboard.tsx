import { useEffect, useState } from 'react';
import { Users, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { supabase, FreelancerProfile, ReviewRequest } from '../lib/supabase';
import Button from '../components/Button';
import TextArea from '../components/TextArea';
import Select from '../components/Select';

export default function AdminDashboard() {
  const [freelancers, setFreelancers] = useState<(FreelancerProfile & { email: string })[]>([]);
  const [reviewRequests, setReviewRequests] = useState<ReviewRequest[]>([]);
  const [selectedTab, setSelectedTab] = useState<'freelancers' | 'requests'>('freelancers');
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [editStatus, setEditStatus] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: freelancerData } = await supabase
        .from('freelancer_profiles')
        .select('*, profiles(email)')
        .order('created_at', { ascending: false });

      const { data: requestData } = await supabase
        .from('review_requests')
        .select('*')
        .order('created_at', { ascending: false });

      const freelancersWithEmail = (freelancerData || []).map((f: any) => ({
        ...f,
        email: f.profiles?.email || 'N/A',
      }));

      setFreelancers(freelancersWithEmail);
      setReviewRequests(requestData || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFreelancerStatus = async (id: string, status: string, notes: string) => {
    try {
      const { error } = await supabase
        .from('freelancer_profiles')
        .update({ status, vetting_notes: notes })
        .eq('id', id);

      if (error) throw error;

      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error('Error updating freelancer:', error);
    }
  };

  const updateReviewRequest = async (id: string, status: string, notes: string) => {
    try {
      const updateData: any = { status, admin_notes: notes };
      if (status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('review_requests')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error('Error updating review request:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      onboarded: 'bg-blue-100 text-blue-800',
      matched: 'bg-green-100 text-green-800',
      reviewed: 'bg-teal-100 text-teal-800',
      rejected: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      completed: 'bg-teal-100 text-teal-800',
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading admin dashboard...</div>
      </div>
    );
  }

  const stats = {
    totalFreelancers: freelancers.length,
    pendingReview: freelancers.filter((f) => f.status === 'onboarded').length,
    activeRequests: reviewRequests.filter((r) => r.status === 'pending').length,
    completedReviews: reviewRequests.filter((r) => r.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Freelancers</h3>
              <Users className="text-teal-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalFreelancers}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Pending Review</h3>
              <Clock className="text-blue-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.pendingReview}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Active Requests</h3>
              <FileText className="text-yellow-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.activeRequests}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Completed</h3>
              <CheckCircle className="text-emerald-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.completedReviews}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setSelectedTab('freelancers')}
              className={`px-6 py-3 font-semibold transition-colors ${
                selectedTab === 'freelancers'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Freelancer Profiles ({freelancers.length})
            </button>
            <button
              onClick={() => setSelectedTab('requests')}
              className={`px-6 py-3 font-semibold transition-colors ${
                selectedTab === 'requests'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Review Requests ({reviewRequests.length})
            </button>
          </div>

          {selectedTab === 'freelancers' ? (
            <div className="space-y-4">
              {freelancers.map((freelancer) => (
                <div
                  key={freelancer.id}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                            freelancer.status
                          )}`}
                        >
                          {freelancer.status.charAt(0).toUpperCase() + freelancer.status.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(freelancer.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">Email: {freelancer.email}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {freelancer.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      {freelancer.portfolio_url && (
                        <a
                          href={freelancer.portfolio_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:text-teal-700 text-sm underline"
                        >
                          View Portfolio
                        </a>
                      )}
                    </div>
                  </div>

                  {editingId === freelancer.id ? (
                    <div className="space-y-4 mt-4 bg-gray-50 p-4 rounded-lg">
                      <Select
                        label="Status"
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                      >
                        <option value="onboarded">Onboarded</option>
                        <option value="matched">Matched</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="rejected">Rejected</option>
                      </Select>
                      <TextArea
                        label="Vetting Notes"
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() =>
                            updateFreelancerStatus(freelancer.id, editStatus, editNotes)
                          }
                          size="sm"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => setEditingId(null)}
                          variant="outline"
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {freelancer.vetting_notes && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-600 mb-1">Notes:</p>
                          <p className="text-gray-700">{freelancer.vetting_notes}</p>
                        </div>
                      )}
                      <div className="mt-4">
                        <Button
                          onClick={() => {
                            setEditingId(freelancer.id);
                            setEditStatus(freelancer.status);
                            setEditNotes(freelancer.vetting_notes || '');
                          }}
                          size="sm"
                          variant="outline"
                        >
                          Update Status
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {reviewRequests.map((request) => (
                <div
                  key={request.id}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                            request.status
                          )}`}
                        >
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(request.created_at).toLocaleDateString()}
                        </span>
                        <span className="text-sm font-semibold text-emerald-600">
                          ${request.payment_amount}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{request.review_description}</p>
                      <div className="flex flex-wrap gap-2">
                        {request.platforms.map((platform, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                      {request.additional_info && (
                        <p className="mt-3 text-sm text-gray-600">
                          <strong>Additional:</strong> {request.additional_info}
                        </p>
                      )}
                    </div>
                  </div>

                  {editingId === request.id ? (
                    <div className="space-y-4 mt-4 bg-gray-50 p-4 rounded-lg">
                      <Select
                        label="Status"
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="completed">Completed</option>
                      </Select>
                      <TextArea
                        label="Admin Notes"
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => updateReviewRequest(request.id, editStatus, editNotes)}
                          size="sm"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => setEditingId(null)}
                          variant="outline"
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {request.admin_notes && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-600 mb-1">Admin Notes:</p>
                          <p className="text-gray-700">{request.admin_notes}</p>
                        </div>
                      )}
                      <div className="mt-4">
                        <Button
                          onClick={() => {
                            setEditingId(request.id);
                            setEditStatus(request.status);
                            setEditNotes(request.admin_notes || '');
                          }}
                          size="sm"
                          variant="outline"
                        >
                          Update Status
                        </Button>
                      </div>
                    </>
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
