import api from "./api";

export const getQuotations = () => {
  return api.get("/quotations");
};

export const getQuotationById = (id) => {
  return api.get(`/quotations/${id}`);
};

export const createQuotation = (quotation) => {
  return api.post("/quotations", quotation);
};

export const updateQuotation = (id, quotation) => {
  return api.put(`/quotations/${id}`, quotation);
};

export const deleteQuotation = (id) => {
  return api.delete(`/quotations/${id}`);
};