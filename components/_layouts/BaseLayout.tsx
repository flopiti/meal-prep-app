//make a baseLayout component

import React from "react";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import { motion } from "framer-motion";

const BaseLayout = ({ children } : any) => {
    return (
            <div className={styles.main}>
                <ProfileIcon name={""} picture={""} />
                {children}
            </div>
            );
    };

export default BaseLayout;