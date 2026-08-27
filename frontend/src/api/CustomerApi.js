import api from "./api";

// Get all customers
export const getCustomers = () => {
  return api.get("/customers");
};

// Get customer by ID
export const getCustomerById = (id) => {
  return api.get(`/customers/${id}`);
};

// Create customer
export const createCustomer = (customer) => {
  return api.post("/customers", customer);
};

// Update customer
export const updateCustomer = (id, customer) => {
  return api.put(`/customers/${id}`, customer);
};

// Delete customer
export const deleteCustomer = (id) => {
  return api.delete(`/customers/${id}`);
};