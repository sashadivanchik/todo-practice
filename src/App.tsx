import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);


  return (
    <div className="App">
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>increment</button>
      <button onClick={() => setCount(count - 1)}>decrement</button>
    </div>
  );
}

export default App;
