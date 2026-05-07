import { motion } from "framer-motion"

const sectionVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
}

function AnimatedSection({ children, className }) {

    return (
        <motion.section
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariant}
        >
            {children}
        </motion.section>
    )
}

export default AnimatedSection