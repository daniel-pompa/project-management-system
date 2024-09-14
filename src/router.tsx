import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/layouts';
import { DashboardView, NewProjectView } from '@/views';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<DashboardView />} index />
          <Route path='/projects/create' element={<NewProjectView />} index />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
