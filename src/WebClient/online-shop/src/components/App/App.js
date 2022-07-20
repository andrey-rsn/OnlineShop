import { Navbar } from '../Navbar/Navbar';
import '../../styles/App.css';
import {MainPage} from '../../pages/MainPage/MainPage'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { CartPage } from '../../pages/Cart/CartPage';
function App() {
  return (
    <Router>
      <div className='app'>
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
    </Router>
  );
}

export default App;
