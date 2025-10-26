import { Routes, Route } from "react-router-dom";
import { About } from "./pages/About";
import { LogIn } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { PredictCrop } from "./pages/PredictCrop";
import { Dashboard } from "./pages/Dashboard";
import { Navbar } from "./components/ui/resizable-navbar";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar at the top */}
      <Navbar />

      {/* Page Routes */}
      <main className="flex-grow w-full p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/predict" element={<PredictCrop />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<h2 className="text-center mt-10">Page Not Found</h2>} />
        </Routes>
      </main>

      {/* Footer at the bottom */}
      {/* <Footer /> */}
    </div>
  );
}
