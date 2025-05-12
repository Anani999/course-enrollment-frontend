import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicPage from './pages/PublicPage';
import Home from './pages/Home';
import Join from './pages/Join';
import PublicRoute from './Routes/PublicRoute';
import PrivateRoute from './Routes/PrivateRoute';
import ErrorMessage from './components/ErroMessage';
import LoadingPage from './components/loading-page';
import Main from './pages/Main';
import CourseInfo from './pages/Course/CourseInfo';
import AdminRoute from './Routes/AdminRoute';
import Dashboard from './pages/Admin/Dashboard';


function App() {
  return (
    <div className="App">
      <LoadingPage/>
      <ErrorMessage/>
      <Router>
        <Routes>
          <Route index element={
            <PublicRoute>
              <PublicPage/>
            </PublicRoute>
          } />
          <Route path='/home/*' element={
            <PrivateRoute>
              <Main/>
           </PrivateRoute>
            }/>
          <Route path='/join' element={
            <PublicRoute>
              <Join/>
            </PublicRoute>
            }/>
          <Route path='/admin/*' element={
            <AdminRoute>
              <PrivateRoute>
              <Dashboard/>
              </PrivateRoute>
            </AdminRoute>
          }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
