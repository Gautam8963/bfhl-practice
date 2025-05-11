import { useState } from "react";
import axios from "axios";

const API = "https://bfhl-practice.onrender.com/bfhl";

export default function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const parsed = JSON.parse(input);
      setError("");
      const res = await axios.post(API, parsed);
      setData(res.data);
    } catch {
      setError("❌ Invalid JSON format. Please check your input.");
      setData(null);
    }
  };

  const handleSelect = (e) => {
    const options = [...e.target.options];
    const selectedValues = options.filter(opt => opt.selected).map(opt => opt.value);
    setSelected(selectedValues);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          CS2025001
        </h1>

        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Enter JSON Input
          </label>
          <textarea
            className="w-full border rounded p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder='e.g. { "data": ["A", "1", "z"], "file_b64": "..." }'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {error && <p className="text-red-500 mt-1">{error}</p>}
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition duration-200"
          >
            Submit
          </button>
        </div>

        {data && (
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Filter Response
              </label>
              <select
                multiple
                onChange={handleSelect}
                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="alphabets">Alphabets</option>
                <option value="numbers">Numbers</option>
                <option value="highest_lowercase_alphabet">
                  Highest Lowercase Alphabet
                </option>
              </select>
            </div>

            <div className="bg-gray-100 p-4 rounded space-y-2">
              {selected.length === 0 ? (
                <p className="text-gray-600">Select filters to view response data.</p>
              ) : (
                selected.map((key) => (
                  <div key={key}>
                    <strong className="text-gray-800">{key}:</strong>{" "}
                    <span className="text-gray-700">{JSON.stringify(data[key])}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}