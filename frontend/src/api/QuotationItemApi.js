import api from "./api";

export const getQuotationItems = () => {
  return api.get("/quotation-items");
};

export const getQuotationItemById = (id) => {
  return api.get(`/quotation-items/${id}`);
};

export const createQuotationItem = (item) => {
  return api.post("/quotation-items", item);
};

export const updateQuotationItem = (id, item) => {
  return api.put(`/quotation-items/${id}`, item);
};

export const deleteQuotationItem = (id) => {
  return api.delete(`/quotation-items/${id}`);
};