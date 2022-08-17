import {useState,useMemo} from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './ProductItem.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minWidth:'300px',
  minHeight: '200px'
}));

export const ProductItem = (props)=> {
  const {id,img,name,price}=props.item;
  const [isAdded,setIsAdded]= useState(false);


  const onAdd=(e)=>{
    if(isAdded){return;}
    setIsAdded(true);
  };


  const buttonText= isAdded ? "Добавлено":"В корзину";
  const buttonClass=isAdded ? "btn-success":"btn-primary";

  return (
        <Grid item>
          <div className='product-item'>
          <Item style={{textAlign:'center'}}>
            <div className='product-item__header'>
              <img src={img} alt="" className='header__img'/>
            </div>
            <hr />
            <div className='product-item__info mb-5'>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',fontSize:'18px', fontWeight:'700',marginRight:'5px'}}>
                    <p style={{}}>Цена:</p>
                    <p>{price} р</p>
                </div>
                <h1 style={{fontSize:'12px',textAlign:'left'}}>{name}</h1>
            </div>
            <div className='product-item__footer'>
              <button type="button" class={"btn add-btn " + buttonClass} onClick={(e)=>onAdd(e)}>{buttonText}</button>
            </div>
          </Item>
          </div>
        </Grid>
  );
}