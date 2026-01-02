import React, { useEffect, useState } from "react";
import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    updateDoc,
    doc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function CustomerList({ customers }) {
    return (
        <div className="customer-grid">
            {customers.map(c => (
                <CustomerCard key={c.id} customer={c} />
            ))}
        </div>
    );
}

function CustomerCard({ customer }) {
    const [interactions, setInteractions] = useState([]);
    const [type, setType] = useState("Call");
    const [note, setNote] = useState("");

    const loadInteractions = async () => {
        const q = query(
            collection(db, "interactions"),
            where("customerId", "==", customer.id)
        );
        const snap = await getDocs(q);
        setInteractions(snap.docs.map(d => d.data()));
    };

    useEffect(() => {
        loadInteractions();
    }, []);

    const addInteraction = async () => {
        if (!note) return;

        await addDoc(collection(db, "interactions"), {
            customerId: customer.id,
            type,
            note,
            createdAt: new Date(),
        });

        setNote("");
        loadInteractions();
    };

    return (
        <div className="card">
            <h3>{customer.name}</h3>
            <p className="muted">{customer.email}</p>
            <p className="muted">{customer.phone}</p>

            <span className={`badge ${customer.status.toLowerCase()}`}>
                {customer.status}
            </span>

            {customer.followUp && (
                <p className="muted">Follow-up: {customer.followUp}</p>
            )}

            {customer.notes && <p>{customer.notes}</p>}

            <hr />

            <label>Log Interaction</label>
            <select value={type} onChange={e => setType(e.target.value)}>
                <option>Call</option>
                <option>Email</option>
                <option>Meeting</option>
            </select>

            <textarea
                placeholder="Interaction notes"
                value={note}
                onChange={e => setNote(e.target.value)}
            />

            <button className="primary" onClick={addInteraction}>
                Add Interaction
            </button>

            {interactions.length > 0 && (
                <>
                    <h4>Interaction History</h4>
                    {interactions.map((i, idx) => (
                        <p key={idx} className="interaction">
                            <b>{i.type}</b> — {i.note}
                        </p>
                    ))}
                </>
            )}
        </div>
    );
}
