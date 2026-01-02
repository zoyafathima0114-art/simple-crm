import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import AddCustomer from "./AddCustomer";
import CustomerList from "./CustomerList";

export default function CustomersPage() {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");

    const fetchCustomers = async () => {
        const q = query(
            collection(db, "customers"),
            where("userId", "==", auth.currentUser.uid)
        );
        const snap = await getDocs(q);
        setCustomers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        (c.email || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="page-container">
            <h1 className="page-title">Customers</h1>

            {/* Add customer */}
            <AddCustomer user={auth.currentUser} onAdded={fetchCustomers} />

            {/* Search */}
            <div className="card">
                <div className="form-group">
                    <label>Search Customers</label>
                    <input
                        placeholder="Search by name or email"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* List */}
            <CustomerList customers={filteredCustomers} />
        </div>
    );
}
