import React, { useState } from "react";

function FilterForm() {
  const [filterName, setFilterName] = useState("");
  const [criteria, setCriteria] = useState([
    { field: "Amount", operator: "More", value: 4 },
    { field: "Title", operator: "Starts with", value: "Meow" },
    { field: "Date", operator: "From", value: 2021 },
  ]);
  const [selection, setSelection] = useState(1);

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };

  const handleCriteriaChange = (index, field, value) => {
    const updatedCriteria = [...criteria];
    updatedCriteria[index][field] = value;
    setCriteria(updatedCriteria);
  };

  const addRow = () => {
    setCriteria([
      ...criteria,
      { field: "Amount", operator: "More", value: "" },
    ]);
  };

  const removeRow = (index) => {
    const updatedCriteria = [...criteria];
    updatedCriteria.splice(index, 1);
    setCriteria(updatedCriteria);
  };

  const handleSelectionChange = (event) => {
    setSelection(parseInt(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Filter Name:", filterName);
    console.log("Criteria:", criteria);
    console.log("Selection:", selection);
  };

  return (
    <div className="filter-form">
      <h1>Filter</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="filter-name">Filter name:</label>
          <input
            type="text"
            id="filter-name"
            value={filterName}
            onChange={handleFilterNameChange}
          />
        </div>

        <h2>Criteria</h2>
        {criteria.map((row, index) => (
          <div key={index}>
            <select
              value={row.field}
              onChange={(event) =>
                handleCriteriaChange(index, "field", event.target.value)
              }
            >
              <option value="Amount">Amount</option>
              <option value="Title">Title</option>
              <option value="Date">Date</option>
            </select>

            <select
              value={row.operator}
              onChange={(event) =>
                handleCriteriaChange(index, "operator", event.target.value)
              }
            >
              <option value="More">More</option>
              <option value="Starts with">Starts with</option>
              <option value="From">From</option>
            </select>

            <input
              type="text"
              value={row.value}
              onChange={(event) =>
                handleCriteriaChange(index, "value", event.target.value)
              }
            />

            <button onClick={() => removeRow(index)}>Remove</button>
          </div>
        ))}

        <button onClick={addRow}>Add Row</button>

        <h2>Selection</h2>
        <div>
          <input
            type="radio"
            id="selection-1"
            value={1}
            checked={selection === 1}
            onChange={handleSelectionChange}
          />
          <label htmlFor="selection-1">Select 1</label>
        </div>

        <div>
          <input
            type="radio"
            id="selection-2"
            value={2}
            checked={selection === 2}
            onChange={handleSelectionChange}
          />
          <label htmlFor="selection-2">Select 2</label>
        </div>

        <div>
          <input
            type="radio"
            id="selection-3"
            value={3}
            checked={selection === 3}
            onChange={handleSelectionChange}
          />
          <label htmlFor="selection-3">Select 3</label>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default FilterForm;
