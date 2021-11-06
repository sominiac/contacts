import React from 'react';
import classNames from "classnames";

import "./Placeholder.scss";

function Placeholder({isVisible}) {
    return (
        <div className={classNames('placeholder', {
            'hidden': !isVisible
        })}>
            <div className="placeholder__information">
                <h2 className="placeholder__title">
                    It looks like you haven't selected any contact
                </h2>
                <p className="placeholder__subtitle">
                    Tap on contact to see more information
                </p>
            </div>
        </div>
    )
}

export default Placeholder;
