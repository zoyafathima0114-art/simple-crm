import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function DashboardHome() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const q = query(
            collection(db, "customers"),
            where("userId", "==", auth.currentUser.uid)
        );
        const snap = await getDocs(q);
        setCustomers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    const active = customers.filter(c => c.status === "Active");
    const followUps = customers.filter(c => c.followUp);

    return (
        <div className="page-container">
            <h1 className="page-title">Dashboard</h1>

            <div className="customer-grid">
                <div className="card">
                    <p className="muted">Total Customers</p>
                    <h2>{customers.length}</h2>
                </div>

                <div className="card">
                    <p className="muted">Active Customers</p>
                    <h2>{active.length}</h2>
                </div>

                <div className="card">
                    <p className="muted">Follow-ups</p>
                    <h2>{followUps.length}</h2>
                </div>
            </div>

            <div style={{ marginTop: "30px" }}>
                <h2 className="page-title">Upcoming Follow-ups</h2>

                {followUps.length === 0 ? (
                    <p className="muted">No follow-ups scheduled</p>
                ) : (
                    <div className="customer-grid">
                        {followUps.map(c => (
                            <div key={c.id} className="card">
                                <h4>{c.name}</h4>
                                <p className="muted">Follow-up on {c.followUp}</p>
                                <span className={`badge ${c.status.toLowerCase()}`}>
                                    {c.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
