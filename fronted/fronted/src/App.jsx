import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import Admin from "./pages/Admin";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import Matches from "./pages/Matches";
import Players from "./pages/Players";
import Teams from "./pages/Teams";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-green-500/30 selection:text-green-400">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-green-600/5 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />;
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/players" element={<Players />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/gallery" element={<Gallery />} />

          {/* 🔒 PROTECTED ADMIN ROUTE */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <Admin />
              </AdminProtectedRoute>
            }
          />

          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <footer className="relative z-10 border-t border-white/5 py-10 bg-slate-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">
            © 2025 Sonasade Premier League • Design And Developed By Ajit Gavade
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
