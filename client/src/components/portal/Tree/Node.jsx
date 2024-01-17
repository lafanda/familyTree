import React, { useState } from 'react';

const Node = ({ nodeData }) => {
    const [showAttributes, setShowAttributes] = useState(false);

    const toggleAttributes = () => {
        setShowAttributes(!showAttributes);
    };

    return (
        <g>
            <circle onClick={toggleAttributes} r={10} fill="#888" />

            {showAttributes && (
                <text x={20} dy={25}>
                  bingus
                </text>
            )}
            {/* Add other attributes here */}
        </g>
    );
};

export default Node;
