import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
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
  // {
  //   component: CNavTitle,
  //   name: 'Theme',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  {
    component: CNavTitle,
    name: 'Admin Portal',
  },
  {
    component: CNavGroup,
    name: 'Add',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Admin',
        to: '/base/addAdmin',
      },
      {
        component: CNavItem,
        name: 'Add Student',
        to: '/base/addStudent',
      },
      
      {
        component: CNavItem,
        name: 'Add Faculty',
        to: '/base/addFaculty',
      },
      ],
  },
  {
    component: CNavGroup,
    name: 'Courses',
    to: '/courses',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
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
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Subjects',
        to: '/icons/coreui-icons',
      },
      {
        component: CNavItem,
        name: 'View Subjects',
        to: '/icons/flags',
      },
      
    ],
  },
  
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      
    ],
  },
  
]

export default _nav
