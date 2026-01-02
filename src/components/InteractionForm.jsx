import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function InteractionForm({ customerId, onAdded }) {
    const [type, setType] = useState("Call");
    const [note, setNote] = useState("");

    const saveInteraction = async () => {
        if (!note) return;

        await addDoc(collection(db, "interactions"), {
            customerId,
            type,
            note,
            createdAt: new Date(),
        });

        setNote("");
        setType("Call");
        onAdded();
    };

    return (
        <div style={{ marginTop: 10 }}>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option>Call</option>
                <option>Email</option>
                <option>Meeting</option>
            </select>

            <textarea
                placeholder="Interaction notes"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={{ marginTop: 5 }}
            />

            <button onClick={saveInteraction} style={{ marginTop: 5 }}>
                Add Interaction
            </button>
        </div>
    );
}
