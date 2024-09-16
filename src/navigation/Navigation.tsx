import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RequiredAuthLayout from '@src/layouts/RequiredAuthLayout/RequiredAuthLayout';
import DashboardPage from '@modules/dashboard/pages/DashboardPage/DashboardPage';
import MembersPage from '@modules/members/pages/MembersPage/MembersPage';
import OwnerLayout from '@src/layouts/OwnerLayout/OwnerLayout';
import ApplicationsPage from '@modules/applications/pages/ApplicationsPage/ApplicationsPage';
import AuthLayout from '@src/layouts/AuthLayout/AuthLayout';
import LoginPage from '@modules/auth/pages/LoginPage/LoginPage';
import RegisterPage from '@modules/auth/pages/RegisterPage/RegisterPage';
import { AppRoutes } from '@shared/constants/routes';
import AllGroupsPage from '@modules/groups/pages/AllGroupsPage/AllGroupsPage';
import GroupPage from '@modules/groups/pages/GroupPage/GroupPage';
import AdminLayout from '@src/layouts/AdminLayout/AdminLayout';
import CourseBuilderPage from '@modules/courses/pages/CourseBuilderPage/CourseBuilderPage';

const Navigation: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<RequiredAuthLayout/>}>
        <Route path='/' element={<DashboardPage/>} />
        <Route path={AppRoutes.Members} element={<MembersPage/>} />
        
        <Route path='/' element={<OwnerLayout/>}>
          <Route path={AppRoutes.Applications} element={<ApplicationsPage/>}/>
          <Route path={AppRoutes.AllGroups} element={<AllGroupsPage/>}/>
          <Route path={`${AppRoutes.AllGroups}/:groupId`} element={<GroupPage/>}/>
        </Route>
        
        <Route path='/' element={<AdminLayout/>}>
          <Route path={AppRoutes.MyCourses} element={<CourseBuilderPage/>}/>
        </Route>
      </Route>
      
      <Route path='/' element={<AuthLayout/>}>
        <Route path={AppRoutes.Login} element={<LoginPage/>}/>
        <Route path={AppRoutes.Register} element={<RegisterPage/>}/>
      </Route>
    </Routes>
  );
};

export default Navigation;
