import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart,useCart } from "./ContextReducer";

function Card(props) {
  let dispatch = useDispatchCart()
  let data = useCart()
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);

  const [qty,setQty] = useState(1)
  const [size,setSize] = useState("")

  const handleAddToCart = async () => {
  await dispatch({type:"ADD", id:props.foodItem._id, name: props.foodItem.name,price: finalPrice, qty:qty, size:size})
  }

  let finalPrice = qty*parseInt(options[size]);
  useEffect(()=>{
   setSize(priceRef.current.value)
  },[]);

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "16rem", maxHeight: "330px",border: "1px solid black", borderRadius:"8px", 
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          cursor: 'pointer',
          textAlign:"center",
          // Add hover-up effect
          ':hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
          }
         }}
         onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-10px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
        }}
        >
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill", maxHeight: "200px", maxWidth: "100%" }} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="container w-100">
              <select className="m-2 h-130 bg-success rounded" onChange={(e)=> setQty(e.target.value)} style={{padding:"3px", color:"white"}}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {" "}
                      {i + 1}{" "}
                    </option>
                  );
                })}
              </select>

              <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=> setSize(e.target.value)} style={{padding:"3px", textAlign:"center", color:"white"}}>
                {priceOptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>

              <div className="d-inline h-100 fs-4">
                ₹{finalPrice}/-
              </div>

            </div>
            <hr />
            <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
