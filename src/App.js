import './App.css';
import React, { useState } from 'react';
import Naive from "./components/Naive";
import RabinKarp from './components/RabinKarp';

function App() {

  const [text, setText] = useState('');
  const [pattern, setPattern] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div>
      <h1 className="container">String Matcher</h1>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="text" className="form-label">Text</label>
            <textarea className="form-control" id="text" value={text} onChange={(e) => {setText(e.target.value); setSubmitted(false);}}/>
          </div>
          <div className="mb-3">
            <label htmlFor="pattern" className="form-label">Pattern</label>
            <input type="text" className="form-control" id="pattern" value={pattern} onChange={(e) => {setPattern(e.target.value); setSubmitted(false);}}/>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>  
        {submitted && <Naive text={text} pattern={pattern} />}
        {submitted && <RabinKarp text={text} pattern={pattern} />}
      </div> 
    </div>
  );
}

export default App;
