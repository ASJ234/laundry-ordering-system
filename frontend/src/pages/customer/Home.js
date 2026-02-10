import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      <Navbar />
      <div className="home-container">
        <div className="hero-section">
          <h1>Welcome to Laundry Service</h1>
          <p>Professional washing machine services at your convenience</p>
          {!isAuthenticated ? (
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary">Get Started</Link>
              <Link to="/login" className="btn btn-secondary">Login</Link>
            </div>
          ) : (
            <Link to="/place-order" className="btn btn-primary">Place an Order</Link>
          )}
        </div>

        <div className="features-section">
          <h2>Our Services</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🧼</div>
              <h3>Normal Wash</h3>
              <p>Standard washing for everyday clothes</p>
              <p className="price">$5 per item</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💪</div>
              <h3>Heavy Wash</h3>
              <p>Deep cleaning for heavily soiled items</p>
              <p className="price">$8 per item</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌸</div>
              <h3>Delicate Wash</h3>
              <p>Gentle care for delicate fabrics</p>
              <p className="price">$7 per item</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Express Wash</h3>
              <p>Quick turnaround service</p>
              <p className="price">$10 per item</p>
            </div>
          </div>
        </div>

        <div className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Register</h3>
              <p>Create your account</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Place Order</h3>
              <p>Select service and quantity</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Track Status</h3>
              <p>Monitor your order progress</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Collect</h3>
              <p>Pick up clean clothes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
