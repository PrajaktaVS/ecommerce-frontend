import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Cart.css";
import { toast } from "react-toastify";


export const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);


    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };

    const handleCheckOut = () => {
        const orderData = {
            productIds: cartItems.map(item => item.id),
            timestamp: Date.now(),
        };
        localStorage.setItem("recentOrder", JSON.stringify(orderData));
        localStorage.removeItem("cart");
        setCartItems([]);
        setOrderPlaced(true);
        toast.success("Order placed successfully.");
    };

    return (
        <div className="cart-page">
            <h2>My Cart</h2>
            {
                orderPlaced ? (
                    <>
                        <p className="success-msg">
                            Order placed successfully!
                        </p>
                        <NavLink to="/"><button>Home</button></NavLink>
                    </>
                ) : cartItems.length === 0 ? (
                    <p>No items in your cart.</p>
                ) : (
                    <div>
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="info">
                                    <img src={item.images[0]} alt={item.title} />
                                    <div>
                                        <h4>{item.title}</h4>
                                        <p>${item.price} X {item.quantity}</p>
                                    </div>
                                </div>
                                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                        <h3>Grand Total: ${calculateTotal()}</h3>

                        <button onClick={handleCheckOut}>
                            Proceed to Checkout
                        </button>
                    </div>
                )
            }
        </div>
    )
}