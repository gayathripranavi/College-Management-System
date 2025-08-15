import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CButton, CCard, CCardBody, CCardGroup, CCol, CContainer,
  CForm, CFormInput, CInputGroup, CInputGroupText, CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilUser, cilLockLocked } from '@coreui/icons';
import axios from 'axios';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/auth/login', data);
      if (response.status === 200) {
       const { role } = response.data;
       console.log(response.data)

      // Redirect based on role
      if (role === 'admin') navigate('/admin');
      else if (role === 'faculty') navigate('/faculty');
      else navigate('/student');
      }
    } catch (err) {
      console.error('Login error:', err);
      const msg = err.response?.data?.error || 'Login failed';
      setErrorMessage(msg);
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign in to your account</p>
                    {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText><CIcon icon={cilUser} /></CInputGroupText>
                      <CFormInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={data.email}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText><CIcon icon={cilLockLocked} /></CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={data.password}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-end">
                        <Link to="/forgot-password">
                          <CButton color="link" className="px-0">Forgot password?</CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Create an account to get started.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3">Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
