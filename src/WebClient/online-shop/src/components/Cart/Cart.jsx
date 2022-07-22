import './Cart.css';
import './CartElement.css';
import './AcceptCart.css';
import '../../styles/global.css'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useMemo,useEffect,useState } from 'react';

export const Cart = ()=>{

    const [cartElements, setCartElements] = useState([]);

    const getCartElements=()=>{
        return [
            {
                isChecked: true,
                image:'https://cdn1.ozone.ru/s3/multimedia-m/wc1200/6281544898.jpg',
                description:{
                    mainInfo:'мышка игровая хорошая',
                    secondaryInfo:'цвет зеленый, 90гр',
                    company:'Defender'
                },
                price:1000,
                quantity:1
            },
            {
                isChecked: true,
                image:'https://cdn1.ozone.ru/s3/multimedia-5/wc1200/6196168073.jpg',
                description:{
                    mainInfo:'клавиатура игровая хорошая мембранная',
                    secondaryInfo:'цвет черный, 120гр',
                    company:'Defender'
                },
                price:1500,
                quantity:1
            },
            {
                isChecked: true,
                image:'https://cdn1.ozone.ru/s3/multimedia-5/wc1200/6196168073.jpg',
                description:{
                    mainInfo:'клавиатура игровая хорошая мембранная',
                    secondaryInfo:'цвет черный, 120гр',
                    company:'Defender'
                },
                price:2000,
                quantity:1
            }
        ]
    }

    useEffect(() => {
        const elements = getCartElements();
        setCartElements(elements);
    }, []);

    const removeCartElement=(key)=>{
        const elements=cartElements.map(a => {return {...a}});
        console.log(elements);
        console.log(key);

        /* if(cartElements.length === 1 || cartElements.length === 0){
            setCartElements([]);
        }else if(key === 0){
            elements.shift();
            setCartElements([...elements]);
            console.log(cartElements);
        }else if(key === cartElements.length-1 ){
            elements.pop();
            setCartElements([...elements]);
        }else{
            setCartElements([...elements.slice(0,key),...elements.slice(key+1)]);
        } */
        elements.splice(key,1);
        setCartElements([...elements]);
    }

    const loadCartElements=useMemo(()=>{
        console.log(cartElements);
        const line= cartElements.length != 1 ? <hr className='line_short'/>: null ;
        return cartElements.map((el,idx,arr)=>{
            const line= cartElements.length != 1 && idx!= arr.length-1 ? <hr className='line_short'/>: null ;
            return (
                <>
                    <CartElement key={idx} index={idx} cartElement={el} removeElement={removeCartElement}/>
                    {line}
                </>   
            );
        });
    },[cartElements]);

    return (
        <div className='container'>
            <h1 className='cart-text'>Корзина</h1>
            <div className='cart-container '>
                <div className='element-container background_white'>
                    <div className='element-container__header'>
                        <div className='header__checking'>
                            <input type="checkbox" value="" />
                            <p>Выбрать все товары</p>
                        </div>
                        <div className='header__checking'>
                            <p className='text-button_red'>Удалить выбранные</p>
                        </div>
                    </div>
                    <hr className='line'/>
                    {loadCartElements}
                </div>
                <div className='accept-cart-container'>
                    <AcceptCart/>
                </div>
            </div>
        </div>
        
    );
}

const CartElement = (props)=>{
    const {cartElement,index,removeElement} = props;
    
    const [isChecked, setIsChecked] = useState(true);
    const [image, setImage] = useState('');
    const [description, setDescription] = useState([]);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const onAddQuantity=(e)=>{
        const counterEl=e.target.parentNode.firstChild;  
        const quantity = counterEl.innerText;
        counterEl.innerText= +quantity+1;
    }

    const onRemoveQuantity=(e)=>{
        const counterEl=e.target.parentNode.firstChild;  
        const quantity = counterEl.innerText;

        if(+quantity>0)
            counterEl.innerText= +quantity-1;
    }

    const onRemoveElement=()=>{
        removeElement(index);
    }

    useEffect(() => {
        setIsChecked(cartElement.isChecked); 
        setImage(cartElement.image);
        setDescription(cartElement.description); 
        setPrice(cartElement.price); 
        setQuantity(cartElement.quantity);
    }, []);

    return(
        <div className='cart-element'>
            <div className='cart-element__img'>
                <input type="checkbox" value=""/>
                <img src={""+image} alt=""/>
            </div>
            <div className='cart-element__description'>
                <p>{description.mainInfo}</p>
                <p className='text-secondary'>{description.secondaryInfo}</p>
                <p className='text-secondary'>{description.company}</p>
                <p className='text-button_blue' onClick={() => onRemoveElement()}>Удалить</p>
            </div>
            <div className='cart-element__pricing'>
                <p>{price} Р</p>
            </div>
            <div className='cart-element__quantity'>
                <p>{quantity}</p>
                <RemoveIcon className='text-button_red' onClick={(e) => onRemoveQuantity(e)}/>
                <AddIcon className='text-button_green' onClick={(e) => onAddQuantity(e)}/>
            </div>
        </div>
    );
}

const AcceptCart = (props)=>{

    return (
        <div className='accept-cart background_white'>
            <div className='accept-cart__header'>
                <Button variant="contained" color="success" sx={{minWidth:'320px',minHeight:'50px'}}>
                    Оформить заказ
                </Button>
            </div>
            <hr />
            <div className='accept-cart__order-info'>
                <div className='order-info__left-wrapper'>
                    <p className='fw-bold fs-5'>Ваша корзина</p>
                    <p>Товары</p>
                    <p>Скидка</p>
                </div>
                <div className='order-info__right-wrapper'>
                    <p className='text-secondary'>1 товар * <span>500гр</span></p>
                    <p>1000 p</p>
                    <p>500 p</p>
                </div>
            </div>
            <hr />
            <div className='accept-cart__total'>
                <div className='total__left-wrapper'>
                        <p className='fw-bold fs-5'>Общая стоимость</p>
                    </div>
                    <div className='total__right-wrapper'>
                        <p className='fw-bold'>1000 p</p>
                    </div>
            </div>
        </div>
    );
}