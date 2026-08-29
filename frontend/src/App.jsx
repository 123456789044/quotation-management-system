import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateQuotation from "./pages/CreateQuotation";
import QuotationList from "./pages/QuotationList";
import ViewQuotation from "./pages/ViewQuotation";
import Customers from "./pages/Customers";
import Register from "./pages/Register";

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Login */}

        <Route
          path="/login"
          element={<Login />}
        />
<Route path="/register" element={<Register />} />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
<Route
  path="/customers"
  element={
    <ProtectedRoute>
      <Customers />
    </ProtectedRoute>
  }
/>

        {/* Create Quotation */}

        <Route
          path="/create-quotation"
          element={
            <ProtectedRoute>
              <CreateQuotation />
            </ProtectedRoute>
          }
        />


        {/* Quotation List */}

        <Route
          path="/quotations"
          element={
            <ProtectedRoute>
              <QuotationList />
            </ProtectedRoute>
          }
        />


        {/* View Quotation */}

        <Route
          path="/quotation/:id"
          element={
            <ProtectedRoute>
              <ViewQuotation />
            </ProtectedRoute>
          }
        />


        {/* Default */}

        <Route
          path="*"
          element={<Navigate to="/login" />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;