import React from 'react';

import styles from './adblock.module.css';

const AdBlock = ({ name, imageUrl, desc }) => {

    return(
        <div className={styles.recomendBlockWrapper}>
            <div className={styles.recomendBlock}>
                <p>Подборки специально для тебя</p>
            </div>
        </div>

    )

};

export default AdBlock
