import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function AddCustomer({ user, onAdded }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState("New");
    const [notes, setNotes] = useState("");
    const [followUp, setFollowUp] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await addDoc(collection(db, "customers"), {
            userId: user.uid,
            name,
            email,
            phone,
            status,
            notes,
            followUp,
            createdAt: new Date(),
        });

        setName("");
        setEmail("");
        setPhone("");
        setNotes("");
        setFollowUp("");
        setStatus("New");

        onAdded();
    };

    return (
        <div className="card">
            <h3 className="page-title">Add Customer</h3>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Customer Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Status</label>
                    <select value={status} onChange={e => setStatus(e.target.value)}>
                        <option>New</option>
                        <option>Active</option>
                        <option>Closed</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Follow-up Date</label>
                    <input type="date" value={followUp} onChange={e => setFollowUp(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Notes</label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} />
                </div>

                <button className="primary">Add Customer</button>
            </form>
        </div>
    );
}
