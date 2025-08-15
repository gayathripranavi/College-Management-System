import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  
  cilNotes,
  
  cilSpeedometer,
  cilStar,
  cilUser,
  cilPeople,
  cilLibrary,
  cilPlus 
  
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Admin',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  
  {
    component: CNavTitle,
    name: 'Admin Portal',
  },
  

{
    component: CNavGroup,
    name: 'Students',
    
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Students',
        to: '/users/viewUsers',
      },
      {
        component: CNavItem,
        name: 'View Students',
        to: '/users/viewStudent',
      },
      
       
    ],
  },

{
    component: CNavGroup,
    name: 'Faculty',
    
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      
      {
        component: CNavItem,
        name: 'Add Faculty',
        to: '/users/viewFaculty',
      },
      
       {
        component: CNavItem,
        name: 'View Faculty',
        to: '/users/viewFacultySubject',
      },
      
    ],
  },


  {
    component: CNavGroup,
    name: 'Add',
    to: '/base',
    icon: <CIcon icon={cilPlus } customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Admin',
        to: '/base/addAdmin',
      },
      {
        component: CNavItem,
        name: 'View Admin',
        to: '/base/viewAdmin',
      },
      
      // {
      //   component: CNavItem,
      //   name: 'Add Faculty',
      //   to: '/base/addFaculty',
      // },
      ],
  },
  {
    component: CNavGroup,
    name: 'Courses',
    to: '/courses',
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Courses',
        to: '/courses/addCourses',
      },
      {
        component: CNavItem,
        name: 'View Courses',
        to: '/courses/viewCourses',
      },
     
    ],
  },
  
  {
    component: CNavGroup,
    name: 'Subjects',
    to: '/subjects',
    icon: <CIcon icon={cilNotes } customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Subjects',
        to: '/subjects/AddSubjects',
      },
      {
        component: CNavItem,
        name: 'View Subjects',
        to: '/subjects/viewSubjects',
      },
      
    ],
  },
 
]

export default _nav
