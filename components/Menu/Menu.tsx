import { motion } from "framer-motion";
import styles from "./Menu.module.css";
const Menu = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 1 }}
        className={styles.menu}
      >
        <ul>
          <li>Profile</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </motion.div>
    );
  };

export default Menu