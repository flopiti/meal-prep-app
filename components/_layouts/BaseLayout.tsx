import styles from "@/styles/Home.module.css";
import ProfileIcon from "../ProfileIcon/ProfileIcon";

interface BaseLayoutProps {
    children: React.ReactNode;
}

const BaseLayout = ({ children } : BaseLayoutProps) => {
    return (
            <div className={styles.main}>
                <ProfileIcon name={""} picture={""} />
                {children}
            </div>
            );
    };

export default BaseLayout;