import Calendar from "../Calendar";
import styles from "../../styles/WebApp.module.css";

interface WebAppProps {
}

const WebApp = ({}:WebAppProps) => (
    <div className={styles.flexMain}>
        <div style={{display: 'inline-block'}}>
            <Calendar/>
        </div>
    </div>
);

export default WebApp;