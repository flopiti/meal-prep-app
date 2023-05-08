//make a baseLayout component

import React from "react";
import styles from "@/styles/Home.module.css";
import Image from "next/image";

const BaseLayout = ({ children } : any) => {
    return (
            <div className={styles.main}>
                {children}
            </div>
            );
    };

export default BaseLayout;