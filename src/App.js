import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

// Firebase Configuration (Replace with your own Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyAZMInTuTTBz_3kA7cOfJHzADho6j_g4FQ",
  authDomain: "feedback-qa-c31dd.firebaseapp.com",
  databaseURL: "https://feedback-qa-c31dd-default-rtdb.firebaseio.com",
  projectId: "feedback-qa-c31dd",
  storageBucket: "feedback-qa-c31dd.firebasestorage.app",
  messagingSenderId: "157277881262",
  appId: "1:157277881262:web:8290117dbd7716fadc3e3f",
  measurementId: "G-5QTJX3MFRP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    const textRef = ref(db, "sharedText");
    onValue(textRef, (snapshot) => {
      if (snapshot.exists()) {
        setText(snapshot.val());
      }
    });
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
    set(ref(db, "sharedText"), e.target.value);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Real-Time Collaborative Text Editor</h2>
      <textarea
        value={text}
        onChange={handleChange}
        rows="10"
        cols="50"
        style={{ fontSize: "16px" }}
      />
    </div>
  );
}

export default App;
