import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoginInfo, removeLoginInfo } from '../utils/loginInfo';
import axios from 'axios';
import '../ProjectCss/createAccount.css'

const LogoutAccount = () => {
  const navigate = useNavigate();

  let logoutAdmin = async () => {
    try {
      await axios({
        url: `http://localhost:8000/users/logout?token=${getLoginInfo()?.token}`,
        method: 'delete',
      });

      removeLoginInfo();
      navigate('/login');
    } catch (error) {
      console.log('Unable to Logout');
    }
  };

  return (
    <div className="container-logout">
      <div className="box">
        <div>
          <h1>Do you want to logout?</h1>
          {getLoginInfo()?.token ? (
            <button
              onClick={() => {
                logoutAdmin();
              }}
              className="form-logout"
            >
              Yes
            </button>
          ) : null}
          <button
            onClick={(e) => {
              navigate('/');
            }}
            className="form-logout"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutAccount;
