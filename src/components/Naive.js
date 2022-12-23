import React from "react";

function Naive(props){

    let startTime = 0;
    let endTime = 0;

    // Javascript program for Naive Pattern Searching

    function search(txt, pat)
    {

        let M = pat.length;
        let N = txt.length;
        let shifts = [];

        /* A loop to slide pat one by one */
        for (let i = 0; i <= N - M; i++) {
            let j;

            /* For current index i, check for pattern
            match */
            for (j = 0; j < M; j++)
                if (txt[i + j] !== pat[j])
                    break;

            // if pat[0...M-1] = txt[i, i+1, ...i+M-1]
            if (j === M)
                shifts.push(i);
        }

        return shifts;
    }

    let txt = props.text;
    let pat = props.pattern;
    let patLen = pat.length;

    startTime = performance.now();
    let indices = search(txt, pat);
    endTime = performance.now();

    let substrings = [];
    let index = indices[0];

    substrings.push(txt.substring(0, index));
    substrings.push(txt.substring(index, index + patLen));
    for(let i = 1; i < indices.length; i++){
        index = indices[i];
        let prev = indices[i-1] + patLen;

        substrings.push(txt.substring(prev, index));
        substrings.push(txt.substring(index, index + patLen));
    }

    index = indices[indices.length - 1] + patLen;
    substrings.push(txt.substring(index, txt.length));

    return(
        <div>
            <p className="results-title">Pattern found at indices: </p>
            {indices.join(", ")}
            <br></br>
            <br></br>
            {substrings.map((elem, i) => {
                if(i % 2 !== 0) return <mark key={i}><b>{elem}</b></mark>
                return <span key={i}>{elem}</span>
            })}
            <br></br>
            <br></br>
            <p>It took {1/(endTime - startTime)} ms to complete using Naive Algorithm</p>
        </div>
    );
}

export default Naive;