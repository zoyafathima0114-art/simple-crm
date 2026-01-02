import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function InteractionList({ customerId }) {
    const [items, setItems] = useState([]);

    const load = async () => {
        const q = query(
            collection(db, "interactions"),
            where("customerId", "==", customerId)
        );
        const snap = await getDocs(q);
        setItems(snap.docs.map(d => d.data()));
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <ul style={{ marginTop: 10 }}>
            {items.map((i, idx) => (
                <li key={idx}>
                    <b>{i.type}</b> — {i.note}
                </li>
            ))}
        </ul>
    );
}
