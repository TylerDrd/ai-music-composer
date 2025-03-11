import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [mood, setMood] = useState('');
  const [audioSrc, setAudioSrc] = useState(''); // Start empty
  const [loading, setLoading] = useState(false);

  const moods = ['Happy', 'Sad', 'Chill', 'Intense'];

  const handleMoodSelect = async (selectedMood) => {
    setMood(selectedMood);
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/generate?mood=${selectedMood}`);
      setAudioSrc(`http://localhost:5000${response.data.file}`);
    } catch (error) {
      console.error('Error fetching audio:', error);
      setAudioSrc(''); // Reset on error
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>AI Music Composer</h1>
      <div>
        <h2>Pick a Mood</h2>
        {moods.map((m) => (
          <button
            key={m}
            onClick={() => handleMoodSelect(m)}
            disabled={loading}
            style={{
              margin: '5px',
              padding: '10px',
              backgroundColor: mood === m ? '#61dafb' : '#ccc',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {m}
          </button>
        ))}
      </div>
      <div>
        {loading ? (
          <p>Generating...</p>
        ) : (
          audioSrc && ( // Only show this block if audioSrc is set
            <>
              <h3>Generated Track</h3>
              {mood && <p>Selected: {mood}</p>}
              <audio controls src={audioSrc} autoPlay>
                Your browser doesn’t support audio.
              </audio>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default App;