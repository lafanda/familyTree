import React from 'react';

function TreePortal({ tree }){
    const currentUrl = window.location.href;
    return (
        <a href={`/${currentUrl}/${tree.FamilyName}`} className={"TreeButton"}>
            <h4>{tree.familyName}</h4>
        </a>
    );
};

export default TreePortal;