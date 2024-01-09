import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const location = useLocation();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const currentPathUserId = location.pathname.split('/portal/')[1];

    if (!token || userId !== currentPathUserId) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectedRoute