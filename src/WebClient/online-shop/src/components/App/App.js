import { Navbar } from '../Navbar/Navbar';
import '../../styles/App.css';
import {ProductList} from '../ProductList/ProductList'
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';

function App() {
  return (
    <>
        <Navbar/>
      <div class="container-xxl" style={{marginBottom:'60px'}}>
        <ProductList/> 
      </div>
        <Grid container justifyContent="center" className='fixed-bottom mb-2'>
           <Pagination count={10} color="primary" size="large"/>
        </Grid>
    </>
      
  );
}

export default App;
