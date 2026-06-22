import { useDispatch } from "react-redux";
import { registerUser, loginUser, getMe } from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";


export function useAuth(){
    const dispatch = useDispatch();

    async function handleRegister({email, password, username}){
        try {
            dispatch(setLoading(true));
            const data = await registerUser({email, username, password});
            data;
        } catch (err) {
            dispatch(setError(err.response?.data?.message || "Registration failed!"));
        } finally{
            dispatch(setLoading(false));
        }
    }

    async function handleLogin({email, password}){
        try {
            dispatch(setLoading(true));
            const data = await loginUser({email, password});
            dispatch(setUser(data.user));
        } catch (err) {
            dispatch(setError(err.response?.data?.message || "Login failed!"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true));
            const data = await getMe();
            dispatch(setUser(data.user));
        } catch (err) {
            dispatch(setError((err.response?.data?.message || "Failed to fetch data!")));
        } finally {
            dispatch(setLoading(false));
        }
    }


    return {
        handleGetMe,
        handleLogin, 
        handleRegister
    }
}

