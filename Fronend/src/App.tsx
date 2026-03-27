import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import LenisScroll from "./components/LenisScroll";
import GeneratePage from "./pages/GeneratePage";
import MyGeneratePage from "./pages/MyGeneratePage";
import LoginPage from "./pages/LoginPage";
import YtPreviewPage from "./pages/YtPreviewPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./context/ProtectedRoute";

export default function App() {
    return (
        <>
        < Toaster position="bottom-right" />
            <LenisScroll />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/generate" element={<GeneratePage />} />
                <Route path="/generate/:id" element={<GeneratePage />} />
                <Route path="/my-generation" element={<ProtectedRoute><MyGeneratePage /></ProtectedRoute>} />
                <Route path="/preview" element={<ProtectedRoute><YtPreviewPage /></ProtectedRoute>} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
            <Footer />
        </>
    );
}