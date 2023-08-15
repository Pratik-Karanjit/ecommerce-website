import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../ProjectCss/createAccount.css'; 

const CreateProductForm = () => {
  let navigate = useNavigate();

  const initialValues = {
    title: '',
    price: '',
    description: '',
    quantity: '',
  };

  const onSubmit = async (info) => {
    try {
      const result = await axios({
        url: 'http://localhost:8000/users/products/create',
        method: 'post',
        data: info,
      });

      console.log('Product created successfully');
      navigate('/admin');
    } catch (error) {
      console.log('Unable to create product:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create a New Product</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <div className="form-element-spacing">
            <label>Title:</label>
            <Field type="text" name="title" className="form-input" />
          </div>

          <div className="form-element-spacing">
            <label>Price:</label>
            <Field type="number" name="price" className="form-input" />
          </div>

          <div className="form-element-spacing">
            <label>Description:</label>
            <Field as="textarea" name="description" className="form-input" />
          </div>

          <div className="form-element-spacing">
            <label>Quantity:</label>
            <Field type="number" name="quantity" className="form-input" />
          </div>

          <ErrorMessage name="title" component="div" className="error-message" />
          <ErrorMessage name="price" component="div" className="error-message" />
          <ErrorMessage name="description" component="div" className="error-message" />
          <ErrorMessage name="quantity" component="div" className="error-message" />
          <button type="submit" className="form-button">
            Create Product
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateProductForm;
