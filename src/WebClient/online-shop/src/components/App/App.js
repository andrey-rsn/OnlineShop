import { Navbar } from '../Navbar/Navbar';
import '../../styles/App.css';
import {MainPage} from '../../pages/MainPage/MainPage'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { CartPage } from '../../pages/Cart/CartPage';
import { FooterInfo } from '../FooterInfo/FooterInfo';

function App() {
  return (
    <div className='background background_grey position-relative'>
    <Router>
      <div className='app '>
        <Navbar/>
        <main>
          <Routes>
            <Route path="/" element={<MainPage/>}>
            </Route>
            <Route path="/cart" element={<CartPage/>}>
            </Route>
          </Routes>
        </main>
      </div>
      <FooterInfo/>
    </Router>
    </div>
    
  );
}

export default App;
