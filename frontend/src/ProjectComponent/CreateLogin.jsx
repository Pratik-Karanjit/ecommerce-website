import { Formik, Form } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react';
import FormikInput from '../Formik/FormikInput';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { setLoginInfo } from '../utils/loginInfo';

const CreateLogin = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:8000/users/login', values);
      const token = response.data.token;
      setLoginInfo({token})
      navigate('/');
    } catch (error) {
      console.log('Unable to submit:', error);
      setLoginError(true);           
    } finally {
      setSubmitting(false);          
    }
  };

  const validationSchema = yup.object({
    email: yup.string().required('Email is required. '),
    password: yup.string().required('Password is required. '),
  });

  const handleDeleteAlert = () => {
    Swal.fire({
      title: 'Login Error',
      text: 'Incorrect email or password.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  };

  return (
    <div className="form-container">
          <h1 className="form-title">Login</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {formik => (
              <Form style={{textAlign:"left"}}>
                <FormikInput
                  name="email"
                  label="Email"
                  type="email"
                  required={true}
                  className="form-input"
                />
                <FormikInput
                  name="password"
                  label="Password"
                  type="password"
                  required={true}
                  className="form-input"
                />
                <button type="submit" disabled={formik.isSubmitting} className="form-button">
                  Login
                </button>
              </Form>
            )}
          </Formik>

      {loginError && handleDeleteAlert()}
    </div>
  );
};

export default CreateLogin;


