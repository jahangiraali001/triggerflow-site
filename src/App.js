import React from "react";
import styles from "./components/App.module.css";
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trigger Flow is Coming Soon</h1>
      <ContactUs />
    </div>
  );
}

export default App;
