import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {
    let dispatch=useDispatchCart();
    let data=useCart();
    const priceRef=useRef();
    let options=props.options;
    let priceOptions=Object.keys(options);
    let foodItem=props.foodItem;
    const [qty,setQty]=useState(1);
    const [size,setSize]=useState("");
    const handleAddToCart= async ()=>{
        let food = [];
        console.log(size);
        for (const item of data) {
            if (item.id === foodItem._id && item.size==size) {
                console.log(item);
                food = item;
                break;
            }
        }
        if(food!=[]){
            if(food.size===size){
                await  dispatch({type:"UPDATE",id:foodItem._id,price:finalPrice,qty:qty,size:size});
                return;
            }
            else if(food.size!==size){
                await dispatch({type:"ADD",id:foodItem._id,name:foodItem.name,price:finalPrice,qty:qty,size:size});
                return;
            }
            return;
        }
        await dispatch({type:"ADD",id:foodItem._id,name:foodItem.name,price:finalPrice,qty:qty,size:size});
        //console.log(data);
    }
    let finalPrice=qty*parseInt(options[size]);
    useEffect(()=>{
        setSize(priceRef.current.value);
    },[])
    return (
        <div>
            <div className="card mt-3" style={{ width: "18rem", "maxHeight": "360px", backgroundColor: "white", color: "black" }}>
                <img src={foodItem.img} className="card-img-top" alt="...." style={{height:"120px" , objectFit:"fill"}}/>
                <div className="card-body">
                    <h5 className="card-title">{foodItem.name}</h5>
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded' onChange={(e)=> setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
                            {
                                priceOptions.map((data)=>{
                                    return <option key={data} value={data}>{data}</option>
                                })
                            }
                        </select>

                        <div className='d-inline h-100 fs-S'>
                            {finalPrice}/-
                        </div>
                    </div>
                    <hr>
                    </hr>
                    <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
