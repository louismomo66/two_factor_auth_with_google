import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Register, Error } from "./pages";
import {
  Home,
  Account,
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
        <Route path='/dashboard' element={<SharedLayout />}>
          <Route index path='home' element={<Home />} />
          <Route path='account' element={<Account />} />
          <Route path='labs' element={<Labs />} />
          <Route path='reports' element={<Reports />} />
          <Route path='tests' element={<Tests />} />
          <Route path='schedules' element={<Schedules />} />
        </Route>

        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
