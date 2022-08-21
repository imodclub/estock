import * as React from 'react';
import Firebase,{db} from './Service/Firebase'
import { getAuth } from 'firebase/auth'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home'
import UserManage from './Pages/UserManage'
import Material from './Pages/Material'
import Report from './Pages/Report'
import Auth from './Pages/Auth'


function App() {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  //check user local storage
  React.useEffect(() => {
    getAuth().onAuthStateChanged((authUser) => {
      setLoading(false);
      if (authUser) {
        setUser(authUser.email);
        setLoading(true);
      } else {
        setUser(null)
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <React.Fragment>
        <Navbar />
      </React.Fragment>
      <Routes>
        <Route path="/" element={<Home user={user} />} excat></Route>
        <Route path="usermanage" element={<UserManage value={{db:db, user:user}} />}></Route>
        <Route path="material" element={<Material />}></Route>
        <Route path="report" element={<Report />}></Route>
        <Route path="auth" element={<Auth user={user} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
