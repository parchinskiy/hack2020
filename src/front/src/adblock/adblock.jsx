import React from 'react';

import styles from './adblock.module.css';
import logo from '../img/logo.png'

const AdBlock = ({ name, imageUrl, desc }) => {

    return(
        <div className={styles.recomendBlockWrapper}>
            <div className={styles.recomendBlock}>

                <p className={styles.recomendBlockTitle}>Подборки книг <br/><strong>специально для тебя</strong></p>
                <div className={styles.booksBlock}>
                    <div className={styles.bookItem}>
                        <img src="https://cv3.litres.ru/pub/c/elektronnaya-kniga/cover_415/57290936-viktor-pelevin-nepobedimoe-solnce-kniga-2.jpg" alt=""/>
                    </div>
                    <div className={styles.bookItem}>
                        <img src="https://cv7.litres.ru/pub/c/elektronnaya-kniga/cover_415/4236675-ayn-rend-atlant-raspravil-plechi.jpg" alt=""/>
                    </div>
                    <div className={styles.bookItem}>
                        <img src="https://cv2.litres.ru/pub/c/elektronnaya-kniga/cover_415/62194227-u-nesbe-korolevstvo.jpg" alt=""/>
                    </div>
                    <div className={styles.bookItem}>
                        <img src="https://cv7.litres.ru/pub/c/elektronnaya-kniga/cover_415/2548775-marina-stepnova-zhenschiny-lazarya.jpg" alt=""/>
                    </div>
                </div>
                <div className={styles.moreButton}><strong>О персональных рекомендациях</strong></div>
            </div>
        </div>

    )

};

export default AdBlock
