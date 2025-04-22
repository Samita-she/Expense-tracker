import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseTable from "./components/ExpenseTable.jsx";
import SearchBar from "./components/SearchBar.jsx";

function App() {
    const [expenses, setExpenses] = useState(() => {
        // Load the expenses from localStorage if they exist
        const savedExpenses = localStorage.getItem("expenses");
        return savedExpenses ? JSON.parse(savedExpenses) : [];
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    // Function to save expenses to localStorage
    const saveExpensesToLocalStorage = (updatedExpenses) => {
        localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    };

    const handleAddExpense = (expense) => {
        // Mark this expense as newly added
        const newExpense = { ...expense, isNew: true };
        const updatedExpenses = [...expenses, newExpense];
        setExpenses(updatedExpenses);
        saveExpensesToLocalStorage(updatedExpenses);
    };

    const handleDeleteExpense = (index) => {
        const updated = [...expenses];
        updated.splice(index, 1);
        setExpenses(updated);
        saveExpensesToLocalStorage(updated);
    };

    const filteredExpenses = expenses
        .filter(
            (exp) =>
                exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                exp.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === "description") return a.description.localeCompare(b.description);
            if (sortBy === "category") return a.category.localeCompare(b.category);
            return 0;
        });

    const total = filteredExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

    return (
        <div className="min-h-screen w-full flex transition-all duration-300 bg-white text-gray-900 dark:bg-gray-900 dark:text-white font-sans">
            {/* Sidebar */}
            <aside className="w-20 md:w-32 bg-primary flex items-center justify-center text-white py-12">
                <span className="rotate-[-90deg] text-xs md:text-sm font-semibold tracking-wider">
                    
                </span>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10">
                <div className="max-w-7xl mx-auto">
                    <header className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-extrabold mb-1">
                                Expense <span className="text-accent">Tracker</span>
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                Start taking control of your finances and life.
                            </p>
                        </div>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-all"
                        >
                            {darkMode ? "Light Mode" : "Dark Mode"}
                        </button>
                    </header>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Form Section */}
                        <section className="md:w-1/3 p-6 rounded-2xl shadow-soft bg-gray-100 dark:bg-gray-800 transition-all">
                            <ExpenseForm onAdd={handleAddExpense} />
                        </section>

                        {/* Table & Controls */}
                        <section className="flex-1">
                            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

                            <div className="mt-4 mb-2 flex items-center gap-4">
                                <label className="text-sm font-medium">Sort by:</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-1 text-sm dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="default">None</option>
                                    <option value="description">Description (A-Z)</option>
                                    <option value="category">Category (A-Z)</option>
                                </select>
                            </div>

                            <div className="text-lg font-semibold text-teal-600 dark:text-teal-300 mb-4">
                                Total: ${total.toFixed(2)}
                            </div>

                            <div className="rounded-2xl shadow-soft overflow-x-auto bg-white dark:bg-gray-800 transition-all">
                                <ExpenseTable
                                    expenses={filteredExpenses}
                                    onDelete={handleDeleteExpense}
                                />
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;


