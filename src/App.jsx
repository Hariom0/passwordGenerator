import { useEffect, useState } from "react";
import { Copy, Save, RefreshCcw , } from "lucide-react";
import ToggleButton from "react-toggle-button";
import PasswordHistory from "./component/PasswordHistory";
import { motion } from "framer-motion";

function App() {
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [len, setLen] = useState(8);
  const [generatedPassowrd, setGeneratedPassowrd] = useState("");
  const [savedPassowrd, setSavedPassowrd] = useState(
    JSON.parse(localStorage.getItem("savedPassword")) || []
  );

  useEffect(() => {
    generatePassowrd(len);
  }, [len, includeNumbers, includeSymbols]);

  useEffect(() => {
    localStorage.setItem("savedPassword", JSON.stringify(savedPassowrd));
  }, [savedPassowrd]);

  function generatePassowrd(length) {
    let password = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const symbols = "~`!@#$%^&*()_-+={[}]|:;<,>.?/";
    const numbers = "0123456789";

    if (includeSymbols) password += symbols;
    if (includeNumbers) password += numbers;

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += password[Math.floor(Math.random() * password.length)];
    }
    setGeneratedPassowrd(newPassword);
  }

  function removeSavedPassword(pass) {
    setSavedPassowrd(savedPassowrd.filter((element) => element !== pass));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-500 via-gray-400 to-gray-300 p-4 text-white flex flex-col justify-between">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl bg-white text-black shadow-2xl mx-auto rounded-xl p-8  mt-20"
      >
        <h1 className="text-center text-3xl font-extrabold mb-6 tracking-wide">
          Password Generator 🔐
        </h1>

        {/* Generated Password */}
        <label htmlFor="pass" className="text-gray-600">Your Password</label>
        <div className="bg-gray-100 p-2 rounded-lg flex justify-between items-center mt-2 gap-2">
          <input
            type="text"
            id="pass"
            readOnly
            value={generatedPassowrd}
            className="flex-grow outline-none bg-transparent text-md font-mono"
          />
          <div className="flex gap-3">
            <button
              className="hover:scale-110 active:scale-95 transition-transform text-blue-500"
              onClick={() => navigator.clipboard.writeText(generatedPassowrd)}
            >
              <Copy size={20} />
            </button>
            <button
              className="hover:scale-110 active:scale-95 transition-transform text-green-500"
              onClick={() => {
                if (!savedPassowrd.includes(generatedPassowrd)) {
                  setSavedPassowrd((prev) => [...prev, generatedPassowrd]);
                }
              }}
            >
              <Save size={20} />
            </button>
            <button
              className="hover:rotate-180 active:scale-95 transition-all duration-300 text-purple-600"
              onClick={() => generatePassowrd(len)}
            >
              <RefreshCcw size={20} />
            </button>
          </div>
        </div>

        {/* Length Slider */}
        <div className="my-5">
          <label htmlFor="len" className="text-gray-600">
            Length: <span className="font-bold text-black">{len}</span>
          </label>
          <input
            type="range"
            min={4}
            max={20}
            value={len}
            className="w-full"
            onChange={(e) => setLen(e.target.value)}
          />
        </div>

        {/* Toggle Options */}
        <div className="text-gray-600 space-y-4">
          <div className="flex justify-between">
            <label>Include Numbers</label>
            <ToggleButton
              value={includeNumbers}
              onToggle={() => setIncludeNumbers((prev) => !prev)}
            />
          </div>
          <div className="flex justify-between">
            <label>Include Symbols</label>
            <ToggleButton
              value={includeSymbols}
              onToggle={() => setIncludeSymbols((prev) => !prev)}
            />
          </div>
        </div>

        {/* Password History */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700">Saved Passwords</h2>
          <div className="mt-2">
            {savedPassowrd.length > 0 ? (
              savedPassowrd.map((pass, idx) => (
                <PasswordHistory
                  key={idx}
                  pass={pass}
                  removeSavedPassword={removeSavedPassword}
                />
              ))
            ) : (
              <p className="text-sm text-gray-400">No saved passwords yet.</p>
            )}
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-10 text-center">
          Keep your passwords safe. Don’t share them publicly.
        </p>
      </motion.div>

      {/* Footer */}
      <footer className="mt-6 text-center text-white ">
        <p>&copy; {new Date().getFullYear()} Created by Hariom Singh</p>
        <div className="flex justify-center mt-2 gap-4">
          <a href="https://github.com/Hariom0" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/hariom-singh-9651a4214" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
