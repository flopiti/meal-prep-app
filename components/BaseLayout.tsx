//make a baseLayout component

import React from "react";
import styles from "@/styles/Home.module.css";
import Image from "next/image";

const BaseLayout = ({ children } : any) => {
    return (
            <div className={styles.main}>
                <div className={styles.title}>
                        <span>
                            MeMeals 5
                        </span>
                        <Image         
                            className={styles.mainLogo} 
                            src="/memeals.png"
                            alt="Picture of the author"
                            width={50}
                            height={50}
                        />          
                </div>
                {children}
            </div>
            );
    };

export default BaseLayout;