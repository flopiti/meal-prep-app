import React from 'react';
import styles from '../styles/Home.module.css';

export const DropZone = (props:any) => {
    const handleDrop = (event:any) => {
      event.preventDefault();
      const data = event.dataTransfer.getData('text/plain');
      props.onDrop(data);
    };
  
    const handleDragOver = (event:any) => {
      event.preventDefault();
    };
  
    return (
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={styles.mealChoice}      >
        {props.children}
      </div>
    );
  }