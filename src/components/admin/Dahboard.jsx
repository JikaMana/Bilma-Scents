import { AlertCircle, Package, ShoppingCart, TrendingUp } from "lucide-react";

const Dahboard = ({ perfumes, recentOrders }) => {
  const numberOfPerfumes = perfumes.length;
  const stats = [
    {
      title: "Total Products",
      value: 0,
      // change: "+12%",
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "Orders Today",
      value: 0,
      // change: "+8%",
      icon: ShoppingCart,
      color: "bg-green-500",
    },
    {
      title: "Revenue Today",
      value: "₦0",
      // change: "+23%",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
    // {
    //   title: "Low Stock",
    //   value: "12",
    //   change: "-5%",
    //   icon: AlertCircle,
    //   color: "bg-orange-500",
    // },
  ];

  const ordersPlacedToday = recentOrders.filter((order) => {
    const orderDate = new Date(order.createdAt.seconds * 1000);
    const today = new Date();
    return (
      orderDate.getDate() === today.getDate() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    );
  });

  const ordersCountToday = ordersPlacedToday.length;
  const ordersPriceToday = ordersPlacedToday.reduce(
    (total, order) => total + order.total,
    0
  );

  stats[0].value = numberOfPerfumes > 0 ? numberOfPerfumes : "-";
  stats[1].value = ordersCountToday > 0 ? ordersCountToday : "-";
  stats[2].value = ordersPriceToday > 0 ? `₦${ordersPriceToday}` : "-";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <button className="bg-[#9c6a24] w-max text-white px-4 py-2 rounded-lg hover:bg-[#c09d6c] cursor-pointer transition-colors">
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  justify-between gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600 font-medium">
                  {stat.change}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {recentOrders.slice(0, 5).map((order) => (
              <div
                key={order}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
              >
                <div>
                  <p className="font-medium">Order #{order.orderNumber}</p>
                  <p className="text-sm text-gray-600">{order.userId}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₦{order.total}</p>
                  <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    Completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
          <div className="space-y-3">
            {perfumes.slice(0, 5).map((product) => (
              <div
                key={product.id}
                className="flex items-center space-x-3 py-2"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>
                <p className="font-medium">₦{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dahboard;
