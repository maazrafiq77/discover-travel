import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import ChatBot from './components/ChatBot'
import MobileBottomNav from './components/MobileBottomNav'
import useScrollReveal from './hooks/useScrollReveal'

// Lazy load all pages for faster initial load
const Home = lazy(() => import('./pages/Home'))
const HajjUmrah = lazy(() => import('./pages/HajjUmrah'))
const DomesticToursPage = lazy(() => import('./pages/DomesticTours'))
const InternationalToursPage = lazy(() => import('./pages/InternationalTours'))
const Visa = lazy(() => import('./pages/Visa'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminTours = lazy(() => import('./pages/admin/AdminTours'))
const AdminHajj = lazy(() => import('./pages/admin/AdminHajj'))
const AdminVisa = lazy(() => import('./pages/admin/AdminVisa'))
const AdminTestimonials = lazy(() => import('./pages/admin/AdminTestimonials'))
const AdminEnquiries = lazy(() => import('./pages/admin/AdminEnquiries'))
const AdminChats = lazy(() => import('./pages/admin/AdminChats'))
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'))

function PublicLayout({ children }) {
  useScrollReveal()
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <WhatsAppFloat />
      <ChatBot />
      <Footer />
      <MobileBottomNav />
    </>
  )
}

// Loading fallback while the page downloads
const LoadingScreen = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--bg)' }}>
    <div className="skeleton" style={{ width: 40, height: 40, borderRadius: '50%' }} />
  </div>
)

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="tours" element={<AdminTours />} />
            <Route path="hajj" element={<AdminHajj />} />
            <Route path="visa" element={<AdminVisa />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="chats" element={<AdminChats />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          <Route
            path="/*"
            element={
              <PublicLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/hajj-umrah" element={<HajjUmrah />} />
                  <Route path="/domestic" element={<DomesticToursPage />} />
                  <Route path="/international" element={<InternationalToursPage />} />
                  <Route path="/visa" element={<Visa />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </PublicLayout>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App