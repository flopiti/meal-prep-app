import styles from './ProfileIcon.module.css'
import { motion } from "framer-motion";
import Image from "next/image";
interface ProfileIconProps  {  
    name: string;
    picture: string;    
}

const ProfileIcon = ({ name, picture}: ProfileIconProps) => {
    return (
        <motion.div className={styles.profileBox}
            whileHover={{ scale: 1.1 }}
            >
            <Image src={'/cool_cat.png'} alt={''} width={70} height={50}/>
        </motion.div>
    )
}

export default ProfileIcon