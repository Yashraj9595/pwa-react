import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root")

  if (!rootElement) {
    console.error("Root element with id 'root' not found in the DOM")
    return
  }

  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
