import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, NavLink } from 'react-router-dom';

const onSearch=(e)=>{
    e.preventDefault();
    console.log(e.target[0].value);
}

export const Navbar = ()=>{
    return(
        <nav class="navbar sticky-top bg-light mb-5" style={{"borderRadius":"10px"}}>
            <div class="container-fluid">
                <Link to='/'>Online-shop</Link>
                <form onSubmit={(e)=>onSearch(e)} class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Поиск" aria-label="Search"/>
                    <button class="btn btn-outline-success" type="submit">Найти</button>
                </form>
                <NavLink 
                    end 
                    style={({isActive})=>({'color': isActive ? 'red': 'blue'})} 
                    to="/cart">
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',textDecoration: 'none'}}>
                        <ShoppingCartIcon sx={{margin:'0 auto',fontSize:'35px'}}/>
                        <p style={{marginBottom:'0'}}>Корзина</p>
                    </div>
                </NavLink>
            </div>
        </nav>
    );
}