import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

import "./App.css";

function App() {
  const code = new URLSearchParams(window.location.search).get("code");

  return <div>{code ? <Dashboard code={code} /> : <Login />}</div>;
}

export default App;
