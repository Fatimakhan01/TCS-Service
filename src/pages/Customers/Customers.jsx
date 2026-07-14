import React, { useState, useEffect } from "react";
import Modal from "../../components/layout/Modal";

const Customers = () => {
  const defaultCustomers = [
    {
      id: 1,
      customerId: "CUS-0001",
      name: "Ali Khan",
      email: "ali@gmail.com",
      phone: "03001234567",
      city: "Lahore",
    },
    {
      id: 2,
      customerId: "CUS-0002",
      name: "Sara Ahmed",
      email: "sara@gmail.com",
      phone: "03111234567",
      city: "Karachi",
    },
    {
      id: 3,
      customerId: "CUS-0003",
      name: "Ahmed Raza",
      email: "ahmed@gmail.com",
      phone: "03211234567",
      city: "Islamabad",
    },
  ];

  const [customers, setCustomers] = useState(() => {
  const savedCustomers = localStorage.getItem("customers");

  return savedCustomers
    ? JSON.parse(savedCustomers)
    : defaultCustomers;
});

 useEffect(() => {

  localStorage.setItem(
    "customers",
    JSON.stringify(customers)
  );

}, [customers]);

  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  city: "",
});


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingCustomer) {
      const updatedCustomers = customers.map((customer) =>
        customer.id === editingCustomer.id
          ? {
              ...customer,
              ...formData,
            }
          : customer,
      );

      setCustomers(updatedCustomers);
    } else {
      const newCustomer = {
        id: customers.length + 1,
        customerId: `CUS-${String(customers.length + 1).padStart(4, "0")}`,
        ...formData,
      };

      setCustomers((prev) => [...prev, newCustomer]);
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      city: "",
    });

    setEditingCustomer(null);

    setIsModalOpen(false);
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);

    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      city: customer.city,
    });

    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?",
    );

    if (!confirmDelete) return;

    const updatedCustomers = customers.filter((customer) => customer.id !== id);

    setCustomers(updatedCustomers);
  };

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Customers</h1>

          <p className="text-gray-500 mt-1">Manage all registered customers.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
        >
          + Add Customer
        </button>
      </div>

      <div className="mt-8">
        <input
          type="text"
          placeholder="Search by Name, Email or City"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-4">Customer ID</th>

              <th className="text-left px-6 py-4">Name</th>

              <th className="text-left px-6 py-4">Email</th>

              <th className="text-left px-6 py-4">Phone</th>

              <th className="text-left px-6 py-4">City</th>

              <th className="text-center px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{customer.customerId}</td>

                <td className="px-6 py-4">{customer.name}</td>

                <td className="px-6 py-4">{customer.email}</td>

                <td className="px-6 py-4">{customer.phone}</td>

                <td className="px-6 py-4">{customer.city}</td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleEdit(customer)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(customer.id)}
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
        title={editingCustomer ? "Edit Customer" : "Add Customer"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Customer Name"
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            {editingCustomer ? "Update Customer" : "Save Customer"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Customers;
