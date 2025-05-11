import { useState } from "react";
import axios from "axios";

const API = "http://localhost:3001/bfhl";

export default function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsed = JSON.parse(input);
      const res = await axios.post(API, parsed);
      setData(res.data);
    } catch (err) {
      alert("Invalid JSON format");
    }
  };

  const handleSelect = (e) => {
    const options = [...e.target.options];
    const selectedValues = options.filter(opt => opt.selected).map(opt => opt.value);
    setSelected(selectedValues);
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">BFHL Frontend</h1>
      <textarea
        className="w-full p-2 border"
        rows={6}
        placeholder='Enter JSON: { "data": ["A", "1", "z"], "file_b64": "..." }'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2">
        Submit
      </button>

      {data && (
        <>
          <select multiple onChange={handleSelect} className="w-full border p-2">
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
          </select>

          <div className="mt-4 bg-gray-100 p-4 rounded">
            {selected.map((key) => (
              <p key={key}>
                <strong>{key}:</strong> {JSON.stringify(data[key])}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}