import { motion } from 'framer-motion';
import styles from './Xbutton.module.css';

export interface XButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

const XButton = (props: XButtonProps) => {
    const { children, ...rest } = props;

    const buttonVariants = {
        initial: { opacity: 0.3 },
        hover: { opacity: 1, rotate: 360 }
    };

    return (
        <motion.button
            className={styles.button}
            initial="initial"
            whileHover="hover"
            variants={buttonVariants}
            {...rest}
        >
            {children}
        </motion.button>
    );
}

export default XButton;
