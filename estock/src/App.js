import * as React from 'react';
import Firebase,{db} from './Service/Firebase'
import { getAuth } from 'firebase/auth'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home'
import UserManage from './Pages/UserManage'
import Business from './Pages/Business'
import Report from './Pages/Report'
import Settings from './Pages/Settings';
import Auth from './Pages/Auth'
import Signin from './Components/Signin';
import Material from './Pages/Material';


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
        <Route
          path="usermanage"
          element={<UserManage value={{ db: db, user: user }} />}
        ></Route>
        <Route
          path="business"
          element={<Business value={{ db: db, user: user }} />}
        ></Route>
        <Route
          path="material"
          element={<Material value={{ db: db, user: user }} />}
        ></Route>
        <Route path="report" element={<Report />}></Route>
        <Route
          path="settings"
          element={<Settings value={{ db: db, user: user }} />}
        ></Route>
        <Route path="auth" element={<Auth user={user} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
