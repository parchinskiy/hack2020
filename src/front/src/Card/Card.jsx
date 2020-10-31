import React from 'react';

import styles from './Card.module.css';

const Card = ({ name, imageUrl, desc }) => {
    return (<div className={styles.Card}>
        <img alt={desc} className={styles.cardImage} src={imageUrl} />
        <div className={styles.cardDesc}>{desc}</div>
        <h2>{name}</h2>
    </div>)
};

export default Card;