import {useState} from 'react'
import {motion, AnimatePresence, scale} from "framer-motion";

import './App.css'
import Home from './components/Home.jsx'
import Stack from './components/Stack.jsx'
import Queue from './components/Queue.jsx'
import Deque from './components/Deque.jsx'

// All color values correlating with the DaisyUI theme
export const colors = {
    primary: "#3abdf7",
    secondary: "#727cdd",
    success: "#2fd4bf",
    error: "#fb7085",
    white: "#e5e7eb"
};

// Classes have to have const input (for TcButton)
const btnColors = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    success: "btn-success",
    warning: "btn-warning",
    error: "btn-error",
};

export function TcButton({text, tc, color, onClick, disabled = false}) {
    return (
        <motion.button
            // whileHover={{ scale: 1.05 }} // Breaks DaisyUI btn press animation
            // transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={onClick}
            disabled={disabled}
            className={`btn ${btnColors[color]} relative flex flex-col flex-wrap items-center pb-3`}
        >
            <span className="text-base fw-bold">{text}</span>
            <span className="absolute bottom-1 text-[0.7em] font-mono">{tc}</span>
        </motion.button>
    );
}

export default function App() {
    const [mode, setMode] = useState(0);
    const [reset, setReset] = useState(false);

    const renderDS = () => {
        switch (mode) {
            case 0:
                return <Home/>;
            case 1:
                return <Stack resetKey={reset}/>;
            case 2:
                return <Queue resetKey={reset}/>;
            case 3:
                return <Deque resetKey={reset}/>;
            // case 4: return <??? resetKey={reset}/>;
            default:
                return <h2>Work in progress...</h2>;
        }
    };

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <a onClick={() => {
                        setMode(0)
                    }} className="btn btn-ghost flex flex-col items-start text-xl">
                        <span className="text-primary font-bold text-xl leading-tight">DS Visualizer</span>
                        <span className="text-[10px] opacity-70 -mt-2">by Jason Sun</span>
                    </a>
                </div>
                <div className="navbar-center lg:flex">
                    <select value={mode} onChange={(e) => setMode(Number(e.target.value))}
                            className="select select-primary">
                        <option value={0} disabled>Select</option>
                        <option value={1}>Stack</option>
                        <option value={2}>Queue</option>
                        <option value={3}>Deque</option>
                        {/*<option value={4}>???</option>*/}
                    </select>
                </div>
                <div className="navbar-end">
                    <a className="btn btn-secondary" onClick={() => setReset(prev => !prev)}>Reset</a>
                </div>
            </div>

            <div className="min-h-screen bg-base-300 px-7">
                {renderDS()}
            </div>
        </div>
    )
}
