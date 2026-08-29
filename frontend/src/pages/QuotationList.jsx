import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import { getQuotations, deleteQuotation } from "../api/QuotationApi";
function QuotationList() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuotations();
  }, []);

  const loadQuotations = async () => {
    try {
      const response = await getQuotations();

      console.log("Quotations from backend:", response.data);

      setQuotations(response.data);
    } catch (error) {
      console.error("Error loading quotations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quotation?"
    );

    if (!confirmDelete) return;

    try {
      await deleteQuotation(id);

      setQuotations((previous) =>
        previous.filter(
          (quotation) => quotation.id !== id
        )
      );

      alert("Quotation deleted successfully!");
    } catch (error) {
      console.error("Error deleting quotation:", error);
      alert("Failed to delete quotation.");
    }
  };

  const filteredQuotations = quotations.filter((quotation) => {
    const quotationId = String(
      quotation.quotationNumber ||
        quotation.id ||
        ""
    ).toLowerCase();

    const customerName = String(
      quotation.customer?.name || ""
    ).toLowerCase();

    const matchesSearch =
      quotationId.includes(search.toLowerCase()) ||
      customerName.includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      quotation.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="app-layout">

      <Navbar />

      <main className="main-content">

        {/* HEADER */}

        <div className="quotation-list-header">

          <div>
            <h1>Quotations</h1>

            <p>
              Manage and track all your customer quotations.
            </p>
          </div>

          <button
            className="create-btn"
            onClick={() =>
              navigate("/create-quotation")
            }
          >
            + New Quotation
          </button>

        </div>

        {/* FILTERS */}

        <div className="quotation-filters">

          <div className="search-box">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search by quotation ID or customer..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >

            <option value="All">
              All Status
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Pending">
              Pending
            </option>

          </select>

        </div>

        {/* TABLE CARD */}

        <div className="quotation-list-card">

          <div className="table-top">

            <div>

              <h2>All Quotations</h2>

              <p>
                {filteredQuotations.length} quotations found
              </p>

            </div>

          </div>

          <div className="quotation-table-wrapper">

            {loading ? (

              <div
                style={{
                  padding: "30px",
                  textAlign: "center",
                }}
              >
                Loading quotations...
              </div>

            ) : (

              <table className="quotation-table">

                <thead>

                  <tr>
                    <th>Quotation ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredQuotations.length > 0 ? (

                    filteredQuotations.map(
                      (quotation) => (

                        <tr
                          key={quotation.id}
                        >

                          {/* QUOTATION ID */}

                          <td>
                            <strong>
                              {String(
                                quotation.quotationNumber ||
                                  `QT-${quotation.id}`
                              )}
                            </strong>
                          </td>

                          {/* CUSTOMER */}

                          <td>

                            <div className="customer-cell">

                              <strong>
                                {String(
                                  quotation.customer?.name ||
                                    "-"
                                )}
                              </strong>

                              <span>
                                {String(
                                  quotation.customer?.email ||
                                    "-"
                                )}
                              </span>

                            </div>

                          </td>

                          {/* DATE */}

                          <td>
                            {String(
                              quotation.date || "-"
                            )}
                          </td>

                          {/* AMOUNT */}

                          <td>

                            <strong>

                              ₹
                              {Number(
                                quotation.grandTotal || 0
                              ).toLocaleString("en-IN")}

                            </strong>

                          </td>

                          {/* STATUS */}

                          <td>

                            <span
                              className={`status ${
                                String(
                                  quotation.status || ""
                                ).toLowerCase()
                              }`}
                            >
                              {String(
                                quotation.status || "-"
                              )}
                            </span>

                          </td>

                          {/* ACTIONS */}

                          <td>

                            <div className="action-buttons">

                              <button
                                className="view-action"
                                onClick={() =>
                                  navigate(
                                    `/quotation/${quotation.id}`
                                  )
                                }
                              >
                                View
                              </button>

                              <button
                                className="edit-action"
                                onClick={() =>
                                  alert(
                                    `Edit ${
                                      quotation.quotationNumber ||
                                      quotation.id
                                    }`
                                  )
                                }
                              >
                                Edit
                              </button>

                              <button
                                className="delete-action"
                                onClick={() =>
                                  handleDelete(
                                    quotation.id
                                  )
                                }
                              >
                                Delete
                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="6"
                        className="no-results"
                      >
                        No quotations found.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default QuotationList;