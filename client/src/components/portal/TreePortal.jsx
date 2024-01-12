import React from 'react';

function TreePortal({tree}) {
    const currentUrl = window.location.href;
    const userId = localStorage.getItem('userId');
    return (
        <a href={`/portal/${userId}/${tree.familyName}?id=${tree._id}`} className={"TreeButton"}>
            <h4>{tree.familyName}</h4>
        </a>
    );
};

export default TreePortal;