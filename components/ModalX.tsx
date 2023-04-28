import React, { EventHandler } from 'react';
import styles from '../styles/Modal.module.css';

const ModalX = ({ open , setOpen, children}:any) => {

  const onClose = () => {
      setOpen(false);
  };

return (
    <>
      {open && (
        <div className={styles.container}>
          <div className={styles.backdrop}></div>
          <dialog id="dialog" className={styles.dialog} open={open}>
            {children}
            <button onClick={onClose} aria-label="close" className={styles.x}>
              ❌
            </button>
          </dialog>
        </div>
      )}
    </>
    );
};


export default ModalX;
