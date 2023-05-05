import styles from '../styles/XButton.module.css';

export interface XButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

const XButton = (props: XButtonProps) => {
    const { children, ...rest } = props;
    return <button className={styles.button}{...rest}>{children}</button>;
}

export default XButton;