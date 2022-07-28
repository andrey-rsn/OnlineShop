import './Cart.css';
import './CartElement.css';
import './AcceptCart.css';
import '../../styles/global.css'
import Button from '@mui/material/Button';
import { useMemo,useEffect,useState } from 'react';
import { QantityPicker } from '../QuantityPicker/QuantityPicker';

export const Cart = ()=>{

    const [cartElements, setCartElements] = useState([]);
    const [isAllChecked, setIsAllChecked] = useState(true);

    const getCartElements=()=>{
        return [
            {
                id:1,
                isChecked: true,
                image:'https://cdn1.ozone.ru/s3/multimedia-m/wc1200/6281544898.jpg',
                description:{
                    mainInfo:'мышка игровая хорошая',
                    secondaryInfo:'цвет зеленый, 90гр',
                    company:'Defender'
                },
                price:500,
                quantity:1
            },
            {
                id:2,
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
                id:3,
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
                id:4,
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

    useEffect(() => {
        console.log(cartElements);
        if(cartElements.some(i=>!i.isChecked)){
            setIsAllChecked(false);
        }
    }, [cartElements]);

    const removeCartElement=(key)=>{
        const elements=cartElements.filter(a => a.id !== key);
        setCartElements([...elements]);
    }

    const checkboxToggle=(id)=>{
        const newElements=cartElements.map(i=>{
            if(i.id===id){
                i.isChecked=!i.isChecked;
            }
            return i;
        })
        setCartElements(newElements);
    }

    const onQuantityChange=(id,newQuantity)=>{
        const newElements=cartElements.map(i=>{
            if(i.id===id){
                i.quantity=newQuantity;
            }
            return i;
        })
        setCartElements(newElements);
    }

    const onAllCheckedToggle=()=>{
        console.log(isAllChecked);
        setIsAllChecked(!isAllChecked);
        console.log(isAllChecked);
    };

    const loadCartElements=useMemo(()=>{
        console.log('cartElements');
        const elems=cartElements.map((el,idx,arr)=>{
            const withLine= cartElements.length != 1 && idx!= arr.length-1;
            return (
                <CartElement key={el.id} cartElement={el} removeElement={removeCartElement} withLine={withLine} checkboxToggle={checkboxToggle} quantityChange={onQuantityChange}/>   
            );
        });
        console.log(elems);
        return elems;
    },[cartElements]);

    const cartContent=useMemo(()=>{
        let content = cartElements.length === 0 ? <h1 className='cart-text text-center' >Корзина пуста</h1>
                                                :<>
                                                    <h1 className='cart-text'>Корзина</h1>
                                                    <div className='cart-container '>
                                                        <div className='element-container background_white'>
                                                            <div className='element-container__header'>
                                                                <div className='header__checking'>
                                                                    <input type="checkbox" value="" checked={isAllChecked} onChange={()=>onAllCheckedToggle()}/>
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
                                                            <AcceptCart cartElements={cartElements}/>
                                                        </div>
                                                    </div>
                                                </>
        return content;
    },[cartElements]);

    return (
        <div className='container'>
            {cartContent}
        </div>
    );
}

const CartElement = (props)=>{
    const {cartElement,removeElement,withLine,checkboxToggle, quantityChange} = props;
    const {isChecked,image,description,price,quantity,id} = cartElement;

    const onCheckboxToggle=()=>{
        checkboxToggle(id);
    }

    const onRemoveElement=()=>{
        removeElement(cartElement.id);
    }

    useEffect(() => {

    }, []);

    const line= withLine? <hr className='line_short'/>: null;

    return(
        <>
            <div className='cart-element'>
                <div className='cart-element__img'>
                    <input type="checkbox" value="" checked={isChecked} onChange={()=>onCheckboxToggle()}/>
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
                <QantityPicker key={id} id={id} onQuantityChange={quantityChange}/>
                </div>
            </div>
            {line}
        </>
    );
}

const AcceptCart = (props)=>{
    const {cartElements} = props;

    const getTotalQuantity=useMemo(()=>{
        let totalQuantity = 0;
        cartElements.map(i=>{
            if(i.isChecked){
                totalQuantity+=i.quantity;
            }
        });
        return totalQuantity;
    },[cartElements]);

    const getTotalPrice=useMemo(()=>{
        let totalPrice = 0;
        cartElements.map(i=>{
            if(i.isChecked){
                totalPrice+=i.quantity*i.price;
            }
        });
        return totalPrice;
    });

    useEffect(() => {

    }, [cartElements]);

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
                    <p className='text-secondary'>{getTotalQuantity} товар</p>
                    <p>{getTotalPrice} p</p>
                    <p>500 p</p>
                </div>
            </div>
            <hr />
            <div className='accept-cart__total'>
                <div className='total__left-wrapper'>
                        <p className='fw-bold fs-5'>Общая стоимость</p>
                    </div>
                    <div className='total__right-wrapper'>
                        <p className='fw-bold'>{getTotalPrice} p</p>
                    </div>
            </div>
        </div>
    );
}