import React from 'react';

const Order = props => {
    const ingredientSummary = props.order.ingredient.map(item => {
        return (
            <span key={item.type} style={{
                border: "1px solid grey",
                borderRadius: "5px",
                padding: "5px",
                marginRight: "10px"
            }}>
                {item.amount}x <span style={{ textTransform: "uppercase" }}>{item.type}</span>
            </span>
        )
    })
    return (
        <div style={{
            border: "1px solid grey",
            boxShadow: "1px 1px #888888",
            borderRadius: "5px",
            padding: "20px",
            marginBottom: "20px"
        }}>
            <p>Order Number: {props.order.id}</p>
            <p>Delivery Address: {props.order.customer.deliveryAddress}</p>
            <hr />
            {ingredientSummary}
            <hr />
            <p>Total: {props.order.price} BDT</p>
        </div>
    )
}

export default Order;