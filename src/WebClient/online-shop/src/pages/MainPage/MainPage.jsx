import {ProductList} from '../../components/ProductList/ProductList'
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';



export const MainPage = ()=>{
    
    return(
        <>
        <div class="container-xxl" style={{marginBottom:'60px'}}>
            <ProductList/> 
        </div>
        <footer>
            <Grid container justifyContent="center" className='mb-2'>
                <Pagination count={10} color="primary" size="large"/>
            </Grid>
        </footer>
        </>
    );
}