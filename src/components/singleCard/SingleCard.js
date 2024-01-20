import "./SingleCard.css";
import React, { useState } from "react";
import { Button, Card, Modal, Carousel, message } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice/CartSlice";
const { Meta } = Card;

function SingleCard({ product }) {

    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    function clickHandler(p_product) {
        dispatch(addToCart(p_product));
        messageApi.open({
            type: 'success',
            content: 'Added to cart',
          });
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
        {contextHolder}
            <Card
                className="card"
                hoverable
                cover={
                    <img
                        onClick={showModal}
                        alt={product.title}
                        src={product.images[0]}
                        className="card-image"
                    />
                }
            >
                <Meta
                    title={product.title}
                    description={product.category.name}
                />
                <div className="cardButtonWrapper">
                    <h3>Price: ₹{product.price}</h3>

                    <Button
                        type="primary"
                        size="middle"
                        onClick={() => clickHandler(product)}
                    >
                        Add to Cart
                    </Button>
                </div>
            </Card>

            <Modal
                title={product.title}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="modelWrapper">
                    <div className="modelImageWrapper">
                        <Carousel>
                            <div>
                                <img
                                    alt={product.title}
                                    src={product.images[0]}
                                    className="card-image"
                                />
                            </div>
                            <div>
                                <img
                                    alt={product.title}
                                    src={product.images[1]}
                                    className="card-image"
                                />
                            </div>
                            <div>
                                <img
                                    alt={product.title}
                                    src={product.images[2]}
                                    className="card-image"
                                />
                            </div>
                        </Carousel>
                    </div>
                    <div className="modelContentWrapper">
                        <h3>Price : ₹{product.price}</h3>
                        <p>
                            <span>category :</span> {product.category.name}{" "}
                        </p>
                        <p>
                            <span>Description : </span> {product.description}
                        </p>
                    </div>
                </div>
            </Modal>
        </>
    );
}
export default SingleCard;
