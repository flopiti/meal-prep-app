import { motion } from 'framer-motion';
import styles from '../styles/ScheduledMealBox.module.css';
import Image from 'next/image'

const ScheduledMealBox = ({mealName, iconUrl}: any) => {
    return(
        <motion.div 
        className={styles.mealChoice}
        animate={{ backgroundColor: "#28afb0", scale: [0.25, 1] }}
        transition={{ duration: .5, type : "spring", stiffness: 200}}
        >
            <div>
                {mealName }
            </div>
            <motion.div
                className={styles.mealIcon}
                initial={{ y: 150 }}
                animate={{ y: [150,5], rotate: [0, 360]                          
                }
            }   transition={{delay:.25, duration: .5, stiffness: 100}}
            >
                {iconUrl ?  <Image src={iconUrl} alt="food" width={64} height={64} /> : <span></span>}
            </motion.div>
        </motion.div>
    )
}

export default ScheduledMealBox;