import React from "react";

// This is a placeholder for the customer data structure.
// In a real application, this would come from your state or a prop.
const customerData = [
  {
    customerId: "cust_001",
    name: "Alice Johnson",
    email: "alice.j@example.com",
    totalOrders: 5,
    lastActive: { seconds: 1754003584, nanoseconds: 72000000 }, // Using your timestamp format
  },
  {
    customerId: "cust_002",
    name: "Bob Smith",
    email: "bob.s@example.com",
    totalOrders: 12,
    lastActive: { seconds: 1753917184, nanoseconds: 0 },
  },
  {
    customerId: "cust_003",
    name: "Charlie Brown",
    email: "charlie.b@example.com",
    totalOrders: 1,
    lastActive: { seconds: 1753830784, nanoseconds: 0 },
  },
  // Add more customer objects as needed
];

const Customers = () => {
  // We'll put our timestamp formatting logic here to keep the rendering clean.
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    const totalMilliseconds =
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    const date = new Date(totalMilliseconds);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full whitespace-nowrap">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Active
              </th>
              {/* Optional: Add a column for actions like "View Details" */}
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customerData.map((customer) => (
              <tr
                key={customer.customerId}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4 text-sm text-gray-900">
                  {customer.customerId}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {customer.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {customer.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {customer.totalOrders}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatTimestamp(customer.lastActive)}
                </td>
                {/* Action button */}
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
