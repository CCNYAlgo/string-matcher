import React from "react";

function RabinKarp(props) 
{
    let startTime;
    let endTime;

    let q = 101; // prime number
    let d = 256; // number of characters in the input alphabet

    function search(txt, pat, q) 
    {
        startTime = 0;
        endTime = 0;
        startTime = performance.now();

        let M = pat.length;
        let N = txt.length;
        let i;
        let shifts = [];

        // preprocessing
        let p = 0;
        let t = 0;
        let h = 1;

        for (i = 0;  i < M - 1; i++){
            h = (h * d) % q; // pow(d, M-1) % q
        }
        
        for (i = 0; i < M; i++) {
            p = (d * p + pat.charCodeAt(i)) % q;  // hash of pattern
            t = (d * t + txt.charCodeAt(i)) % q;  // hash of first text window
        }

        // matching
        for (i = 0; i <= N - M; i++) {
            // Checks if the hash values are equal
            if (p === t) {
                let j;
                // if equal then uses Naive Algorithm to match the characters
                for (j = 0; j < M; j++) {
                    if (txt[i + j] !== pat[j])
                        break;
                }
                if (j === M)
                    shifts.push(i);
            }

            // Calculates the hash value for the next window of the text
            if (i < N - M) {
                t = (d * (t - txt.charCodeAt(i) * h) + txt.charCodeAt(i + M)) % q;

                // Converts to positive if hash is negative
                if (t < 0)
                    t = (t + q);
            }
        }
        endTime = performance.now();

        return shifts;
    }

    let txt = props.text;
    let pat = props.pattern;
    let patLen = pat.length;
    let indices = search(txt, pat, q);
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
            {/* <p>Pattern found at indices: </p>
            {indices.join(", ")}
            <br></br>
            <br></br>
            {substrings.map((elem, i) => {
                if(i % 2 !== 0) return <mark><b>{elem}</b></mark>
                return elem
            })}
            <br></br>
            <br></br> */}
            <p>It took {endTime - startTime} ms to complete using Rabin-Karp Algorithm</p>
        </div>
    );
}

export default RabinKarp;