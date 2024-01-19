import React, { useEffect, useState } from "react";
import "./Content.css";
import SingleCard from "../singleCard/SingleCard";
import { fetchProducts } from "../../redux/productSlice/ProductListSlice";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Spin, Button } from "antd";
import { useSearchParams } from "react-router-dom";
import { slice } from "lodash";

function Content() {
    // For loading some products initially and creating load more button
    const [isCompleted, setIsCompleted] = useState(false);
    const [index, setIndex] = useState(20);

    // Fetching products from store and slicing them
    const products = useSelector((state) => state.productListReducer.products);
    const initialProducts = slice(products, 0, index);

    // Getting url parameter
    const [searchParams, setSearchParams] = useSearchParams();
    const urlCategory = searchParams.get("category");

    // Resetting load more button on url change
    useEffect(()=>{
        setIndex(20);
        setIsCompleted(false);
    },[urlCategory])

    // Load more products on button click
    const loadMore = () => {
        setIndex(index + 10);
        if (index >= products.length) {
            setIsCompleted(true);
        } else {
            setIsCompleted(false);
        }
    };

    // Calling async function to fetch products
    const status = useSelector((state) => state.productListReducer.status);
    const dispatch = useDispatch();
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    
    // Showing loading status while fetching products
    if (status === "loading") {
        return (
            <div className="loadingBox">
                <Flex align="center" gap="middle">
                    <Spin size="large" />
                </Flex>
            </div>
        );
    }

    //Showing failed status in case of unable to fetch products
    if (status === "failed") {
        return <h1>Something Went Wrong!!!</h1>;
    }

    return (
        <div className="contentContainer">
        <div className="contentWrapper">
            {products &&
                initialProducts.map((item) => (
                    <SingleCard product={item} key={item.id} />
                ))}
            
        </div>
        {isCompleted ? (
                <Button className="loadMoreBtn" disabled>
                    All Done
                </Button>
            ) : (
                <Button className="loadMoreBtn" onClick={loadMore}>
                    Load More
                </Button>
            )}
        </div>
    );
}

export default Content;
