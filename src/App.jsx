import { useState } from 'react'
import './App.css'

function ModeView({ mode }) {
    if (mode === 1) return <h2>Stack</h2>;
    if (mode === 2) return <h2>Queue</h2>;
    if (mode === 3) return <h2>Linked List</h2>;
    return <h2>Loading...</h2>;
}

function App() {
    const [mode, setMode] = useState(0);

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl">DS Visualizer</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <select value={mode} onChange={(e) => setMode(Number(e.target.value))} className="select select-primary">
                        <option value={0} disabled>Pick a data structure</option>
                        <option value={1}>Stack</option>
                        <option value={2}>Queue</option>
                        <option value={3}>Linked List</option>
                    </select>
                </div>
                <div className="navbar-end">
                    <a className="btn btn-secondary">Reset</a>
                </div>
            </div>

            <ModeView mode={mode} />
        </div>
    )
}

export default App
