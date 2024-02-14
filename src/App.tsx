import { useCallback, useEffect } from "react";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import "./App.css"




export default function App() {
  const [Razorpay, isLoaded] = useRazorpay();

  // Mock function to generate an order ID (replace with actual server-side logic)
  const createOrder = async () => {
    // Simulate the creation of an order directly on the client side
    return { id: "mock_order_id" };
  };

  const handlePayment = useCallback(async () => {
    try {
      const order = await createOrder();

      const options: RazorpayOptions = {
        key: "YOUR_KEY_ID",
        amount: "3000",
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id,
        handler: (res) => {
          console.log(res);
        },
        prefill: {
          name: "Piyush Garg",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  }, [Razorpay]);

  useEffect(() => {
    if (isLoaded) {
      handlePayment();
    }
  }, [isLoaded, handlePayment]);

  return (
    <div className="App">
      <button onClick={handlePayment}>Click</button>
    </div>
  );
}
