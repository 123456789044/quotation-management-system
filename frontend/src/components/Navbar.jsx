import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon">Q</div>

        <div>
          <h2>QuoteFlow</h2>
          <span>Management System</span>
        </div>
      </div>

      <div className="sidebar-menu">

        <p className="menu-title">MAIN MENU</p>

        {/* DASHBOARD */}

        <button
          className={
            location.pathname === "/dashboard"
              ? "active"
              : ""
          }
          onClick={() => navigate("/dashboard")}
        >
          <span>▣</span>
          Dashboard
        </button>

        {/* CREATE QUOTATION */}

        <button
          className={
            location.pathname === "/create-quotation"
              ? "active"
              : ""
          }
          onClick={() => navigate("/create-quotation")}
        >
          <span>＋</span>
          Create Quotation
        </button>

        {/* QUOTATIONS */}

        <button
          className={
            location.pathname === "/quotations"
              ? "active"
              : ""
          }
          onClick={() => navigate("/quotations")}
        >
          <span>☷</span>
          Quotations
        </button>

        {/* CUSTOMERS */}

        <button
          className={
            location.pathname === "/customers"
              ? "active"
              : ""
          }
          onClick={() => navigate("/customers")}
        >
          <span>♙</span>
          Customers
        </button>

      </div>

      <div className="sidebar-bottom">

        <button onClick={handleLogout}>
          <span>↪</span>
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Navbar;