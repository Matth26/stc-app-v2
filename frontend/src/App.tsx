import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import NewChart from './pages/NewChart';
import ChartList from './pages/Charts';
import Chart from './pages/Chart';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <>
      <Router>
        <div className="container mx-auto">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-chart" element={<PrivateRoute />}>
              <Route path="/new-chart" element={<NewChart />} />
            </Route>
            <Route path="/charts" element={<PrivateRoute />}>
              <Route path="/charts" element={<ChartList />} />
            </Route>
            <Route path="/charts/:id" element={<PrivateRoute />}>
              <Route path="/charts/:id" element={<Chart />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
