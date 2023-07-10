import Calendar from "../Calendar";
import styles from "../../styles/WebApp.module.css";

interface WebAppProps {
}

const WebApp = ({}:WebAppProps) => (
    <div className={styles.flexMain}>
        <Calendar/>
    </div>
);

export default WebApp;