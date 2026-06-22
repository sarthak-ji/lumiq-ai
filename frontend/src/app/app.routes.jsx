import {createBrowserRouter, Navigate} from 'react-router'
import Login from '../features/auth/pages/login'
import Register from '../features/auth/pages/register'
import Dashboard from '../features/chat/pages/Dashboard';
import Protected from "../features/auth/components/Protected";

export const router = createBrowserRouter([
    {
        path: '/dashboard',
        element: <Navigate to="/" replace />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/',
        element: <Protected>
            <Dashboard />
        </Protected>
    }
]);


