import { useState } from "react";
import "./counterapp.css";

function Counter() {
    const [counter, setCounter] = useState(0);

    function increase() {
        setCounter(counter + 1);
    }

    function decrease() {
        setCounter(counter - 1);
    }

    function reset() {
        setCounter(0);
    }

    return (
        <div className="container">
            <h1>Counter App</h1>

            <h2>{counter}</h2>

            <button onClick={increase}>+1</button>
            <button onClick={reset}>Reset</button>
            <button onClick={decrease}>-1</button>
        </div>
    );
}

export default Counter;