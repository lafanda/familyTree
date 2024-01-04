import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const location = useLocation();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const currentPathUserId = location.pathname.split('/portal/')[1];

    // Check if token exists and if the userId in URL matches the logged-in userId
    if (!token || userId !== currentPathUserId) {
        // Redirect them to the login page, but save the current location they were trying to go to
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectedRoute