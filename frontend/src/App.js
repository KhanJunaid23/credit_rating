import React, { useState, useEffect } from "react";
import MortgageForm from "./components/MortgageForm";
import MortgageList from "./components/MortgageList";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function App() {
  const [mortgages, setMortgages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMortgages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/mortgages/");
      setMortgages(response.data);
    } catch (err) {
      setError("Failed to fetch mortgages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (mortgage) => {
    console.log("Editing mortgage:", mortgage);
  };

  const handleDelete = async (mortgageId) => {
    if (window.confirm("Are you sure you want to delete this mortgage?")) {
      try {
        await axios.delete(`/api/mortgages/${mortgageId}`);
        setMortgages(mortgages.filter((m) => m.id !== mortgageId));
      } catch (err) {
        alert("Failed to delete mortgage");
      }
    }
  };

  useEffect(() => {
    fetchMortgages();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Mortgage Management</h1>
      <hr />
      <div className="row">
        <div className="col-md-4">
          <MortgageForm refreshMortgages={fetchMortgages} />
        </div>

        <div className="col-md-8">
          <MortgageList 
            mortgages={mortgages} 
            loading={loading} 
            error={error} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        </div>
      </div>
    </div>
  );
}
