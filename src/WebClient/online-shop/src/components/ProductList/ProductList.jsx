import {useMemo} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ProductItem } from '../ProductItem/ProductItem';
import { CatalogService } from '../../services/CatalogService';
import { useState } from 'react';

export const ProductList = (props)=> {
  const [elements, setElements] = useState([]);
  /* const productItems=[

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
  ] */
  const service = new CatalogService();

  const loadElements=()=>{
    service.getAllCatalogElements()
    .then(onLoadElements);
  }

  const onLoadElements=(newElements)=>{
    setElements(newElements);
  }

  const getProductItems=useMemo(()=>{
    loadElements();
    return elements.map(i=>{
      return (<ProductItem key={i.id} item={i}/>)
    });
  },[elements]); 

  return (
    <Box sx={{ flexGrow: 4 }}>
      <Grid container spacing={4} sx={{margin:0, width:'1045px',margin:'0 auto'}}>
        {getProductItems}
      </Grid>
    </Box>
  );
}