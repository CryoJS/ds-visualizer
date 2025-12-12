import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuid } from "uuid";
import { colors, TcButton } from "../App.jsx";

export default function Queue({ resetKey }) {
    const [queue, setQueue] = useState([]);
    const [input, setInput] = useState("");
    const [frontValue, setFrontValue] = useState("None");

    // Reset current page
    useEffect(() => {
        setQueue([]);
        setInput("");
        setFrontValue("None");
    }, [resetKey]);

    return (
        <div className="p-6">
            {/* Operations */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="divider divider-primary text-primary">Operations</div>

                <div className="my-4 flex items-center gap-4">
                    <TcButton
                        color="primary"
                        text="Find Front"
                        tc="O(1)"
                        onClick={() => {
                            if (!queue.length) setFrontValue("Error");
                            else setFrontValue(queue[0]?.value);
                        }}
                    />
                    <span className="ml-2">
                        Front Element:
                        <span className="badge badge-primary ml-2">{frontValue}</span>
                    </span>
                </div>

                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Enter value"
                        className="input input-bordered w-full max-w-xs"
                    />

                    <TcButton
                        color="success"
                        text="Push"
                        tc="O(1)"
                        onClick={() => {
                            if (!input) return;
                            setQueue(prev => [...prev, { id: uuid(), value: input }]);
                            setInput("");
                        }}
                    />

                    <TcButton
                        color="error"
                        text="Pop"
                        tc="O(1)"
                        onClick={() => {
                            setQueue(prev => prev.slice(1));
                        }}
                        disabled={queue.length === 0}
                    />
                </div>
            </motion.div>

            {/* Display */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <div className="divider divider-secondary text-secondary my-10">
                    Visualization
                </div>

                {queue.length === 0 && (
                    <h2 className="text-center pt-4 italic">The queue is empty</h2>
                )}

                <ul className="flex flex-col items-center gap-2">
                    <AnimatePresence>
                        {queue.map((item) => {
                            const isFront = queue[0]?.id === item.id;
                            const isBack = queue[queue.length - 1]?.id === item.id;

                            return (
                                <motion.li
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 10, borderColor: colors.white }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        borderColor: isFront || isBack ? colors.primary : colors.white,
                                    }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="border rounded-lg p-3 text-center bg-base-200 shadow relative"
                                >
                                    {/* Front label */}
                                    <AnimatePresence>
                                        {isFront && (
                                            <motion.span
                                                key="front"
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
                                                transition={{ duration: 0.3 }}
                                                className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-primary"
                                            >
                                                Front
                                            </motion.span>
                                        )}
                                    </AnimatePresence>

                                    {item.value}

                                    {/* Back label */}
                                    <AnimatePresence>
                                        {isBack && (
                                            <motion.span
                                                key="back"
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 5 }}
                                                transition={{ duration: 0.3 }}
                                                className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-primary"
                                            >
                                                Back
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.li>
                            );
                        })}
                    </AnimatePresence>
                </ul>
            </motion.div>
        </div>
    );
}
