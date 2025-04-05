import React, { useState, useEffect } from "react";
import useMessageStore from "../store/userSessionStore";
import "../styles.css";

const LandingPage = () => {
  const [query, setQuery] = useState("");
  const {messages, addMessage} = useMessageStore();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResponse = async (message) => {
    setLoading(true);
    addMessage({sender: "user", text: message, timestamp: new Date().toISOString() });
    try {
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Message: message }),
      });

      const data = await response.json();
      setLoading(false);

      // Extract content and resources
      const [content, resourcesSection] = data.response.split("Resources:");
      const extractedResources = resourcesSection
        ? resourcesSection
            .trim()
            .split("\n")
            .map((line) => {
              const match = line.match(/^(\d+)\.\s*(.*?)\s*[:\-\s]*\s*(https?:\/\/[^\s<>]+)(?:\s*\([^\)]*\))?/);
              return match ? { title: match[2], url: match[3] } : null;
            })
            .filter(Boolean)
        : [];

      // Update resources
      addMessage({sender: "ai", text: content, timestamp: new Date().toISOString() });
      setResources(extractedResources);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (query.trim() !== "") {
      fetchResponse(query);
      setQuery(""); // Clear input after submitting
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo">LegalAI</div>
        <div className="auth-buttons">
          <button className="auth-btn">Sign In</button>
          <button className="auth-btn">Register</button>
        </div>
      </header>

      <main className="main-content">
        {/* Left Section - Resources */}
        <section className="suggestions">
          <h2>Resources</h2>
          <ul id="resources">
            {resources.length > 0 ? (
              resources.map((res, index) => (
                <li key={index}>
                  <a href={res.url} target="_blank" rel="noopener noreferrer">
                    {res.title}
                  </a>
                </li>
              ))
            ) : (
              <p>No resources available</p>
            )}
          </ul>
        </section>

        {/* Right Section - Input and Chat */}
        <section className="query-section">
          <div id="chat">
            {messages.length === 0 ? (
              <h2 id="welcome-text">Welcome! How can I help you today?</h2>
            ) : (
              messages.map((msg, index) => (
                <p key={index} className={msg.sender === "user" ? "query" : "agent-response"}>
                  {msg.text}
                </p>
              ))
            )}
          </div>

          <div className="query-box">
            <input
              id="query"
              type="text"
              placeholder="Enter your query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button id="submit" className="submit-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
