import { motion } from "framer-motion";

export default function Home() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* Intro */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center my-16"
            >
                <h1 className="text-5xl font-bold text-primary mb-4">
                    DS Visualizer
                </h1>
                <p className="text-lg max-w-2xl mx-auto leading-relaxed">
                    An interactive platform designed to help students, developers, and
                    competitive programmers understand data structures through clear,
                    dynamic, and animated visualizations.
                </p>
            </motion.div>

            {/* Functions */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="my-12"
            >
                <div className="divider text-primary">What You Can Do</div>

                <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <FeatureCard
                        title="Visualize Operations"
                        desc="Watch push, pop, insert, delete, find, and other operations happen step-by-step."
                        icon="📊"
                    />
                    <FeatureCard
                        title="Learn Time Complexity"
                        desc="Every button shows its time complexity, so you learn how efficient each operation is."
                        icon="⏱️"
                    />
                    <FeatureCard
                        title="Explore Structures"
                        desc="Stacks, queues, deques, and much more to be added, all fully animated."
                        icon="🔍"
                    />
                </div>
            </motion.div>

            {/* Usage */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="my-16"
            >
                <div className="divider text-primary">How It Works</div>

                <ul className="list-disc list-inside space-y-3 text-base">
                    <li>Select a data structure from the navbar.</li>
                    <li>Perform operations, with time complexity labelled, using the buttons.</li>
                    <li>See every step animated with Framer Motion.</li>
                    <li>Understand how internal changes happen visually.</li>
                </ul>
            </motion.div>

            {/* Footer / Author */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="text-center mt-20 opacity-70 text-sm"
            >
                Built by <span className="font-semibold">Jason Sun</span> for learning, teaching, and mastering data structures.
            </motion.div>
        </div>
    );
}

function FeatureCard({ title, desc, icon }) {
    return (
        <div className="p-6 rounded-xl bg-base-200 shadow hover:shadow-lg transition">
            <div className="text-4xl mb-3">{icon}</div>
            <h3 className="text-xl font-semibold text-secondary mb-1">{title}</h3>
            <p className="text-sm leading-relaxed">{desc}</p>
        </div>
    );
}
