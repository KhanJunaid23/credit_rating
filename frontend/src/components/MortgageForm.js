import { useState, useEffect } from "react";
import axios from "axios";

const MortgageForm = ({ refreshMortgages }) => {
  const [mortgage, setMortgage] = useState({
    creditScore: "",
    loanAmount: "",
    propertyValue: "",
    annualIncome: "",
    debtAmount: "",
    loanType: "fixed",
    propertyType: "single_family",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const validate = () => {
    let tempErrors = {};
    if (mortgage.creditScore < 300 || mortgage.creditScore > 850)
      tempErrors.creditScore = "Credit score must be between 300 and 850";
    if (mortgage.loanAmount <= 0)
      tempErrors.loanAmount = "Loan amount must be a positive number";
    if (mortgage.propertyValue <= 0)
      tempErrors.propertyValue = "Property value must be a positive number";
    if (mortgage.annualIncome <= 0)
      tempErrors.annualIncome = "Annual income must be a positive number";
    if (mortgage.debtAmount < 0)
      tempErrors.debtAmount = "Debt amount cannot be negative";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setMessage("");

    let data = {
      credit_score: mortgage.creditScore,
      loan_amount: mortgage.loanAmount,
      property_value: mortgage.propertyValue,
      annual_income: mortgage.annualIncome,
      debt_amount: mortgage.debtAmount,
      loan_type: mortgage.loanType,
      property_type: mortgage.propertyType
    };

    try {
      await axios.post("http://localhost:8000/api/v1/mortgages/add/", data, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage("Mortgage added successfully!");
      setMortgage({
        creditScore: "",
        loanAmount: "",
        propertyValue: "",
        annualIncome: "",
        debtAmount: "",
        loanType: "fixed",
        propertyType: "single_family",
      });

      refreshMortgages();
    } catch (error) {
      setMortgage({
        creditScore: "",
        loanAmount: "",
        propertyValue: "",
        annualIncome: "",
        debtAmount: "",
        loanType: "fixed",
        propertyType: "single_family",
      });
      setMessage("Error: " + (error.response?.data?.error || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4" style={{ textAlign: "center" }}>Application Form</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white">
        <div className="mb-3">
          <label className="form-label">Credit Score</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter credit score"
            value={mortgage.creditScore}
            onChange={(e) =>
              setMortgage({ ...mortgage, creditScore: parseInt(e.target.value) || "" })
            }
          />
          {errors.creditScore && <small className="text-danger">{errors.creditScore}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Loan Amount</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter loan amount"
            value={mortgage.loanAmount}
            onChange={(e) =>
              setMortgage({ ...mortgage, loanAmount: parseFloat(e.target.value) || "" })
            }
          />
          {errors.loanAmount && <small className="text-danger">{errors.loanAmount}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Property Value</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter property value"
            value={mortgage.propertyValue}
            onChange={(e) =>
              setMortgage({ ...mortgage, propertyValue: parseFloat(e.target.value) || "" })
            }
          />
          {errors.propertyValue && <small className="text-danger">{errors.propertyValue}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Annual Income</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter annual income"
            value={mortgage.annualIncome}
            onChange={(e) =>
              setMortgage({ ...mortgage, annualIncome: parseFloat(e.target.value) || "" })
            }
          />
          {errors.annualIncome && <small className="text-danger">{errors.annualIncome}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Debt Amount</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter debt amount"
            value={mortgage.debtAmount}
            onChange={(e) =>
              setMortgage({ ...mortgage, debtAmount: parseFloat(e.target.value) || "" })
            }
          />
          {errors.debtAmount && <small className="text-danger">{errors.debtAmount}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Loan Type</label>
          <select
            className="form-select"
            value={mortgage.loanType}
            onChange={(e) => setMortgage({ ...mortgage, loanType: e.target.value })}
          >
            <option value="fixed">Fixed</option>
            <option value="adjustable">Adjustable</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Property Type</label>
          <select
            className="form-select"
            value={mortgage.propertyType}
            onChange={(e) => setMortgage({ ...mortgage, propertyType: e.target.value })}
          >
            <option value="single_family">Single Family</option>
            <option value="condo">Condo</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {message && <p className={message.startsWith("Error") ? "text-danger" : "text-success"}>{message}</p>}
    </div>
  );
};

export default MortgageForm;
