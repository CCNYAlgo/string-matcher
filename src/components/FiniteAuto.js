import React from "react";

function FiniteAuto(props){

    let startTime = 0;
    let endTime = 0;
    let NO_OF_CHARS = 256;

    function getNextState(pat,M,state,x)
    {
        // If the character c is same as next
        // character in pattern,then simply
        // increment state
        if(state < M && x === pat[state].charCodeAt(0))
            return state + 1;
            
        // ns stores the result which is next state
        let ns, i;

        // ns finally contains the longest prefix
        // which is also suffix in "pat[0..state-1]c"

        // Start from the largest possible value
        // and stop when you find a prefix which
        // is also suffix
        for (ns = state; ns > 0; ns--){
            if (pat[ns-1].charCodeAt(0) === x){
                for (i = 0; i < ns-1; i++)
                    if (pat[i] !== pat[state-ns+1+i])
                        break;
                    if (i === ns-1)
                        return ns;
            }
        }

        return 0;
    }

    /* This function builds the TF table which
        represents Finite Automata for a given pattern */
    function computeTF(pat,M,TF)
    {
        let state, x;
        for (state = 0; state <= M; ++state)
            for (x = 0; x < NO_OF_CHARS; ++x)
                TF[state][x] = getNextState(pat, M, state, x);
    }

    // Driver code
    /* Prints all occurrences of pat in txt */
    function search(pat, txt){

        let M = pat.length;
        let N = txt.length;
        let shifts = [];

        let TF = new Array(M+1);
        for(let i=0;i<M+1;i++){
            TF[i]=new Array(NO_OF_CHARS);
            for(let j=0;j<NO_OF_CHARS;j++)
                TF[i][j]=0;
        }

        computeTF(pat, M, TF);

        // Process txt over FA.
        let i = 0; 
        let state = 0;
        for (i = 0; i < N; i++){
            state = TF[state][txt[i].charCodeAt(0)];
            if (state === M)
                shifts.push(i-M+1);
        }

        return shifts;
    }

    let pat = props.pattern.split("");
    let txt = props.text.split("");

    startTime = performance.now();
    let indices = search(pat, txt);
    endTime = performance.now();

/*
    let patLen = pat.length;
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
*/

    if (indices.length === 0)
        return;
    else {
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
                <p>It took {1/(endTime - startTime)} ms to complete using Finite Automaton Algorithm</p>
            </div>
        );
    }
}

export default FiniteAuto;