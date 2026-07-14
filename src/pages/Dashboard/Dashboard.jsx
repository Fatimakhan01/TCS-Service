import Card from "../../components/layout/Card";

const Dashboard = () => {
  const recentOrders = [
    {
      trackingId: "TCS-20260713-0001",
      customer: "Ali Khan",
      destination: "Lahore",
      status: "Pending",
    },
    {
      trackingId: "TCS-20260713-0002",
      customer: "Sara Ahmed",
      destination: "Karachi",
      status: "In Transit",
    },
    {
      trackingId: "TCS-20260713-0003",
      customer: "Ahmed Raza",
      destination: "Islamabad",
      status: "Delivered",
    },
  ];
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card title="Total Orders" value={120} bgColor="bg-blue-500" />

        <Card title="Pending" value={15} bgColor="bg-yellow-500" />

        <Card title="In Transit" value={30} bgColor="bg-purple-500" />

        <Card title="Delivered" value={75} bgColor="bg-green-500" />
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Orders Analytics</h2>
          <span className="text-sm text-gray-500">Weekly Report</span>
        </div>

        <div className="h-80 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-medium text-gray-500">
              📊 Chart Placeholder
            </p>

            <p className="text-sm text-gray-400 mt-2">
              Analytics chart will be displayed here
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3">Tracking ID</th>
                <th className="text-left p-3">Customer</th>
                <th className="text-left p-3">Destination</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.trackingId}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{order.trackingId}</td>

                  <td className="p-3">{order.customer}</td>

                  <td className="p-3">{order.destination}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                  ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                  }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
