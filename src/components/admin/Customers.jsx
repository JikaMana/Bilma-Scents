import { collection, getDocs } from "firebase/firestore";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { toast } from "sonner";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customerData, setCustomerData] = useState([]);

  const fetchCustomerData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "customers"));
      const customers = [];
      querySnapshot.forEach((doc) => {
        customers.push(doc.data());
      });
      setCustomerData(customers);
    } catch (error) {
      console.error("Error fetching customer data:", error);
      toast.error("Failed to fetch customer data");
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    const totalMilliseconds =
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    const date = new Date(totalMilliseconds);
    return date.toLocaleString();
  };

  const filteredProducts = customerData.filter((product) => {
    const matchesSearch =
      product?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product?.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-cesnter justify-between gap-4 my-4 md:my-8">
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <div className="relative flex-1 max-w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search customer by ID or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#9c6a24] focus:border-[#9c6a24]"
          />
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full whitespace-nowrap">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last purchase
              </th>
              {/* <th className="px-6 py-3"></th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((customer) => (
              <tr
                key={customer.customerId}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {customer.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {customer.customerId}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {customer.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {customer.numberOfOrders || 0}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatTimestamp(customer.lastActive)}
                </td>
                {/* <td className="px-6 py-4 text-right text-sm font-medium">
                <a href="#" className="text-[#9c6a24] hover:text-[#c09d6c]">
                  View
                </a>
              </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
