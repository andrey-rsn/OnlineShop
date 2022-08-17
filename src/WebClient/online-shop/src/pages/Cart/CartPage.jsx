import { useEffect, useMemo, useState } from 'react';
import { Cart } from '../../components/Cart/Cart';

export const CartPage =()=>{
    const [isEmpty,setIsEmpty]=useState(false);
    
    const content=useMemo(()=>{
        return isEmpty ? <h1 style={{textAlign:'center'}}>Корзина пуста</h1> : <Cart/>;
        
    },[isEmpty]);

    return(
        <>
            {content}
        </>
    );
}