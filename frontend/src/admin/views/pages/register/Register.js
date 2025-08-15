import React, { useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios';
const Register = () => {
  const[data,setData]=useState({name:'',email:'',password:'',role:''});
  const [role, setRole] = useState('Select Role')
    const navigate=useNavigate();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole)
    setData(prev => ({ ...prev, role: selectedRole }));
  }

  

  const handleSubmit=(e)=>{
    e.preventDefault();
    const submission = { ...data, role };
    console.log('Submitting:', submission);
    axios.post('http://localhost:5000/auth/register', submission)
    .then(response=>{
      setData(response.data)
       alert('User added successfully!');
      // navigate('/Login');
       
    })
      
    .catch((err) => {console.error("axios error",err)
    alert(err.response.data.message);
      }
      );
  };
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="name" 
                    onChange={(e)=>setData({...data,name:e.target.value})} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email" 
                    onChange={(e)=>setData({...data,email:e.target.value})}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password" onChange={(e)=>setData({...data,password:e.target.value})}
                    />
                  </CInputGroup>
                  <CDropdown className="mb-4">
        <CDropdownToggle color="secondary">{role}</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem onClick={() => handleRoleSelect('student')}>Student</CDropdownItem>
          <CDropdownItem onClick={() => handleRoleSelect('faculty')}>Faculty</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>

                  <div className="d-grid">
                    <CButton type="submit" color="success">Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register