import React, { useCallback, useEffect, useState, useRef } from "react";

export default function App() {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [passwordg, setPasswordg] = useState("");
  //useref hook 
  const passwordRef = useRef(null)

  const handleRangeChange = (event) => {
    setLength(event.target.value);
  };
  const copyPasswordClip = useCallback(()=>{
    //using ref
    passwordRef.current?.select()
    // using more optimized with range select 
    passwordRef.current?.setSelectionRange(0,100) //we select three characters
    window.navigator.clipboard.writeText(passwordg)
  },[passwordg])

  const pass_Generator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (includeNumbers) {
      str += "0123456789";
    }
    if (includeSpecialChars) {
      str += "!@#$%^&*()";
    }
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
      console.log(Math.floor(Math.random() * str.length));
    }
    setPasswordg(pass);
  }, [length, includeNumbers, includeSpecialChars,setPasswordg]);

  useEffect(() => {
    pass_Generator();
  }, [length, includeNumbers, includeSpecialChars, pass_Generator]);

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Password Generator
      </h1>
      <div className="flex flex-col bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <div className="flex items-center mb-4">
          <input
            type="text"
            className="flex-grow p-3 border border-gray-300 rounded-l-lg text-gray-700"
            placeholder="Generated Password"
            value={passwordg}
            readOnly
            ref = {passwordRef}
          />
          <button
            className="bg-blue-600 text-white p-3 rounded-r-lg hover:bg-blue-700 focus:outline-none"
            onClick={copyPasswordClip}
          >
            Copy
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center w-full mb-4">
            <input
              type="range"
              className="flex-grow"
              name="limitrange"
              id="limitrange"
              value={length}
              min={8}
              max={100}
              onChange={handleRangeChange}
            />
            <label
              htmlFor="limitrange"
              className="ml-4 text-gray-700 font-semibold"
            >
              {length}
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="includeNumbers"
              checked={includeNumbers}
              onChange={() => {
                setIncludeNumbers((prev) => !prev);
              }}
              className="mr-2"
            />
            <label htmlFor="includeNumbers" className="text-gray-700">
              Include Numbers
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="includeSpecialChars"
              checked={includeSpecialChars}
              onChange={() => {
                setIncludeSpecialChars(
                  (includeSpecialChars) => !includeSpecialChars
                );
              }}
              className="mr-2"
            />
            <label htmlFor="includeSpecialChars" className="text-gray-700">
              Include Special Characters
            </label>
          </div>
          <p className="text-gray-500">
            Adjust the slider to set password length
          </p>
        </div>
      </div>
    </div>
  );
}
