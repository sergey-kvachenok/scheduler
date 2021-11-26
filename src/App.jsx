import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Layout from './components/Layout';
import Slots from './components/Slots';
import Basket from './components/Basket';

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Menu />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Slots />} />
            <Route isExact path="/basket" element={<Basket />} />
          </Routes>
        </div>
      </Layout>
    </Router>
  );
}

export default App;
