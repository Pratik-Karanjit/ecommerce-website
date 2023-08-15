import React from 'react';
import '../ProjectCss/createAccount.css';

const RegistrationSuccessPage = () => {
  return (
    <div className="registration-success-container">
      <h1 className="registration-success-title">Registration Successful!</h1>
      <p className="registration-success-message">Please check your email for verification.</p>
    </div>
  );
};

export default RegistrationSuccessPage;
