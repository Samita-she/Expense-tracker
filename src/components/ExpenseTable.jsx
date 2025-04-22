function ExpenseTable({ expenses, onDelete }) {
    return (
        <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
                <tr className="bg-black text-white rounded-lg">
                    <th className="p-3">Title</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map((expense, index) => (
                    <tr
                        key={index}
                        className={`${expense.isNew ? "bg-indigo-600 text-white" : "bg-gray-50"
                            } hover:bg-gray-100 rounded-lg transition`}
                    >
                        <td className="p-3">{expense.title}</td>
                        <td className="p-3">{expense.description}</td>
                        <td className="p-3">{expense.category}</td>
                        <td className="p-3">KSh {expense.amount}</td>
                        <td className="p-3">{expense.date}</td>
                        <td className="p-3">
                            <button
                                onClick={() => onDelete(index)}
                                className="text-red-600 hover:underline"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ExpenseTable;
