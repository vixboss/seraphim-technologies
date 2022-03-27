import React, { useState } from "react";

import aapc from '../../assets/images_web/AAPC1.png';
import ahima from '../../assets/images_web/AHIMA1.png';
import ancc from '../../assets/images_web/ANCC1.png';
import shrm from '../../assets/images_web/SHRM1.png';
import alpha from '../../assets/images_web/APHA.jpg';
import ama from '../../assets/images_web/AMA.png';
import b from '../../assets/images_web/b.png';
import c from '../../assets/images_web/c.png';
import d from '../../assets/images_web/d.png';
import e from '../../assets/images_web/e.png';
import f from '../../assets/images_web/f.png';
import './banner.styles.scss';

const BannerComponent = () => {
    const clientImage = [aapc, ama, ahima, alpha, ancc, shrm];
    const paymentImage = [b, c, d, e, f];

    return(
        <>
            <div className="client-image">
                {
                    clientImage.map((img, index) => {
                        return <img className="bannerImages" src={img} width="190rem" key={`img_${index}`} alt="Nothing To Show"></img>
                    })
                }
            </div>
            <div className="client-image">
                {
                    paymentImage.map((img, index) => {
                        return <img src={img} className="bannerImages" width="190rem" key={`paymentImage_${index}`} alt="Nothing To Show"></img>
                    })
                }
            </div>
        </>
    );
}

export default BannerComponent;