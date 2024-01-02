import Login from "./components/registration/Login";
import Layout from "./components/layout/Layout";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./components/registration/Signup";
function App() {
  return (
    <Router>
        <Layout>
        <Routes>
            <Route  index element={<Login />}/>
            <Route  path = "/signup" element={<Signup />}/>
        </Routes>
        </Layout>
    </Router>
  );
}

export default App;
