import React from 'react'

import defaultUser from '../../assets/icons/default-user.svg'

import './contacts.scss';

function Contacts({item}) {

    const elemForRender = {};

    let currentLetter = '';

    item.sort((a, b) => {
        if (a.name[0] > b.name[0]) {
            return 1;
        } else if (a.name[0] < b.name[0]) {
            return -1;
        } else {
            return 0;
        }
    })

    item.forEach((contact, index) => {
        if (currentLetter === '' || contact.name[0] !== currentLetter) {
            currentLetter = contact.name[0];
            elemForRender[currentLetter] = [];
        }
        if (contact.name[0] === currentLetter) {
            elemForRender[currentLetter].push(<div className="contacts__item" key={`${index}.${contact.phone}`} onClick={() => console.log(`${index}.${contact.phone}`)}>
                <div className="contacts__avatar">
                    <img className="contacts__avatar-image" src={defaultUser} alt="avatar." width="25" height="30" />
                </div>
                <div className="contacts__item-information">
                    <p className="phone" title={contact.phone}>
                        {contact.phone}
                    </p>
                    <p className="name" title={contact.name}>
                        {contact.name}
                    </p>
                </div>
            </div>)
        }
    })

    return (
        <div className="contacts">
            {Object.entries(elemForRender).map(([letter, elem], index) => (
                <div className="contacts__group" key={`${letter}.${index}`}>
                    <h2 className="contacts__group-title">
                        {letter}
                    </h2>
                    {elem}
                </div>
            ))}
        </div>
    )
}

export default Contacts;
