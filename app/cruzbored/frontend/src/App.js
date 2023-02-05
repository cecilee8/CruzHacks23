import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import NotFound from './NotFound';
import Cookies from 'js-cookie';


const session = Cookies.get("userId");
console.log(session);
// const AuthenticatedRoute = ({children}) => {
//   if (
//     Cookies.get("userId")
//   ) {
//     return children;
//   }
//   console.log('not authenticated');
//   return <Navigate to="/login" replace />;
// };

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/login" exact element={<Login />} />
      <Route path="/" exact element={<Home />} /> 
        {/* <Route path="/"
            element={
              <AuthenticatedRoute>
                <NotFound/>
                <Home />
              </AuthenticatedRoute>} />
          <Route
            path='*'
            element={
              <AuthenticatedRoute>
                <NotFound />
              </AuthenticatedRoute>
            }
          />  */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
