import React, { useState } from "react";

const AddExpense = () => {
  const [groupId, setGroupId] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [payerId, setPayerId] = useState("");
  const [message, setMessage] = useState("");

  const handleAddExpense = async () => {
    const res = await fetch(`http://localhost:8000/groups/${groupId}/expenses/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        amount: parseFloat(amount),
        payer_id: parseInt(payerId),
      }),
    });

    if (res.ok) {
      setMessage("Expense added successfully ✅");
      setDescription("");
      setAmount("");
      setPayerId("");
    } else {
      setMessage("Failed to add expense ❌");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">💸 Add Expense</h2>
      
      <div className="space-y-4">
        <input
          type="text"
          value={groupId}
          placeholder="Group ID"
          onChange={(e) => setGroupId(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="text"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="number"
          value={amount}
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="text"
          value={payerId}
          placeholder="Payer User ID"
          onChange={(e) => setPayerId(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={handleAddExpense}
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200"
        >
          ➕ Add Expense
        </button>
      </div>

      {message && (
        <p className={`mt-4 text-sm font-medium ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AddExpense;
