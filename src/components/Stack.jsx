import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuid } from "uuid";
import { TcButton, colors } from "../App.jsx";

export default function Stack({ resetKey }) {
    const [stack, setStack] = useState([]);
    const [input, setInput] = useState("");
    const [topValue, setTopValue] = useState("None");

    // Reset current page
    useEffect(() => {
        setStack([]);
        setInput("");
        setTopValue("None");
    }, [resetKey]);

    return (
        <div className = "p-6">
            {/* Operations */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Operations */}
                <div className="divider divider-primary text-primary">Operations</div>

                <div className="my-4 flex items-center gap-4">
                    <TcButton
                        color="primary"
                        text="Find Top"
                        tc="O(1)"
                        onClick={() => {
                            if (!stack.length) setTopValue("Error");
                            else setTopValue(stack.at(-1)?.value);
                        }}
                    />
                    <span className="ml-2">
                        Top Element:
                        <span className="badge badge-primary ml-2">{topValue}</span>
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
                            setStack(prev => [...prev, { id: uuid(), value: input }]);
                            setInput("");
                        }}
                    />

                    <TcButton
                        color="error"
                        text="Pop"
                        tc="O(1)"
                        onClick={() => {
                            setStack(prev => prev.slice(0, prev.length - 1));
                        }}
                        disabled={stack.length === 0}
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

                {stack.length === 0 && (
                    <h2 className="text-center pt-4 italic">The stack is empty</h2>
                )}

                <ul className="flex flex-col items-center gap-2">
                    <AnimatePresence>
                        {stack.slice().reverse().map((item, index) => {
                            const isTop = index === 0;
                            return (
                                <motion.li
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: -10, borderColor: colors.white }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        borderColor: isTop ? colors.primary : colors.white,
                                    }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="border rounded-lg p-3 text-center bg-base-200 shadow relative"
                                >
                                    {/* Top label */}
                                    <AnimatePresence>
                                        {isTop && (
                                            <motion.span
                                                key="top"
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
                                                transition={{ duration: 0.3 }}
                                                className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-primary"
                                            >
                                                Top
                                            </motion.span>
                                        )}
                                    </AnimatePresence>

                                    {item.value}
                                </motion.li>
                            );
                        })}
                    </AnimatePresence>
                </ul>
            </motion.div>
        </div>
    );
}
