import React from 'react';
import classNames from "classnames";

import "./formChange.scss";

function FormChange({isVisible}) {
    return (
        <form className={classNames('form-change', {
            'hidden': !isVisible
        })} name="form-change" action="#">
            <div className="form-change__content">
                <div className="main-content__item  form-change__item">
                    <p className="main-content__categorie">
                        Phone:
                    </p>
                    <input className="main-content__value form-change__value" defaultValue="886.619.6235 x12330" type="text" />
                </div>
            </div>
            <div className="form-change__buttons">
                <button className="form-change__save">Save</button>
                <button className="form-change__close">Close</button>
            </div>
        </form>
    )
}

export default FormChange;
