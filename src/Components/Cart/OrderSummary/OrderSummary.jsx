import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../../../app/Slice/addCartSlice/addCartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart: cartItems} = useSelector((state) => state.cart);
  const userFound = localStorage.getItem("id");

  useEffect(() => {
    if (userFound) {
      dispatch(fetchCart());
    }
  }, [dispatch, userFound]);



  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const estimatedTax = totalPrice * 0.1;
  const orderTotal = totalPrice + estimatedTax;

  const handlePlaceOrder = () => {
    if (orderTotal > 0) {
      navigate(`/payment/${userFound}`);
    } else {
      toast.info("Your Cart is Empty");
    }
  };



  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-md">
      <h2 className="font-bold text-xl mb-4 text-gray-800">Order Summary</h2>
      <div className="flex justify-between mb-3 text-sm text-gray-700">
        <span>Items ({cartItems.length}):</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-3 text-sm text-gray-700">
        <span>Shipping & handling:</span>
        <span>$0.00</span>
      </div>
      <div className="flex justify-between mb-3 border-t border-gray-200 pt-3 text-sm text-gray-700">
        <span>Total before tax:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-3 text-sm text-gray-700">
        <span>Estimated tax (10%):</span>
        <span>${estimatedTax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-3 text-gray-900">
        <span>Order total:</span>
        <span>${orderTotal.toFixed(2)}</span>
      </div>
      <button
        className="w-full py-3 rounded-md mt-4 bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-800"
        onClick={handlePlaceOrder}
      >
        Place your order
      </button>
    </div>
  );
};

export default OrderSummary;
