import React from 'react';

function Landing(){

        return (
            <section>
                <div className={"conatiner LandingBody"}>
                    <div className={"row"}>
                        <div className={"col-md-6 leftSideLanding"}>
                            <h1 className={"HeaderLanding"}>Simple and Intuitive</h1>
                            <p className={"Subheading"}>We're here to help you uncover your roots</p>
                            <div className="download-buttons">
                                <button className="download-btn ios"><i class="fa-brands fa-apple"></i> Download</button>
                                <button className="download-btn android"><i class="fa-brands fa-google-play"></i> Download</button>
                            </div>
                        </div>
                        <div className={"col-md-6 rightSideLanding"}>
                            <img className={"Family"} src="images/familyTree.png" alt=""/>
                        </div>

                    </div>
                </div>

            </section>
        );

}

export default Landing;