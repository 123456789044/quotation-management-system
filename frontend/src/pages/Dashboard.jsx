import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="app-layout">

      <Navbar />

      <main className="main-content">

        {/* Header */}

        <div className="dashboard-header">

          <div>
            <h1>Dashboard</h1>
            <p>
              Welcome back! Here's what's happening with your quotations.
            </p>
          </div>

          <button
            className="create-btn"
            onClick={() => navigate("/create-quotation")}
          >
            + New Quotation
          </button>

        </div>

        {/* Summary Cards */}

        <div className="summary-section">

          <div className="summary-card">
            <div className="summary-icon">📄</div>

            <div>
              <p>Total Quotations</p>
              <h2>25</h2>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">⏳</div>

            <div>
              <p>Pending</p>
              <h2>08</h2>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">✓</div>

            <div>
              <p>Approved</p>
              <h2>17</h2>
            </div>
          </div>

        </div>

        {/* Recent Quotations */}

        <div className="recent-section">

          <div className="section-header">

            <div>
              <h2>Recent Quotations</h2>
              <p>Latest quotation activity</p>
            </div>

            <button
              className="view-btn"
              onClick={() => navigate("/quotations")}
            >
              View All
            </button>

          </div>

          <table>

            <thead>
              <tr>
                <th>Quotation ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>QT-001</td>
                <td>ABC Company</td>
                <td>26 Aug 2026</td>
                <td>₹50,000</td>
                <td>
                  <span className="status approved">
                    Approved
                  </span>
                </td>
              </tr>

              <tr>
                <td>QT-002</td>
                <td>XYZ Solutions</td>
                <td>25 Aug 2026</td>
                <td>₹35,000</td>
                <td>
                  <span className="status pending">
                    Pending
                  </span>
                </td>
              </tr>

              <tr>
                <td>QT-003</td>
                <td>Tech Solutions</td>
                <td>24 Aug 2026</td>
                <td>₹72,000</td>
                <td>
                  <span className="status approved">
                    Approved
                  </span>
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;