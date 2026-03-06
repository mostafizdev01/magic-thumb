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

export default function App() {
    return (
        <>
            <LenisScroll />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/generate" element={<GeneratePage />} />
                <Route path="/generate/:id" element={<GeneratePage />} />
                <Route path="/my-generation" element={<MyGeneratePage />} />
                <Route path="/preview" element={<YtPreviewPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
            <Footer />
        </>
    );
}