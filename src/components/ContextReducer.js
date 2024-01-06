import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext= createContext();
const CartDispatchContext=createContext();

const reducer=(state,action)=>{
    // console.log(state);
    // console.log(action);
    switch(action.type){
        case "ADD":
            return [...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,price:action.price,img:action.img}];
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1);
            return newArr;
        case "UPDATE":
            let arr = [...state]
            console.log(action);
            console.log(arr);
            arr.find((food, index) => {
                console.log(food.id,food.size,action.size);
                if (food.id === action.id && food.size.toString()==action.size.toString()) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price,parseInt(food.qty)+parseInt( action.qty))
                    arr[index] = { ...food, qty: parseInt(food.qty)+parseInt( action.qty), price: action.price + food.price }
                }
                
            })
            return arr
        case "DROP":
            let empArray=[]
            return empArray        
        default:
            console.log("Error in Reducer");
    }
}

export const CartProvider=({children})=>{

    const [state,dispatch]=useReducer(reducer,[]);

    return(
       <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
       </CartDispatchContext.Provider> 
    )
}

export const useCart=()=> useContext(CartStateContext);
export const useDispatchCart=()=> useContext(CartDispatchContext);
