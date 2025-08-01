const Orders = ({ recentOrders }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mt-4">Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full my-4">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Time
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {recentOrders.map((order) => {
              const totalMilliseconds =
                order.createdAt.seconds * 1000 +
                order.createdAt.nanoseconds / 1000000;
              const date = new Date(totalMilliseconds);

              const formattedDateTime = date.toLocaleString();

              return (
                <tr
                  key={order.orderNumber}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    #{order.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₦{order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formattedDateTime}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
