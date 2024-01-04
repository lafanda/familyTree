import React from 'react';

function Numbers() {
        return (
            <div className={"NumbersContainer"}>
                <h1 className={"NumbersHeader"}>Our Numbers</h1>
                <div className={"row"}>
                    <div className={"col-md-4"}>
                        <h1 className={"NumbersSubHeader"}>Users</h1>
                        <h3 className={"Numbers"}>220k</h3>
                    </div>
                    <div className={"col-md-4"}>
                        <h1 className={"NumbersSubHeader"}>Families</h1>
                        <h3 className={"Numbers"}>10.5k</h3>
                    </div>
                    <div className={"col-md-4"}>
                        <h1 className={"NumbersSubHeader"}>People</h1>
                        <h3 className={"Numbers"}>500M</h3>
                    </div>

                </div>
            </div>
        );

}

export default Numbers;