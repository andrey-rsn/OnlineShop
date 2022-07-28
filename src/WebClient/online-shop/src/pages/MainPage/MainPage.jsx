import {ProductList} from '../../components/ProductList/ProductList'
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';


export const MainPage = ()=>{
    
    return(
        <div className='main-page'>
            <div class="container-xxl" style={{marginBottom:'60px'}}>
                <ProductList/> 
            </div>
                <Grid container justifyContent="center" >
                    <Pagination count={10} color="primary" size="large"/>
                </Grid>
        </div>
    );
}