import { useSelector } from "react-redux";
import "./Cart.css";
import React from "react";
import SingleCartItem from "./SingleCartItem";

function Cart() {
    const cart = useSelector((state) => state.cartReducer.cart);

    let totalPrice = 0;
    if(cart){
      cart.map((item) => (totalPrice = totalPrice + item.price * item.quantity));
    }

    return (
        <div className="cartContaienr">
            <div className="cartWrapper">
                <h1>Your Cart</h1>
                <hr />
                {cart &&
                    cart.map((item) => (
                        <SingleCartItem product={item} key={item.id} />
                    ))}
            </div>
            <div className="billingContainer">
                <h2>Billing</h2>
                <hr />
                {cart &&
                    cart.map((item, i) => (
                        <h4 key={item.id}>
                            Item {i + 1} : {item.price} * {item.quantity} ={" "}
                            {item.price * item.quantity}
                        </h4>
                    ))}
                <h4>Total Price : {totalPrice}</h4>
            </div>
        </div>
    );
}

export default Cart;
