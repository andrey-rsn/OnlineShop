import {useState,useMemo} from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import image from '../../logo.svg';
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minWidth:'300px',
  minHeight: '200px'
}));

export const ProductItem = ()=> {

  const [isAdded,setIsAdded]= useState(false);

  const buttonColor=!isAdded ?"green":"primary";
  const buttonText= !isAdded ? "Добавлено":"В корзину";
  const onAdd=useMemo(()=>{
    setIsAdded(true);
    console.log(isAdded);
  },[]);

  return (
        <Grid item>
          <Item style={{textAlign:'left'}}>
            <img src={image} alt="" />
            <hr />
            <div className='mb-5'>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',fontSize:'18px', fontWeight:'700',marginRight:'5px'}}>
                    <p style={{}}>Цена:</p>
                    <p>1500p</p>
                </div>
                
                <h1 style={{fontSize:'12px'}}>Продукт такой то такой то хороший дешевый</h1>
            </div>
            <Button variant="contained" style={{backgroundColor:{buttonColor}}} onClick={onAdd}>{buttonText}</Button>
            
          </Item>
        </Grid>
  );
}