import Logo from './components/Logo/Logo'
import Login from './components/Login/Login'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Users from './components/Users/Users';
import Clients from './components/Clients/Clients';
import Profile from './components/Profile/Profile';
import Projects from './components/Projects/Projects';
import Tasks1 from './components/Tasks/Tasks1';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Logo />
        <Routes>
          <Route>
            <Route path='/users' element={<><Navbar/><Users /></>} />
            <Route path='/clients' element={<><Navbar/><Clients /></>} />
            <Route path='/projects' element={<><Navbar/><Projects /></>} />
            <Route path='/profile' element={<><Navbar/><Profile /></>} />
            <Route path='/tasks' element={<><Navbar/><Tasks1 /></>} />
            <Route path='/' element={<><Login /></>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;