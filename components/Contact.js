import React from "react";
import Layout from "./Layout";

import * as gtag from "../lib/gtag";

const Contact = () => {
  const [message, setMessage] = React.useState("");

  const handleInput = (e) => setMessage(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();

    gtag.event({
      action: "submit_form",
      category: "Contact",
      label: message,
    });

    setMessage("");
  };

  return (
    <Layout>
      <h1>This is the Contact page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Message:</span>
          <textarea onChange={handleInput} value={message} />
        </label>
        <button type="submit">submit</button>
      </form>
    </Layout>
  );
};

export default Contact;
