import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login() {
    setError("");

    if (!user || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { user, password }
      );

      if (res.data.success) {
        alert("Welcome to Tekstructers 🚀");
      } else {
        setError("Invalid credentials");
      }
    } catch {
      setError("Server not responding");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-4 overflow-hidden">
      
      {/* Animated Background Glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl"
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-sm sm:max-w-md bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-6 sm:p-8"
      >
        
        {/* Company */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-white mb-2"
        >
          TEKSTRUCTERS
        </motion.h1>

        <p className="text-center text-blue-100 mb-6">
          Secure Employee Login
        </p>

        {/* Error Animation */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              className="text-red-200 text-sm text-center mb-4"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Inputs */}
        <motion.input
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          type="text"
          placeholder="User ID"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="w-full mb-4 px-4 py-2.5 sm:py-3 rounded-lg bg-white/90 focus:ring-2 focus:ring-white outline-none"
        />

        <motion.input
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2.5 sm:py-3 rounded-lg bg-white/90 focus:ring-2 focus:ring-white outline-none"
        />

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={login}
          disabled={loading}
          className="w-full py-2.5 sm:py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 shadow-xl disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>

        <p className="text-center text-xs sm:text-sm text-blue-100 mt-6">
          © 2026 Tekstructers
        </p>
      </motion.div>
    </div>
  );
}

export default App;
