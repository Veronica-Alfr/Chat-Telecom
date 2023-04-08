import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route exact path="/" component={ Login } />
        <Route path="/login" component={ Login } /> */}
        <Route path="/register" element={ <Register/> } />
      </Routes>
    </div>
  );
}

export default App;
