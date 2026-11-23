import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import ChatBot from './components/ChatBot'
import MobileBottomNav from './components/MobileBottomNav'
import useScrollReveal from './hooks/useScrollReveal'

import Home from './pages/Home'
import HajjUmrah from './pages/HajjUmrah'
import DomesticToursPage from './pages/DomesticTours'
import InternationalToursPage from './pages/InternationalTours'
import Visa from './pages/Visa'
import About from './pages/About'
import Contact from './pages/Contact'

import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminTours from './pages/admin/AdminTours'
import AdminHajj from './pages/admin/AdminHajj'
import AdminVisa from './pages/admin/AdminVisa'
import AdminTestimonials from './pages/admin/AdminTestimonials'
import AdminEnquiries from './pages/admin/AdminEnquiries'
import AdminChats from './pages/admin/AdminChats'
import AdminSettings from './pages/admin/AdminSettings'

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

function App() {
  return (
    <Router>
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
    </Router>
  )
}

export default App