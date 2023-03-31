import React, { useState, useEffect } from "react";
import "./App.css";

function IssuesList() {
  const [repoName, setRepoName] = useState("");
  const [issues, setIssues] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event) => {
    setRepoName(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const issuesUrl = `https://api.github.com/repos/${repoName}/issues?per_page=1000`;
    try {
      const response = await fetch(issuesUrl);
      const data = await response.json();
      setIssues(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Update the page title with the repository name
    document.title = `Issues for ${repoName}`;
  }, [repoName]);

  const totalIssues = issues.length;
  const reactIssues = Array.isArray(issues) ? issues.filter(
    (issue) =>
      issue.title.toLowerCase() ||
      issue.body.toLowerCase()
  ): [];
  const totalReactIssues = reactIssues.length;
  const filteredIssues = issues.filter(
    (issue) =>
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.body.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="App">
     <h1>GitHub Issues Viewer</h1>
     <p>Please enter the reop name in this format example-- microsoft/typescript or facebook/react</p>
      <form onSubmit={handleSubmit}>
        <label>
          Repository name:{" "}
        </label>
        <input
          type="text"
          value={repoName}
          onChange={handleChange}
          placeholder="facebook/react"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {totalIssues > 0 && (
        <div>
         <div>
            <label>
              Search issues:
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search issues by title or body"
            />
          </div>
          <h2>Total issues: {totalIssues}</h2>
          <h2>Issues that mention {repoName}:  {totalReactIssues}</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>State</th>
                <th>Created</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id}>
                  <td>{issue.title}</td>
                  <td>{issue.state}</td>
                  <td>{new Date(issue.created_at).toLocaleString()}</td>
                  <td>{new Date(issue.updated_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );  
}

export default IssuesList;
