import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LinksProvider from '../providers/LinksProvider';

import LandingPage from '../components/templates/LandingPage/LandingPage';
import Dashboard from '../components/templates/Dashboard/Dashboard';
import AdminPanel from '../components/templates/AdminPanel/AdminPanel';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../assets/styles/GlobalStyle';
import { theme } from '../assets/styles/theme';
import { Wrapper } from './Root-styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Root = () => {
  return (
    <Router>
      <LinksProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Wrapper>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              limit={1}
            />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/user" element={<Dashboard />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </Wrapper>
        </ThemeProvider>
      </LinksProvider>
    </Router>
  );
};

export default Root;
