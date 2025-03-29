import React from "react";

const MortgageList = ({ mortgages, loading, error, onEdit, onDelete }) => {

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  const formatPropertyType = (propertyType) => {
    switch (propertyType) {
      case "single_family":
        return "Single Family";
      case "condo":
        return "Condo";
      default:
        return capitalize(propertyType);
    }
  };

  const getRatingColor = (rating) => {
    switch (rating) {
      case "AAA":
        return "success"; 
      case "BBB":
        return "warning";
      case "C":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3" style={{textAlign:"center"}}>Stored Mortgages</h2>

      {loading ? (
        <div className="alert alert-info">Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Credit Score</th>
              <th>Loan Amount</th>
              <th>Property Value</th>
              <th>Annual Income</th>
              <th>Debt Amount</th>
              <th>Loan Type</th>
              <th>Property Type</th>
              <th>Credit Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mortgages.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center text-muted">
                  No records available
                </td>
              </tr>
            ) : (
              mortgages.map((mortgage, index) => (
                <tr key={mortgage.id}>
                  <td>{index + 1}</td>
                  <td>{mortgage.credit_score}</td>
                  <td>₹{mortgage.loan_amount.toLocaleString()}</td>
                  <td>₹{mortgage.property_value.toLocaleString()}</td>
                  <td>₹{mortgage.annual_income.toLocaleString()}</td>
                  <td>₹{mortgage.debt_amount.toLocaleString()}</td>
                  <td>{capitalize(mortgage.loan_type)}</td>
                  <td>{formatPropertyType(mortgage.property_type)}</td>
                  <td>
                    <span className={`badge bg-${getRatingColor(mortgage.credit_rating)}`}>
                      {mortgage.credit_rating}
                    </span>
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <button 
                      className="btn btn-sm btn-primary me-2" 
                      onClick={() => onEdit(mortgage)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-danger" 
                      onClick={() => onDelete(mortgage.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MortgageList;
