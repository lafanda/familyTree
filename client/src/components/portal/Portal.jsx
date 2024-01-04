import React from 'react';
import { useParams } from 'react-router-dom';
import './PortalStyles.css'
function Portal() {
    const {userId}  = useParams();

    return (
        <div>
            <div>
                <form className={"FamilyNameForm"}>
                    <input className={"FamilyNameInput"} type="text" placeholder={"FamilyName"}/>
                </form>

                <p>{userId}</p>
            </div>
        </div>
    );

}

export default Portal;