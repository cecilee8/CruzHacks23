import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import NotFound from './NotFound';

const AuthenticatedRoute = ({children}) => {
  if (localStorage.getItem('user')) {
    return children;
  }
  console.log('not authenticated');
  return <Navigate to="/login" replace />;
};

function App() {
  return (
    <Home/>
    // <Routes>
    //     <Route path="/"
    //       element={
    //         // <AuthenticatedRoute>
    //         <NotFound/>
    //           // <Home />
    //         // </AuthenticatedRoute>
    //       } />
    //     <Route path="/login" exact element={<Login />} />
    //     {/* <Route
    //       path='*'
    //       element={
    //         <AuthenticatedRoute>
    //           <NotFound />
    //         </AuthenticatedRoute>
    //       }
    //     /> */}
    //   </Routes>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
