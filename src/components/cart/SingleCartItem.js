import "./SingleCartItem.css";
import React from "react";
import { Button } from "antd";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
    decrementCartItem,
    incrementCartItem,
    removeFromCart,
} from "../../redux/cartSlice/CartSlice";

function SingleCartItem({ product }) {
    const dispatch = useDispatch();

    function handleDecement(p_product) {
        dispatch(decrementCartItem(p_product));
    }

    function handleIncrement(p_product) {
        dispatch(incrementCartItem(p_product));
    }

    function handleDelete(p_product) {
        dispatch(removeFromCart(p_product));
    }

    return (
        <div className="singleCartItemWrapper">
            <div className="singleCartItemContainer">
                <div className="singleProductImage">
                    <img src={product.image} alt="" />
                </div>
                <div className="singleProductDesc">
                    <h3>{product.name}</h3>
                    <h3 style={{ marginTop: "10px" }}>
                        <span style={{ color: "red" }}>
                            Price : ₹{product.price}
                        </span>
                    </h3>
                </div>
            </div>
            <div className="singleProductAction">
                <Button
                    type="primary"
                    icon={<FaMinus />}
                    size="middle"
                    onClick={() => handleDecement(product)}
                />
                <h2>{product.quantity}</h2>
                <Button
                    type="primary"
                    icon={<FaPlus />}
                    size="middle"
                    onClick={() => handleIncrement(product)}
                />
                <Button
                    type="primary"
                    danger
                    icon={<RiDeleteBinFill />}
                    size="middle"
                    onClick={() => handleDelete(product)}
                />
            </div>
        </div>
    );
}

export default SingleCartItem;
