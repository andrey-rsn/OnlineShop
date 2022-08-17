import {ProductList} from '../../components/ProductList/ProductList'
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import '../../styles/global.css';


export const MainPage = ()=>{
    
    return(
        <div className='main-page'>
            <div class="container-xl" style={{marginBottom:'60px'}}>
                <ProductList/> 
            </div>
                <Grid container sx={{justifyContent:'center',position:'absolute',bottom:'30px'}}>
                    <Pagination count={10} color="primary" size="large"/>
                </Grid>
        </div>
    );
}