import { motion } from "framer-motion";
import styles from "./Menu.module.css";
import Link from "next/link";
import { useTranslation } from "react-i18next";
const Menu = () => {

  const {t} = useTranslation('common')

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 1 }}
        className={styles.menu}
      >
        <ul>
          <li><Link href={"/api/auth/logout"}>{t('logout')}</Link></li>
          <li><Link href={"/admin"}>{t('admin')}HE</Link></li>
        </ul>
      </motion.div>
    );
  };

export default Menu