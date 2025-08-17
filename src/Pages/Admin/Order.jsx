import React, { useContext, useEffect } from "react";
import { OrderContext } from "../../Context/orderContext";

const OrderAdmin = () => {
 const { adminOrders, fetchAdminOrders, updateOrderStatus } = useContext(OrderContext);

  useEffect(() => {
    fetchAdminOrders();
  }, []);
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">All Orders</h2>

      {adminOrders.length === 0 ? (
        <p>No orders available</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Items</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Change Status</th>
            </tr>
          </thead>

          <tbody>
            {adminOrders.map((order) => (
              <tr key={order._id} className="text-center">
                <td className="p-2 border">{order._id}</td>
                <td className="p-2 border">
                  <img
                    src={order.items[0]?.image[0]}
                    alt="product"
                    className="w-16 h-16 object-cover mx-auto"
                  />
                </td>
                <td className="p-2 border">
                  {order.items?.map((item, i) => (
                    <div key={i}>{item.name} x {item.qty}</div>
                  ))}
                </td>
                <td className="p-2 border">{order.amount}</td>
                <td className="p-2 border">{order.status}</td>
                <td className="p-2 border">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderAdmin;
