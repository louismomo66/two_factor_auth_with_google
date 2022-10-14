import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Register, Error,ProtectedRoute,Login } from "./pages";
import {
  Home,
  Profile,
  Labs,
  Reports,
  SharedLayout,
  Schedules,
  Tests,
} from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index path='home' element={<Home />} />
          <Route path='profile' element={<Profile />} />
          <Route path='labs' element={<Labs />} />
          <Route path='reports' element={<Reports />} />
          <Route path='tests' element={<Tests />} />
          <Route path='schedules' element={<Schedules />} />
        </Route>

        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
