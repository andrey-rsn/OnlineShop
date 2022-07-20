import './Cart.css';
import './CartElement.css';

export const Cart = ()=>{

    return (
        <div className='container'>
            <h1 className='cart-text'>Корзина</h1>
            <div className='element-container'>
                <div className='element-container__header'>
                    <div className='header__checking'>
                        <input type="checkbox" value="" />
                        <p>Выбрать все товары</p>
                    </div>
                    <div className='header__checking'>
                        <p>Удалить выбранные</p>
                    </div>
                    <hr />
                </div>
                <hr />
                <CartElement/>
            </div>
        </div>
        
    );
}

const CartElement = ()=>{

    return(
        <div className='cart-element'>
            <div className='cart-element__img'>
                <input type="checkbox" value="" />
                <img src='https://cdn1.ozone.ru/s3/multimedia-5/wc1200/6196168073.jpg' alt=""/>
            </div>
            <div className='cart-element__description'>
                <p>Хорошая продукция нормальное продукция</p>
                <p>цвет</p>
                <p>производитель</p>
                <p>Удалить</p>
            </div>
            <div className='cart-element__pricing'>
                <p>500 p</p>
            </div>
            <div className='cart-element__quantity'>
                <p>вып список</p>
            </div>
        </div>
    );
}

const AcceptCart = ()=>{

    return (
        <div>

        </div>
    );
}