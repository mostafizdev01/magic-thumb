import { createContext, useContext, useEffect, useState } from "react"
import type { IUser } from "../../public/assets/assets";
import { api } from "../config/api";
import toast from "react-hot-toast";


interface AuthContextProps {
    isLoggedIn: boolean;
    loading: boolean;
    setIsLoggedIn: (isLoggedI: boolean) => void;
    user: IUser | null;
    setUser: (user: IUser | null) => void
    login: (user: { email: string; password: string }) => Promise<void>;
    signUp: (user: { name: string; email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    loading: false,
    setIsLoggedIn: () => { },
    user: null,
    setUser: () => { },
    login: async () => { },
    signUp: async () => { },
    logout: async () => { }
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<IUser | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)


    const signUp = async ({ name, email, password }: { name: string, email: string, password: string }) => {
        try {
            setLoading(true)
            const { data } = await api.post("/api/user/register", { name, email, password })
            if (data?.user) {
                setLoading(false)
                setUser(data.user as IUser)
                setIsLoggedIn(true)
            }
            toast.success(data.message)
        } catch (error) {
            setLoading(false)
            // console.log("error:", error)
            toast.error("Something wen't wrong!")
        }
    }

    const login = async ({ email, password }: { email: string, password: string }) => {
        try {
            setLoading(true)
            const { data } = await api.post("/api/user/login", { email, password })
            if (data?.user) {
                setLoading(false)
                setUser(data.user as IUser)
                setIsLoggedIn(true)
                toast.success(data.message)
            }
            
        } catch (error: any) {
            setLoading(false)
            // console.log("error:", error)
            toast.error("Invalid email or password!")
        }
    }
    
    const logout = async () => {
        try {
            const { data } = await api.post("/api/user/logout")
                setUser(null)
                setIsLoggedIn(false)
            toast.success(data.message)
        } catch (error) {
            console.log("error:", error)
        }
    }


    const fetchUser = async () => {
        try {
            const {data} = await api.get("/api/user/verify", {withCredentials: true})
            if(data.user){
                setUser(data.user as IUser)
                setIsLoggedIn(true)
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        (async () => {
            await fetchUser();
        })();
    }, [])



    const value = {
        user, setUser,
        isLoggedIn, setIsLoggedIn,
        signUp, login, logout, loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = ()=> useContext(AuthContext)