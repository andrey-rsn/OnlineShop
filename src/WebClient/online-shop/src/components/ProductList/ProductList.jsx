import {useMemo} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { ProductItem } from '../ProductItem/ProductItem';
import { CatalogService } from '../../services/CatalogService';
import { useState } from 'react';
import '../../styles/global.css';

export const ProductList = (props)=> {
  const [elements, setElements] = useState([]);
  const [isLoading,setIsLoading]=useState(true);

  const service = new CatalogService();

  const loadElements=()=>{
    service.getAllCatalogElements()
    .then(onLoadElements).catch();
  }

  const onLoadElements=(newElements)=>{
      setElements(newElements);
      setIsLoading(false);
  }

  const getProductItems=useMemo(()=>{
    loadElements();

    const productItems=elements.map(i=>{
      return (<ProductItem key={i.id} item={i}/>)
    });

    return (
      <Box sx={{ flexGrow: 4 }}>
      <Grid container spacing={4} sx={{margin:0, width:'1045px',margin:'0 auto'}}>
        {productItems}
      </Grid>
    </Box>
    );
  },[elements]); 

  const skeleton= useMemo(()=>{
    return (
      <Box sx={{ flexGrow: 4 }}>
      <Grid container spacing={4} sx={{margin:0, width:'1045px',margin:'0 auto'}}>
        <Skeleton variant="rectangular" width={300} height={425} sx={{marginRight:'25px'}}/>
        <Skeleton variant="rectangular" width={300} height={425} sx={{marginRight:'25px'}}/>
        <Skeleton variant="rectangular" width={300} height={425} sx={{marginRight:'25px'}}/>
      </Grid>
    </Box>
    )
  },[]);

  const content =useMemo(()=>{
    return isLoading?skeleton:getProductItems;
  },[isLoading]) 

  return (
    <>
      {content}
    </>
    
  );
}