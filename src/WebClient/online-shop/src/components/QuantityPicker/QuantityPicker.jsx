import { useMemo, useState } from 'react';
import './QuantityPicker.css';

export const QantityPicker = (props) =>{
    const {onQuantityChange,id} = props;
    const [currency, setCurrency] = useState(1);
    const [isDropDown,setIsDropDown]=useState(true);

    const currencies = [1,2,3,4,5,6,7,8,9,10];

    const onCurrencyChange=(e)=>{
        e.preventDefault();
        let newCurrency;

        if(e.type === 'click'){
            newCurrency=e.target.innerText === "10+" ? 10 :+e.target.innerText;
        }else if(e.type === 'change'){
             return;
        }else if(e.type=== 'blur'){
            newCurrency = e.target.value === "" ? 1 : +e.target.value;
            e.target.value=newCurrency+'';
        }else{
            return;
        }

        setCurrency(newCurrency);
        if(newCurrency>=10){
            setIsDropDown(false);
        }else if(!isDropDown && newCurrency < 10){
            setIsDropDown(true);
        }
        onQuantityChange(id,newCurrency);
    };

    const onBlur=(e)=>{
        onCurrencyChange(e);
    }


    const getCurrenciesList=useMemo(()=>{
        const elements = currencies.map(i=>{
           return (<li>
                        <p class="dropdown-item" onClick={(e)=>onCurrencyChange(e)}>{i === 10 ? '10+' : i}</p>
                </li>
            )
        });
        return elements;
    },[currencies]);

    const pickerContent=useMemo(()=>{
        const content=isDropDown ?<div class="dropdown dropdown-container">
                                <button class="dropdown-toggle dropdown-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                  {currency}
                                </button>
                                <ul class="dropdown-menu dropdown-menu-container">
                                  {getCurrenciesList}
                                </ul>
                            </div>
                            : <input class="quantity-input" type="text" defaultValue={currency} onBlur={(e)=>onBlur(e)} onChange={(e)=>onCurrencyChange(e)}></input>;
        return content;

    },[isDropDown,currency]);
    
    return(
        <div>
            {pickerContent}
        </div>
        );
}