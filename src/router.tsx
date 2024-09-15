import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/layouts';
import { CreateProjectView, DashboardView, EditProjectView } from '@/views';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<DashboardView />} index />
          <Route path='/projects/create' element={<CreateProjectView />} />
          <Route path='/projects/:projectId/edit' element={<EditProjectView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
