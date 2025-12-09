import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuid } from "uuid";
import { colors, TcButton } from "../App.jsx";

export default function Deque({ resetKey }) {
    const [deque, setDeque] = useState([]);
    const [input, setInput] = useState("");
    const [leftValue, setLeftValue] = useState("None");
    const [rightValue, setRightValue] = useState("None");

    // Reset current page
    useEffect(() => {
        setDeque([]);
        setInput("");
        setLeftValue("None");
        setRightValue("None");
    }, [resetKey]);

    return (
        <div className="p-6">
            {/* Operations */}
            <div className="divider divider-primary text-primary">Operations</div>

            <div className="my-4 flex items-center gap-6">
                {/* Find Left */}
                <div className="flex items-center gap-2">
                    <TcButton
                        color="primary"
                        text="Find Left"
                        tc="O(1)"
                        onClick={() => {
                            if (!deque.length) setLeftValue("Error");
                            else setLeftValue(deque[0]?.value);
                        }}
                    />
                    <span>
                        Left:
                        <span className="badge badge-primary ml-2">{leftValue}</span>
                    </span>
                </div>

                {/* Find Right */}
                <div className="flex items-center gap-2">
                    <TcButton
                        color="primary"
                        text="Find Right"
                        tc="O(1)"
                        onClick={() => {
                            if (!deque.length) setRightValue("Error");
                            else setRightValue(deque.at(-1)?.value);
                        }}
                    />
                    <span>
                        Right:
                        <span className="badge badge-primary ml-2">{rightValue}</span>
                    </span>
                </div>
            </div>

            {/* Push and Pop */}
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
                    text="Push Left"
                    tc="O(1)"
                    onClick={() => {
                        if (!input) return;
                        setDeque(prev => [{ id: uuid(), value: input }, ...prev]);
                        setInput("");
                    }}
                />

                <TcButton
                    color="success"
                    text="Push Right"
                    tc="O(1)"
                    onClick={() => {
                        if (!input) return;
                        setDeque(prev => [...prev, { id: uuid(), value: input }]);
                        setInput("");
                    }}
                />

                <TcButton
                    color="error"
                    text="Pop Left"
                    tc="O(1)"
                    onClick={() => {
                        setDeque(prev => prev.slice(1));
                    }}
                    disabled={deque.length === 0}
                />

                <TcButton
                    color="error"
                    text="Pop Right"
                    tc="O(1)"
                    onClick={() => {
                        setDeque(prev => prev.slice(0, prev.length - 1));
                    }}
                    disabled={deque.length === 0}
                />
            </div>

            {/* Display */}
            <div className="divider divider-secondary text-secondary my-10">
                Visualization
            </div>

            {deque.length === 0 && (
                <h2 className="text-center pt-4 italic">The deque is empty</h2>
            )}

            <ul className="flex flex-col items-center gap-2">
                <AnimatePresence>
                    {deque.map(item => {
                        const isLeft = deque[0]?.id === item.id;
                        const isRight = deque[deque.length - 1]?.id === item.id;

                        return (
                            <motion.li
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 10, borderColor: colors.white }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    borderColor:
                                        isLeft || isRight ? colors.primary : colors.white,
                                }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="border rounded-lg p-3 text-center bg-base-200 shadow relative"
                            >
                                {/* Left label */}
                                <AnimatePresence>
                                    {isLeft && (
                                        <motion.span
                                            key="left"
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-primary"
                                        >
                                            Left
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {item.value}

                                {/* Right label */}
                                <AnimatePresence>
                                    {isRight && (
                                        <motion.span
                                            key="right"
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 5 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-primary"
                                        >
                                            Right
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.li>
                        );
                    })}
                </AnimatePresence>
            </ul>
        </div>
    );
}
