import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function ViewQuotation() {
  const navigate = useNavigate();
  const { id } = useParams();

  const quotation = {
    id: id,
    date: "26 Aug 2026",

    customer: {
      name: "ABC Company",
      email: "abc@gmail.com",
      phone: "+91 98765 43210",
      address: "Pune, Maharashtra, India",
    },

    items: [
      {
        description: "Website Development",
        quantity: 1,
        price: 50000,
      },
      {
        description: "Backend Development",
        quantity: 1,
        price: 30000,
      },
    ],

    tax: 18,
  };

  const subtotal = quotation.items.reduce(
    (total, item) =>
      total + item.quantity * item.price,
    0
  );

  const taxAmount = (subtotal * quotation.tax) / 100;

  const grandTotal = subtotal + taxAmount;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="app-layout">

      <Navbar />

      <main className="main-content">

        {/* Header */}

        <div className="view-header">

          <div>
            <h1>Quotation Details</h1>
            <p>View quotation information and details.</p>
          </div>

          <div className="view-header-buttons">

            <button
              className="back-btn"
              onClick={() => navigate("/quotations")}
            >
              ← Back
            </button>

            <button
              className="print-btn"
              onClick={handlePrint}
            >
              🖨 Print
            </button>

          </div>

        </div>


        {/* Quotation Document */}

        <div className="quotation-document">

          {/* Company Header */}

          <div className="document-header">

            <div className="company-info">

              <div className="company-logo">
                Q
              </div>

              <div>
                <h2>QuoteFlow</h2>
                <p>Quotation Management System</p>
              </div>

            </div>

            <div className="quotation-info">

              <h1>QUOTATION</h1>

              <p>
                <strong>Quotation No:</strong> {quotation.id}
              </p>

              <p>
                <strong>Date:</strong> {quotation.date}
              </p>

            </div>

          </div>


          <div className="document-line"></div>


          {/* Customer */}

          <div className="customer-section">

            <div>
              <p className="label">
                QUOTATION TO
              </p>

              <h3>{quotation.customer.name}</h3>

              <p>{quotation.customer.email}</p>

              <p>{quotation.customer.phone}</p>

              <p>{quotation.customer.address}</p>

            </div>

            <div className="quotation-status-box">

              <span className="status approved">
                Approved
              </span>

            </div>

          </div>


          {/* Items */}

          <div className="document-items">

            <table>

              <thead>

                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Amount</th>
                </tr>

              </thead>

              <tbody>

                {quotation.items.map((item, index) => {

                  const amount =
                    item.quantity * item.price;

                  return (
                    <tr key={index}>

                      <td>{index + 1}</td>

                      <td>
                        {item.description}
                      </td>

                      <td>
                        {item.quantity}
                      </td>

                      <td>
                        ₹{item.price.toLocaleString("en-IN")}
                      </td>

                      <td>
                        ₹{amount.toLocaleString("en-IN")}
                      </td>

                    </tr>
                  );

                })}

              </tbody>

            </table>

          </div>


          {/* Summary */}

          <div className="document-summary">

            <div className="summary-details">

              <div className="document-summary-row">
                <span>Subtotal</span>
                <strong>
                  ₹{subtotal.toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="document-summary-row">
                <span>
                  Tax ({quotation.tax}%)
                </span>

                <strong>
                  ₹{taxAmount.toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="document-divider"></div>

              <div className="document-total">
                <span>Grand Total</span>

                <strong>
                  ₹{grandTotal.toLocaleString("en-IN")}
                </strong>
              </div>

            </div>

          </div>


          {/* Footer */}

          <div className="document-footer">

            <div>
              <h4>Thank you for your business!</h4>

              <p>
                Please contact us if you have any questions
                regarding this quotation.
              </p>
            </div>

            <div className="validity">
              <strong>Quotation Validity</strong>
              <p>30 days from quotation date</p>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default ViewQuotation;