import './App.css';
import Header from './components/Header/Header';
import Services from './components/Services/Services';
import About from './components/About/About';
import Qualities from './components/Qualities/Qualities';
import Features from './components/Features/Features';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import SignIn from './components/Signin/Signin';
import ForgotPassword from './components/Forgotpassword/Forgotpassword';
import VerifyEmail from './components/Verifyemail/Verifyemail';
import Signup from './components/Signup/Signup';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Services />
            <About />
            <Qualities />
            <Features />
            <Testimonials />
            <Contact />
            <Footer />
          </>
        } />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/Forgot-password" element={<ForgotPassword />} />
        <Route path="/Verifyemail" element={<VerifyEmail />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;

