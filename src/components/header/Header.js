import './Header.css';
import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../redux/categorySlice/CategoryListSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    fileterProductsByCategoryName,
    restoreProductLists,
} from "../../redux/productSlice/ProductListSlice";
import { FaShoppingCart } from "react-icons/fa";

function Header() {
    const items = [
        {
            label: "Home",
            key: "Home",
        },
    ];
    const categoryStatus = useSelector(
        (state) => state.categoryListReducer.status
    );
    const dispatch = useDispatch();
    useEffect(() => {
        if (categoryStatus === "idle") {
            dispatch(fetchCategory());
        }
    }, [categoryStatus, dispatch]);
    const categories = useSelector(
        (state) => state.categoryListReducer.category
    );
    // Counting total Quantity to display in Header
    let cartItemCount = 0;
    const cart = useSelector(state => state.cartReducer.cart);
    if(cart){
        for(let i=0;i<cart.length;i++){
            cartItemCount += cart[i].quantity;
        }
    }
// Pushing items for Menu
    if (categoryStatus === "success") {
        categories.map((item) =>
            items.push({
                label: item.name,
                key: item.name,
            })
        );
        items.push({label:cartItemCount,key:'Cart',icon:<FaShoppingCart />});
    }

    const navigate = useNavigate();
    const [current, setCurrent] = useState("Home");
    const onClick = (e) => {
        setCurrent(e.key);
        if(e.key === "Cart"){
            navigate("/cart");
        }else if (e.key === "Home") {
            navigate("/");
            dispatch(restoreProductLists());
        } else {
            // navigate("/?category=" + e.key);
            setSearchParams({category:e.key})
        }
    };

    const [searchParams, setSearchParams] = useSearchParams();
    const urlCategory = searchParams.get("category");

    useEffect(() => {
        dispatch(fileterProductsByCategoryName(urlCategory));
    }, [urlCategory, dispatch]);

    return (
        <>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
            />
        </>
    );
}

export default Header;
