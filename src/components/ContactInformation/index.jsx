import React from 'react';
import classNames from "classnames";

import "./contactsInformation.scss";
import defaultUser from '../../assets/icons/default-user.svg';

function ContactInformation({isVisible}) {
    return (
        <div className={classNames('contact-information', {
            'hidden': !isVisible
        })}>
            <div className="contact-information__top">
                <div className="contact-information__top-actions">
                    <button className="contact-information__change"></button>
                    <button className="contact-information__close"></button>
                </div>
                <img className="contact-information__top-bg-image" src={defaultUser} alt="Background." />
                <img className="contact-information__top-avatar" src={defaultUser} alt="avatar." />
                <h2 className="contact-information__top-name">Anna Conroy</h2>
            </div>
            <div className="contact-information__middle">
                <div className="main-content__item">
                    <p className="main-content__categorie">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt suscipit facere blanditiis quas provident repudiandae, adipisci enim aliquam atque nobis placeat, nemo voluptates totam velit ab ipsa. Quasi, eveniet cumque!
                    </p>
                    <p className="main-content__value">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti quidem optio eaque vitae deserunt quos reiciendis, magnam quaerat, omnis ad accusantium. Reprehenderit harum error voluptate aliquid accusantium exercitationem esse corrupti.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ContactInformation;
