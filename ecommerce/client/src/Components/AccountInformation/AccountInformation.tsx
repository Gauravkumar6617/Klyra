import { useState } from 'react';
import { useAppSelector } from '../../App/store';
// Define a type for the tab content to ensure type safety
interface TabContentProps {
  isActive: boolean;
  userRole?: string;

}
const user = useAppSelector(state => state.auth.user);
console.log(user)

// Account Information Component
const AccountInformation: React.FC<TabContentProps> = ({ isActive, userRole ,}) => {
  if (!isActive) return null;

  return (
    <div className="account-details-content">
      <h2 className="heading-2">Account Details</h2>
      <div className="detail-item">
        
        <span className="label">User Id:</span>
        <span className="value">{}</span>
      </div>
      <div className="detail-item">
        <span className="label">Full Name:</span>
        <span className="value">Gaurav Sharma</span>
      </div>
      <div className="detail-item">
        <span className="label">Email Address:</span>
        <span className="value">gaurav.sharma@example.com</span>
      </div>
      <div className="detail-item">
        <span className="label">Phone Number:</span>
        <span className="value">+91 98765 43210</span>
      </div>
      <div className="detail-item">
        <span className="label">Shipping Address:</span>
        <span className="value">123 Main Street, Anytown, India, 12345</span>
      </div>
      <div className="detail-item">
        <span className="label">Account Type:</span>
        <span className="value-red">{userRole }</span>
      </div>
    </div>
  );
};

// Seller Form Component
const SellerForm: React.FC<TabContentProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div>
      <h2 className="heading-2">Seller Registration</h2>
      <p className="form-description">Fill out this form to apply for a seller account. Our team will review your submission shortly.</p>
      <form className="seller-form-container">
        <div className="form-group">
          <label htmlFor="business-name" className="form-label">Business Name</label>
          <input type="text" id="business-name" name="business-name" className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="business-type" className="form-label">Type of Business</label>
          <select id="business-type" name="business-type" className="form-input">
            <option value="">-- Please select --</option>
            <option value="sole-proprietorship">Sole Proprietorship</option>
            <option value="llc">LLC</option>
            <option value="corporation">Corporation</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="business-description" className="form-label">Description of Products</label>
          <textarea id="business-description" name="business-description" rows={3} className="form-input"></textarea>
        </div>
        <div className="submit-button-container">
          <button type="submit" className="submit-button">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

// Main App Component
const AccountDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account-info');

  return (
    <>
      <style>
        {`
          body {
            font-family: 'Inter', sans-serif;
            background-color: #f7f7f7;
            color: #333;
          }
          .main-container {
            max-width: 80rem;
            margin: 2rem auto;
            background-color: #fff;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            padding: 2rem;
            display: flex;
            flex-direction: column;
          }
          @media (min-width: 768px) {
            .main-container {
              flex-direction: row;
            }
          }
          .tab-navigation {
            flex: none;
            width: 100%;
            border-bottom: 1px solid #e5e7eb;
            margin-bottom: 1.5rem;
            padding-right: 0;
          }
          @media (min-width: 768px) {
            .tab-navigation {
              width: 16rem;
              border-bottom: 0;
              border-right: 1px solid #e5e7eb;
              margin-bottom: 0;
              padding-right: 1.5rem;
            }
          }
          .main-heading {
            font-size: 1.875rem;
            line-height: 2.25rem;
            font-weight: 700;
            color: #b91c1c;
            margin-bottom: 1rem;
            text-align: center;
          }
          @media (min-width: 768px) {
            .main-heading {
              text-align: left;
            }
          }
          .tab-list {
            display: flex;
            flex-direction: row;
            column-gap: 0.5rem;
          }
          @media (min-width: 768px) {
            .tab-list {
              flex-direction: column;
              row-gap: 0.5rem;
              column-gap: 0;
            }
          }
          .tab-button {
            padding: 0.75rem 1.5rem;
            text-align: center;
            font-weight: 500;
            font-size: 0.875rem;
            line-height: 1.25rem;
            transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 200ms;
            outline: 2px solid transparent;
            outline-offset: 2px;
            border-radius: 0.375rem;
            border: 1px solid transparent;
          }
          .tab-button.active {
            background-color: #dc2626;
            color: #ffffff;
            border-color: #dc2626;
          }
          .tab-button:not(.active) {
            color: #6b7280;
          }
          .tab-button:not(.active):hover {
            color: #b91c1c;
          }
          .tab-content {
            flex: 1;
            width: 100%;
            margin-top: 1.5rem;
            padding-left: 0;
          }
          @media (min-width: 768px) {
            .tab-content {
              margin-top: 0;
              padding-left: 1.5rem;
            }
          }
          .heading-2 {
            font-size: 1.25rem;
            line-height: 1.75rem;
            font-weight: 600;
            color: #b91c1c;
            margin-bottom: 1rem;
          }
          .account-details-content {
            display: flex;
            flex-direction: column;
            row-gap: 1rem;
            color: #4b5563;
          }
          .detail-item {
            display: flex;
            flex-direction: column;
          }
          @media (min-width: 640px) {
            .detail-item {
              flex-direction: row;
            }
          }
          .label {
            font-weight: 500;
            color: #6b7280;
            width: 100%;
          }
          @media (min-width: 640px) {
            .label {
              width: 33.333333%;
            }
          }
          .value {
            width: 100%;
          }
          @media (min-width: 640px) {
            .value {
              width: 66.666667%;
            }
          }
          .value-red {
            width: 100%;
            color: #b91c1c;
            font-weight: 700;
          }
          @media (min-width: 640px) {
            .value-red {
              width: 66.666667%;
            }
          }
          .form-description {
            color: #4b5563;
            margin-bottom: 1.5rem;
          }
          .seller-form-container {
            display: flex;
            flex-direction: column;
            row-gap: 1.5rem;
          }
          .form-group {
            display: flex;
            flex-direction: column;
          }
          .form-label {
            display: block;
            font-size: 0.875rem;
            line-height: 1.25rem;
            font-weight: 500;
            color: #4b5563;
          }
          .form-input {
            margin-top: 0.25rem;
            display: block;
            width: 100%;
            padding: 0.5rem 1rem;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            color: #6b7280;
            font-size: 0.875rem;
            line-height: 1.25rem;
          }
          .form-input:focus {
            outline: 2px solid transparent;
            outline-offset: 2px;
            box-shadow: 0 0 0 1px #ef4444;
            border-color: #ef4444;
          }
          .submit-button-container {
            padding-top: 1rem;
          }
          .submit-button {
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 0.5rem 1rem;
            border: 1px solid transparent;
            border-radius: 0.375rem;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            font-size: 0.875rem;
            line-height: 1.25rem;
            font-weight: 500;
            color: #ffffff;
            background-color: #dc2626;
            transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 200ms;
          }
          .submit-button:hover {
            background-color: #b91c1c;
          }
        `}
      </style>
      <div className="main-container">
        {/* Vertical Tab Navigation */}
        <div className="tab-navigation">
          <h1 className="main-heading">My Account</h1>
          <div className="tab-list">
            <button
              onClick={() => setActiveTab('account-info')}
              className={`tab-button ${activeTab === 'account-info' ? 'active' : ''}`}
            >
              Account Information
            </button>
            <button
              onClick={() => setActiveTab('seller-form')}
              className={`tab-button ${activeTab === 'seller-form' ? 'active' : ''}`}
            >
              Become a Seller
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="tab-content">
          <AccountInformation isActive={activeTab === 'account-info'} userRole="Customer" />
          <SellerForm isActive={activeTab === 'seller-form'} />
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
