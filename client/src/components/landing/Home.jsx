import React from 'react';
import Landing from "./Landing";
import Download from "./Download";
import Numbers from "./Numbers";
import "./LandingStyles.css"
function Home() {
        return (
            <div>
                <Landing></Landing>
                <Download></Download>
                <Numbers></Numbers>
            </div>
        );
}

export default Home;