import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signup from "./components/registration/Signup";
import Login from "./components/registration/Login";
import Layout from "./components/layout/Layout";
import Home from "./components/landing/Home";
import ProtectedRoute from "./components/registration/ProtectedRoute"
import Portal from "./components/portal/Portal";
import Tree from "./components/portal/Tree/Tree";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/signup"} element={<Signup/>}/>
                    <Route path="/portal/:userId" element={<ProtectedRoute><Portal/></ProtectedRoute>} />
                    <Route path="/portal/:userId/:familyName" element={<Tree/>} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
