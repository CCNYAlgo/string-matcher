import './App.css';
import React, { useState } from 'react';
import Naive from "./components/Naive";
import RabinKarp from './components/RabinKarp';
import FiniteAuto from './components/FiniteAuto';

function App() {

  const [text, setText] = useState('');
  const [pattern, setPattern] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className='container body'>
        <h1 id="title">Exact String Matcher</h1>
        <br></br>
        <form onSubmit={handleSubmit} className="form">
          <div className="mb-3">
            <label htmlFor="text" className="form-label">Text (Case-sensitive)</label>
            <textarea className="form-control" id="text" placeholder="Enter text here" value={text} onChange={(e) => {setText(e.target.value); setSubmitted(false);}}/>
          </div>
          <div className="mb-3">
            <label htmlFor="pattern" className="form-label">Pattern (Case-sensitive)</label>
            <input type="text" className="form-control" placeholder="Enter pattern here" id="pattern" value={pattern} onChange={(e) => {setPattern(e.target.value); setSubmitted(false);}}/>
          </div>
          <button type="submit" className="btn btn-primary" id="btn-submit">Submit</button>
        </form>
        <br></br>  
        {submitted && <Naive text={text} pattern={pattern} />}
        {submitted && <RabinKarp text={text} pattern={pattern} />}
        {submitted && <FiniteAuto text={text} pattern={pattern} />}
        <br></br>
        {submitted && <p>Runtimes are calculated as an average of 100 runs</p>}
    </div>
  );
}

export default App;
