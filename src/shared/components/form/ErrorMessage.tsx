import { motion, AnimatePresence } from "framer-motion";

type ErrorMsgProps = {
    error: string | undefined;
};

export default function ErrorMsg({ error }: ErrorMsgProps) {
    const animation = {
        hidden: { y: -10, opacity: 0 },
        visible: { y: 0, opacity: 1 },
        exit: { opacity: 0 },
    };
    return (
        <AnimatePresence initial={false} mode={"sync"}>
            {error && <motion.p
                variants={animation}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-red-500 font-semibold text-sm"
            >
                {error}
            </motion.p>}
        </AnimatePresence>
    );
}