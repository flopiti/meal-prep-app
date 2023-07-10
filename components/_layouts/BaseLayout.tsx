import React from "react";
import styles from "@/styles/Home.module.css";
import ProfileIcon from "../ProfileIcon/ProfileIcon";

const BaseLayout = ({ children } : any) => {
    return (
            <div className={styles.main}>
                <ProfileIcon name={""} picture={""} />
                {children}
            </div>
            );
    };

export default BaseLayout;