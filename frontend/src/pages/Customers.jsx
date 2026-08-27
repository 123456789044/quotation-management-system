import { useEffect, useState } from "react";
import {
  getCustomers,
  createCustomer,
  deleteCustomer,
} from "../api/customerApi";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  // Load customers
  const loadCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error("Error loading customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  // Form input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add customer
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createCustomer(form);

      setCustomers([...customers, response.data]);

      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
      });

      alert("Customer added successfully!");
    } catch (error) {
      console.error("Error creating customer:", error);
      alert("Failed to add customer");
    }
  };

  // Delete customer
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) {
      return;
    }

    try {
      await deleteCustomer(id);

      setCustomers(
        customers.filter((customer) => customer.id !== id)
      );
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Failed to delete customer");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Customers</h1>

      {/* Add Customer */}
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Add Customer
        </button>

      </form>

      <hr />

      {/* Customer List */}

      <h2>Customer List</h2>

      {loading ? (
        <p>Loading customers...</p>
      ) : customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <table border="1" cellPadding="10">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {customers.map((customer) => (

              <tr key={customer.id}>

                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>

                <td>
                  <button
                    onClick={() =>
                      handleDelete(customer.id)
                    }
                  >
                    Delete
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>
      )}

    </div>
  );
}

export default Customers;