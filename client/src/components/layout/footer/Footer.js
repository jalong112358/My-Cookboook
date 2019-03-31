import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>Copyright &copy; {new Date().getFullYear()} DevConnector</p>
    </footer>
  );
}
