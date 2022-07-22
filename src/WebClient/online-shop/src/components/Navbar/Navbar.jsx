import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, NavLink } from 'react-router-dom';

const onSearch=(e)=>{
    e.preventDefault();
    console.log(e.target[0].value);
}

export const Navbar = ()=>{
    return(
        <nav class="navbar sticky-top bg-light mb-5">
            <div class="container-fluid">
                <Link to='/' className='text-decoration-none'>Online-shop</Link>
                <form onSubmit={(e)=>onSearch(e)} class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Поиск" aria-label="Search"/>
                    <button class="btn btn-outline-success" type="submit">Найти</button>
                </form>
                <Link to="/cart" style={{textDecoration:'none', color:'black'}}>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                        <ShoppingCartIcon sx={{margin:'0 auto',fontSize:'35px',textDecoration:'none'}} />
                        <p style={{marginBottom:'0'}} >Корзина</p>
                    </div>
                </Link>
            </div>
        </nav>
    );
}