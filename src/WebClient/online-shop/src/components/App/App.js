import { Navbar } from '../Navbar/Navbar';
import '../../styles/App.css';
import {MainPage} from '../../pages/MainPage/MainPage'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { CartPage } from '../../pages/Cart/CartPage';
import { FooterInfo } from '../FooterInfo/FooterInfo';

function App() {
  return (
    <Router>
      <div className='app background_grey'>
        <Navbar/>
        <main className='mb-5'>
          <Routes>
            <Route path="/" element={<MainPage/>}>
            </Route>
            <Route path="/cart" element={<CartPage/>}>
            </Route>
          </Routes>
        </main>
        <FooterInfo/>
      </div>
    </Router>
  );
}

export default App;
