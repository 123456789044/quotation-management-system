import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import { getCustomers } from "../api/CustomerApi";
import { createQuotation } from "../api/QuotationApi";
import { createQuotationItem } from "../api/QuotationItemApi";

function CreateQuotation() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    customerId: "",
    quotationNumber: "",
    date: new Date().toISOString().split("T")[0],
    status: "Pending",
    tax: 18,
  });

  const [items, setItems] = useState([
    {
      description: "",
      quantity: 1,
      price: 0,
    },
  ]);

  // ==============================
  // LOAD CUSTOMERS
  // ==============================

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const response = await getCustomers();

      console.log("Customers:", response.data);

      setCustomers(response.data);
    } catch (error) {
      console.error("Error loading customers:", error);
      alert("Unable to load customers.");
    } finally {
      setLoadingCustomers(false);
    }
  };

  // ==============================
  // FORM CHANGE
  // ==============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ==============================
  // ITEM CHANGE
  // ==============================

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];

    updatedItems[index] = {
      ...updatedItems[index],
      [field]:
        field === "quantity" || field === "price"
          ? Number(value)
          : value,
    };

    setItems(updatedItems);
  };

  // ==============================
  // ADD ITEM
  // ==============================

  const addItem = () => {
    setItems([
      ...items,
      {
        description: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  // ==============================
  // REMOVE ITEM
  // ==============================

  const removeItem = (index) => {
    if (items.length === 1) {
      alert("At least one item is required.");
      return;
    }

    setItems(
      items.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  // ==============================
  // ITEM AMOUNT
  // ==============================

  const getItemAmount = (item) => {
    return (
      Number(item.quantity || 0) *
      Number(item.price || 0)
    );
  };

  // ==============================
  // SUBTOTAL
  // ==============================

  const subtotal = items.reduce(
    (total, item) =>
      total + getItemAmount(item),
    0
  );

  // ==============================
  // TAX
  // ==============================

  const taxPercentage = Number(formData.tax || 0);

  const taxAmount =
    subtotal * (taxPercentage / 100);

  // ==============================
  // GRAND TOTAL
  // ==============================

  const grandTotal =
    subtotal + taxAmount;

  // ==============================
  // CREATE QUOTATION
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customerId) {
      alert("Please select a customer.");
      return;
    }

    if (!formData.quotationNumber.trim()) {
      alert("Please enter quotation number.");
      return;
    }

    const invalidItem = items.some(
      (item) =>
        !item.description.trim() ||
        item.quantity <= 0 ||
        item.price < 0
    );

    if (invalidItem) {
      alert(
        "Please enter valid quotation item details."
      );
      return;
    }

    setSaving(true);

    try {
      // ==============================
      // FIND CUSTOMER
      // ==============================

      const selectedCustomer = customers.find(
        (customer) =>
          String(customer.id) ===
          String(formData.customerId)
      );

      if (!selectedCustomer) {
        alert("Customer not found.");
        return;
      }

      // ==============================
      // QUOTATION DATA
      // ==============================

      const quotationData = {
        quotationNumber:
          formData.quotationNumber,

        date: formData.date,

        tax: taxPercentage,

        subtotal: subtotal,

        taxAmount: taxAmount,

        grandTotal: grandTotal,

        status: formData.status,

        customer: {
          id: selectedCustomer.id,
        },
      };

      console.log(
        "Sending quotation:",
        quotationData
      );

      // ==============================
      // SAVE QUOTATION
      // ==============================

      const quotationResponse =
        await createQuotation(
          quotationData
        );

      console.log(
        "Created quotation:",
        quotationResponse.data
      );

      const createdQuotation =
        quotationResponse.data;

      // ==============================
      // SAVE QUOTATION ITEMS
      // ==============================

      for (const item of items) {

        const itemAmount =
          getItemAmount(item);

        const itemData = {
          description: item.description,

          quantity: item.quantity,

          price: item.price,

          amount: itemAmount,

          quotation: {
            id: createdQuotation.id,
          },
        };

        console.log(
          "Sending quotation item:",
          itemData
        );

        await createQuotationItem(
          itemData
        );
      }

      // ==============================
      // SUCCESS
      // ==============================

      alert(
        "Quotation created successfully!"
      );

      navigate("/quotations");

    } catch (error) {

      console.error(
        "Error creating quotation:",
        error
      );

      console.error(
        "Backend response:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to create quotation."
      );

    } finally {
      setSaving(false);
    }
  };

  // ==============================
  // UI
  // ==============================

  return (
    <div className="app-layout">

      <Navbar />

      <main className="main-content">

        {/* HEADER */}

        <div className="quotation-list-header">

          <div>
            <h1>Create Quotation</h1>

            <p>
              Create a new quotation for your customer.
            </p>
          </div>

        </div>


        <form onSubmit={handleSubmit}>

          <div className="quotation-list-card">

            {/* =========================
                QUOTATION DETAILS
            ========================== */}

            <div className="table-top">

              <div>
                <h2>Quotation Details</h2>

                <p>
                  Enter quotation information.
                </p>
              </div>

            </div>


            <div style={{ padding: "20px" }}>

              {/* QUOTATION NUMBER */}

              <label>
                Quotation Number
              </label>

              <input
                type="text"
                name="quotationNumber"
                placeholder="QTN-001"
                value={
                  formData.quotationNumber
                }
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "8px",
                  marginBottom: "20px",
                }}
              />


              {/* CUSTOMER */}

              <label>
                Customer
              </label>

              <select
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "8px",
                  marginBottom: "20px",
                }}
              >

                <option value="">
                  {loadingCustomers
                    ? "Loading customers..."
                    : "Select Customer"}
                </option>

                {customers.map(
                  (customer) => (

                    <option
                      key={customer.id}
                      value={customer.id}
                    >
                      {customer.name}
                      {customer.email
                        ? ` - ${customer.email}`
                        : ""}
                    </option>

                  )
                )}

              </select>


              {/* DATE */}

              <label>
                Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "8px",
                  marginBottom: "20px",
                }}
              />


              {/* TAX */}

              <label>
                Tax (%)
              </label>

              <input
                type="number"
                name="tax"
                min="0"
                value={formData.tax}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "8px",
                  marginBottom: "20px",
                }}
              />


              {/* STATUS */}

              <label>
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "8px",
                }}
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="Approved">
                  Approved
                </option>

              </select>

            </div>


            {/* =========================
                ITEMS
            ========================== */}

            <div className="table-top">

              <div>
                <h2>Quotation Items</h2>

                <p>
                  Add products or services.
                </p>
              </div>

            </div>


            <div
              className="quotation-table-wrapper"
              style={{
                padding: "20px",
              }}
            >

              <table className="quotation-table">

                <thead>

                  <tr>

                    <th>
                      Description
                    </th>

                    <th>
                      Quantity
                    </th>

                    <th>
                      Price
                    </th>

                    <th>
                      Amount
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {items.map(
                    (item, index) => (

                      <tr key={index}>

                        {/* DESCRIPTION */}

                        <td>

                          <input
                            type="text"
                            placeholder="Product / Service"
                            value={
                              item.description
                            }
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            required
                          />

                        </td>


                        {/* QUANTITY */}

                        <td>

                          <input
                            type="number"
                            min="1"
                            value={
                              item.quantity
                            }
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "quantity",
                                e.target.value
                              )
                            }
                            required
                          />

                        </td>


                        {/* PRICE */}

                        <td>

                          <input
                            type="number"
                            min="0"
                            value={
                              item.price
                            }
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "price",
                                e.target.value
                              )
                            }
                            required
                          />

                        </td>


                        {/* AMOUNT */}

                        <td>

                          ₹
                          {getItemAmount(
                            item
                          ).toLocaleString(
                            "en-IN"
                          )}

                        </td>


                        {/* REMOVE */}

                        <td>

                          <button
                            type="button"
                            className="delete-action"
                            onClick={() =>
                              removeItem(
                                index
                              )
                            }
                          >
                            Remove
                          </button>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>


              {/* ADD ITEM */}

              <button
                type="button"
                className="create-btn"
                onClick={addItem}
                style={{
                  marginTop: "20px",
                }}
              >
                + Add Item
              </button>

            </div>


            {/* =========================
                SUMMARY
            ========================== */}

            <div
              style={{
                padding: "20px",
                textAlign: "right",
              }}
            >

              <p>
                <strong>
                  Subtotal:
                </strong>{" "}
                ₹
                {subtotal.toLocaleString(
                  "en-IN"
                )}
              </p>


              <p>
                <strong>
                  Tax ({taxPercentage}%):
                </strong>{" "}
                ₹
                {taxAmount.toLocaleString(
                  "en-IN"
                )}
              </p>


              <h2>
                Grand Total: ₹
                {grandTotal.toLocaleString(
                  "en-IN"
                )}
              </h2>

            </div>


            {/* =========================
                BUTTONS
            ========================== */}

            <div
              style={{
                padding: "20px",
                display: "flex",
                gap: "10px",
              }}
            >

              <button
                type="submit"
                className="create-btn"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Create Quotation"}
              </button>


              <button
                type="button"
                onClick={() =>
                  navigate("/quotations")
                }
              >
                Cancel
              </button>

            </div>

          </div>

        </form>

      </main>

    </div>
  );
}

export default CreateQuotation;