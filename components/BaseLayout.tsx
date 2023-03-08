//make a baseLayout component

import React from "react";
import styles from "@/styles/Home.module.css";

const BaseLayout = ({ children } : any) => {
    return (
            <div className={styles.main}>
                {children}
            </div>
            );
    };

export default BaseLayout;