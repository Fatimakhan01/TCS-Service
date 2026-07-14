import React, { useEffect, useState } from "react";
import Modal from "../../components/layout/Modal";
import trackingId from "../../utils/trackingId";

const Orders = () => {
  const defaultOrders = [
    {
      id: 1,
      trackingId: "TCS-20260713-0003",
      sender: "Bilal Ahmed",
      receiver: "Ayesha Khan",
      destination: "Islamabad",
      parcelType: "Clothes",
      status: "Delivered",
    },
  ];

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");

    return savedOrders ? JSON.parse(savedOrders) : defaultOrders;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    sender: "",
    receiver: "",
    destination: "",
    parcelType: "",
    status: "Pending",
  });
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("latest");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingOrder) {
      const updatedOrders = orders.map((order) =>
        order.id === editingOrder.id
          ? {
              ...order,
              ...formData,
            }
          : order,
      );

      setOrders(updatedOrders);
    } else {
      const newOrder = {
        id: orders.length + 1,
        trackingId: trackingId(orders),
        ...formData,
      };

      setOrders((prev) => [...prev, newOrder]);
    }

    setFormData({
      sender: "",
      receiver: "",
      destination: "",
      parcelType: "",
      status: "Pending",
    });

    setEditingOrder(null);

    setIsModalOpen(false);
  };

  const handleEdit = (order) => {
    setEditingOrder(order);

    setFormData({
      sender: order.sender,
      receiver: order.receiver,
      destination: order.destination,
      parcelType: order.parcelType,
      status: order.status,
    });

    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?",
    );

    if (!confirmDelete) return;

    const updatedOrders = orders.filter((order) => order.id !== id);

    setOrders(updatedOrders);
  };
 const filteredOrders = orders
  .filter((order) => {
    const matchesSearch =
      order.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.receiver.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  })
  .sort((a, b) => {
    switch (sortOrder) {
      case "oldest":
        return a.id - b.id;

      case "senderAsc":
        return a.sender.localeCompare(b.sender);

      case "senderDesc":
        return b.sender.localeCompare(a.sender);

      case "latest":
      default:
        return b.id - a.id;
    }
  });
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Orders</h1>

          <p className="text-gray-500 mt-1">
            Manage all cargo orders from one place.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
        >
          + Create Order
        </button>
      </div>

      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by Tracking ID, Sender or Receiver"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="senderAsc">Sender A-Z</option>
          <option value="senderDesc">Sender Z-A</option>
        </select>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-4">Tracking ID</th>

              <th className="text-left px-6 py-4">Sender</th>

              <th className="text-left px-6 py-4">Receiver</th>

              <th className="text-left px-6 py-4">Destination</th>

              <th className="text-left px-6 py-4">Status</th>

              <th className="text-center px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{order.trackingId}</td>

                <td className="px-6 py-4">{order.sender}</td>

                <td className="px-6 py-4">{order.receiver}</td>

                <td className="px-6 py-4">{order.destination}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
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

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleEdit(order)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(order.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingOrder ? "Edit Order" : "Create New Order"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="sender"
            value={formData.sender}
            onChange={handleChange}
            placeholder="Sender Name"
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            type="text"
            name="receiver"
            value={formData.receiver}
            onChange={handleChange}
            placeholder="Receiver Name"
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Destination"
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <select
            name="parcelType"
            value={formData.parcelType}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          >
            <option value="">Select Parcel Type</option>

            <option value="Documents">Documents</option>

            <option value="Electronics">Electronics</option>

            <option value="Clothes">Clothes</option>

            <option value="Fragile">Fragile</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="Pending">Pending</option>

            <option value="In Transit">In Transit</option>

            <option value="Delivered">Delivered</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Save Order
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Orders;
