import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import ChatOverlay from './components/ChatOverlay';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FreelancersPage from './pages/FreelancersPage';
import FreelancerDashboard from './pages/FreelancerDashboard';
import ProfileSetup from './pages/ProfileSetup';
import ReviewRequestPage from './pages/ReviewRequestPage';
import AdminDashboard from './pages/AdminDashboard';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'freelancers':
        return <FreelancersPage onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <FreelancerDashboard onNavigate={setCurrentPage} />;
      case 'profile-setup':
        return <ProfileSetup onNavigate={setCurrentPage} />;
      case 'review-request':
        return <ReviewRequestPage onNavigate={setCurrentPage} />;
      case 'admin':
        return <AdminDashboard />;
      case 'about':
        return <AboutPage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'signup':
        return <SignupPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <ChatOverlay />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
