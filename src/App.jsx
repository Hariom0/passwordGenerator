import { useEffect, useState } from "react";
import PasswordHistory from "./component/PasswordHistory";
import { Copy, Save, RefreshCcw, Construction } from "lucide-react";
import ToggleButton from "react-toggle-button";

function App() {
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [len, setLen] = useState(8);
  const [generatedPassowrd, setGeneratedPassowrd ] = useState('');
  const [savedPassowrd, setSavedPassowrd ] = useState(JSON.parse(localStorage.getItem("savedPassword")) || [])
  // const [savedPassowrd, setSavedPassowrd ] = useState(()=>{
  //   const data = JSON.parse(localStorage.getItem("savedPassword"));
  //   return data ? data : [] 
  // });
  

  useEffect(()=>{
    generatePassowrd(len)
  },[len,includeNumbers,includeSymbols])

  useEffect(()=>{
      localStorage.setItem("savedPassword",JSON.stringify(savedPassowrd))
  },[savedPassowrd])

  function generatePassowrd(length){
    let password = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let symobol = "~`!@#$%^&*()_-+={[}]|\:;<,>.?/"
    let numbers  ="0123456789" 
    let newPassword = ""

    if(includeSymbols) password +=symobol
    if(includeNumbers) password +=numbers

    for(let i=0; i<length; i++){
      newPassword += password[Math.floor((Math.random()*password.length))]
    }
    setGeneratedPassowrd(newPassword)
  }


  function removeSavedPassword(pass){
    setSavedPassowrd(savedPassowrd.filter(element => element!=pass))
  }
  return (
    <>
      <div className="shadow-2xl  p-10 flex flex-col mx-auto mt-20 rounded-2xl font-semibold w-md">
        <h1 className="text-center text-2xl font-bold mb-5">Passowrd Generator</h1>


        {/* Generated Password */}
        <div>
          <label htmlFor="pass" className="text-gray-500">Your Password</label>
          <div className="bg-gray-200 mt-1 py-1 px-3 rounded-md flex justify-between gap-2">
            <input className="outline-none" type="text" id="pass" readOnly value={generatedPassowrd} />
            <div className="flex gap-2">
            <button className="text-blue-600 transition-all hover:scale-110 active:scale-95">
              <Copy size={20} onClick={()=>{
                try {
                  navigator.clipboard.writeText(generatedPassowrd)
                } catch (error) {
                  console.log("Error while copy,",error)
                }

              }} />
            </button>
            <button className="text-green-500 transition-all hover:scale-110 active:scale-95">
              <Save size={20} onClick={()=>{
                if(!savedPassowrd.includes(generatedPassowrd)) {
                  setSavedPassowrd(prev => [...prev,generatedPassowrd])
                };
              }}/>
            </button>
            <button className="text-purple-500 transition-all hover:rotate-90 duration-300 active:scale-95" 
            >
              <RefreshCcw size={20} onClick={()=>generatePassowrd(len)}/>
            </button>
            </div>
          </div>
        </div>

        {/* length */}
        
        <div className="flex flex-col mt-5">
          <div>
            <label htmlFor="len" className="text-gray-500">Length: {len}</label>
            <input type="range" min={4} max={20} className="block w-full"
            onChange={e=>setLen(e.target.value)}
            defaultValue={8}
            />
          </div>

          {/* Include Number */}
          <div className="mt-5 text-gray-500">
            <div className="flex justify-between">
              <label htmlFor="sym">Include Number</label>
              <ToggleButton
                value={includeNumbers}
                onToggle={() => setIncludeNumbers(prev=>!prev)}
                inactiveLabel=""
                activeLabel=""
                trackStyle={{
                  width: "40px",
                  height: "20px",
                  borderRadius: "15px",
                  display: "flex",
                  alignItems: "center",
                }}
                thumbStyle={{
                  borderRadius: "50%",
                  width: "16px",
                  height: "16px",
                }}
                thumbAnimateRange={[2, 22]}
                colors={{
                  activeThumb: { base: "#ffffff" },
                  inactiveThumb: { base: "#ffffff" },
                  active: { base: "#000000", hover: "#222222" },
                  inactive: { base: "#d3d3d3", hover: "#c0c0c0" },
                }}
              />
            </div>

            {/* Include Symbol */}

            <div className="flex justify-between mt-2">
              <label htmlFor="sym">Include Symbol</label>
              <ToggleButton
                value={includeSymbols}
                onToggle={() => setIncludeSymbols(prev=>!prev)}
                inactiveLabel=""
                activeLabel=""
                trackStyle={{
                  width: "40px",
                  height: "20px",
                  borderRadius: "15px",
                  display: "flex",
                  alignItems: "center",
                }}
                thumbStyle={{
                  borderRadius: "50%",
                  width: "16px",
                  height: "16px",
                }}
                thumbAnimateRange={[2, 22]}
                colors={{
                  activeThumb: { base: "#ffffff" },
                  inactiveThumb: { base: "#ffffff" },
                  active: { base: "#000000", hover: "#222222" },
                  inactive: { base: "#d3d3d3", hover: "#c0c0c0" },
                }}
              />
            </div>
          </div>
        </div>

        {/* Password History */}

        <div>
          <h2 className="text-gray-700 mt-5">Password History</h2>
          {savedPassowrd.length ? savedPassowrd.map((pass,index)=><PasswordHistory pass={pass} removeSavedPassword={removeSavedPassword} key={index}/> ) : "Empty"}
        </div>
        <p className="text-xs mt-10 text-gray-500 text-center">
          Keep your passwords secure and never share them
        </p>
      </div>
    </>
  );
}

export default App;


