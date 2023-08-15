import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../ProjectCss/verifyEmailPage.css'
const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('');   

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);     
    const token = urlParams.get('token');                             
    if (token) {                                                       
      verifyEmail(token);     
    } else {
      setVerificationStatus('Invalid verification token.');            
    }
  }, []);                                                              

  const verifyEmail = async (token) => {                                
    try {
      const response = await axios.post('http://localhost:8000/users/verify-email', { isVerify: true }, {   
        params: {
          token: token,
        },
      });

      const { data } = response;     
      if (data.success && !data.isVerify) {           
        setVerificationStatus('Email verification successful!');
      } else {
        setVerificationStatus(`Email verification failed: ${data.message}`);
      }
    } catch (error) {             
      console.error(error);
      setVerificationStatus('An error occurred during email verification. Error: ' + error.message);
    }
  };

  return (
    <div className="verify-email-container">
      <h1 className="verify-email-title">Email Verification Page</h1>
      <p className="verify-email-status">{verificationStatus}</p>
      <button onClick={() => navigate('/login')} className="verify-email-button">
        Login
      </button>
    </div>
  );
};

export default VerifyEmailPage;