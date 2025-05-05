import { useEffect, useState } from "react";
import { Copy, Save, RefreshCcw } from "lucide-react";
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
          Password Generator
        </h1>

        {/* Generated Password */}
        <label htmlFor="pass" className="text-gray-600">
          Your Password
        </label>
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
          <h2 className="text-lg font-semibold text-gray-700">
            Saved Passwords
          </h2>
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
        <div className="flex justify-center gap-2 mb-2 ">
          <a
            href="https://github.com/Hariom0"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              viewBox="0 0 32 32"
              fill="white"
            >
              <path
                fillRule="evenodd"
                d="M 16 4 C 9.371094 4 4 9.371094 4 16 C 4 21.300781 7.4375 25.800781 12.207031 27.386719 C 12.808594 27.496094 13.027344 27.128906 13.027344 26.808594 C 13.027344 26.523438 13.015625 25.769531 13.011719 24.769531 C 9.671875 25.492188 8.96875 23.160156 8.96875 23.160156 C 8.421875 21.773438 7.636719 21.402344 7.636719 21.402344 C 6.546875 20.660156 7.71875 20.675781 7.71875 20.675781 C 8.921875 20.761719 9.554688 21.910156 9.554688 21.910156 C 10.625 23.746094 12.363281 23.214844 13.046875 22.910156 C 13.15625 22.132813 13.46875 21.605469 13.808594 21.304688 C 11.144531 21.003906 8.34375 19.972656 8.34375 15.375 C 8.34375 14.0625 8.8125 12.992188 9.578125 12.152344 C 9.457031 11.851563 9.042969 10.628906 9.695313 8.976563 C 9.695313 8.976563 10.703125 8.65625 12.996094 10.207031 C 13.953125 9.941406 14.980469 9.808594 16 9.804688 C 17.019531 9.808594 18.046875 9.941406 19.003906 10.207031 C 21.296875 8.65625 22.300781 8.976563 22.300781 8.976563 C 22.957031 10.628906 22.546875 11.851563 22.421875 12.152344 C 23.191406 12.992188 23.652344 14.0625 23.652344 15.375 C 23.652344 19.984375 20.847656 20.996094 18.175781 21.296875 C 18.605469 21.664063 18.988281 22.398438 18.988281 23.515625 C 18.988281 25.121094 18.976563 26.414063 18.976563 26.808594 C 18.976563 27.128906 19.191406 27.503906 19.800781 27.386719 C 24.566406 25.796875 28 21.300781 28 16 C 28 9.371094 22.628906 4 16 4 Z"
              ></path>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/hariom-singh-9651a4214"
            target="_blank"
            rel="noopener noreferrer"
            className=" cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              viewBox="0 0 30 30"
              fill="white"
            >
              <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"></path>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
