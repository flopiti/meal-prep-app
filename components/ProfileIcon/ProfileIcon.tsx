import { motion ,AnimatePresence} from "framer-motion";
import styles from "./ProfileIcon.module.css";
import Image from 'next/image'
import Menu from "../Menu/Menu";
import { useState } from "react";

interface ProfileIconProps {
    name: string;
    picture: string;
    }


const ProfileIcon = ({ name, picture }: ProfileIconProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [timeoutId, setTimeoutId] = useState<any>(null);

    const handleMouseEnter = () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
          setTimeoutId(null);
        }
        console.log('yup')
        setIsHovered(true);
      };
    
      const handleMouseLeave = () => {
        const id = setTimeout(() => {
          setIsHovered(false);
        }, 500); // Adjust the delay (in milliseconds) as needed
        setTimeoutId(id);
      };
    
  
    return (
        <>
        <motion.div
        className={styles.profileBox}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.1 }}
        >
            <Image src={'/cool_cat.png'} alt={''} width={70} height={50} className={styles.profileImage}/>
        </motion.div>
      {
        isHovered && <div         
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ><Menu /></div>
      }
        </>
    );
  };
  export default ProfileIcon;