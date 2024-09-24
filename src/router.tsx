import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout, AuthLayout } from '@/layouts';
import {
  CreateProjectView,
  DashboardView,
  EditProjectView,
  LoginView,
  ProjectDetailsView,
} from '@/views';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<DashboardView />} index />
          <Route path='/projects/create' element={<CreateProjectView />} />
          <Route path='/projects/:projectId' element={<ProjectDetailsView />} />
          <Route path='/projects/:projectId/edit' element={<EditProjectView />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path='/auth/login' element={<LoginView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
