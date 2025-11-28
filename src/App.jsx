import { useState } from 'react'
import './App.css'

import Stack from './components/Stack.jsx'

const btnColors = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    success: "btn-success",
    warning: "btn-warning",
    error: "btn-error",
};

export function TcButton({ text, tc, color, onClick, disabled = false }) {
    return (
        <button onClick={onClick} disabled={disabled} className={`btn ${btnColors[color]} relative flex flex-col items-center pb-3`}>
            <span className="text-base fw-bold">{text}</span>
            <span className="absolute bottom-1 text-[0.7em] font-mono">{tc}</span>
        </button>
    );
}

export default function App() {
    const [mode, setMode] = useState(0);
    const [reset, setReset] = useState(false);

    const renderDS = () => {
        switch(mode) {
            case 0: return <h2>Welcome!</h2>;
            case 1: return <Stack resetKey={reset}/>;
            // case 2: return <Queue />;
            // case 3: return <Deque />;
            default: return <h2>Work in progress...</h2>;
        }
    };

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <a onClick={() => {setMode(0)}} className="btn btn-ghost text-xl">
                        <span className="text-primary font-bold">DS Visualizer</span>
                        by Jason Sun
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <select value={mode} onChange={(e) => setMode(Number(e.target.value))} className="select select-primary">
                        <option value={0} disabled>Select a Data Structure</option>
                        <option value={1}>Stack</option>
                        <option value={2}>Queue</option>
                        <option value={3}>Deque</option>
                    </select>
                </div>
                <div className="navbar-end">
                    <a className="btn btn-secondary" onClick={() => setReset(prev => !prev)}>Reset</a>
                </div>
            </div>

            <div>
                {renderDS()}
            </div>
        </div>
    )
}
