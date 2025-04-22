import { useState } from "react";

function ExpenseForm({ onAdd }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description || !category || !amount || !date) return;

        onAdd({ title, description, category, amount, date });

        setTitle("");
        setDescription("");
        setCategory("");
        setAmount("");
        setDate("");
    };

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Add Expense</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter expense title"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Enter category"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ExpenseForm;