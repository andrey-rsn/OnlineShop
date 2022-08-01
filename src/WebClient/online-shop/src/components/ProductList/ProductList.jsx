import {useMemo} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { ProductItem } from '../ProductItem/ProductItem';

export const ProductList = (props)=> {

  const productItems=[
    {
      id:1,
      img:'https://cdn1.ozone.ru/s3/multimedia-t/wc1200/6288211097.jpg',
      name:'Telephone',
      price: 2500
    },
    {
      id:2,
      img:'https://cdn1.ozone.ru/s3/multimedia-t/wc1200/6288211097.jpg',
      name:'Telephone',
      price: 2500
    },
    {
      id:3,
      img:'https://cdn1.ozone.ru/s3/multimedia-t/wc1200/6288211097.jpg',
      name:'Telephone',
      price: 2500
    },
    {
      id:4,
      img:'https://cdn1.ozone.ru/s3/multimedia-t/wc1200/6288211097.jpg',
      name:'Telephone',
      price: 2500
    },
    {
      id:5,
      img:'https://cdn1.ozone.ru/s3/multimedia-t/wc1200/6288211097.jpg',
      name:'Telephone',
      price: 2500
    }
  ]

  const getProductItems=useMemo(()=>{
    return productItems.map(i=>{
      return (<ProductItem key={i.id} item={i}/>)
    });
  },[productItems]); 

  return (
    <Box sx={{ flexGrow: 4 }}>
      <Grid container spacing={4} sx={{margin:0, width:'1045px',margin:'0 auto'}}>
        {getProductItems}
      </Grid>
    </Box>
  );
}