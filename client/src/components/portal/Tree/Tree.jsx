import React from 'react';
import Node from "./Node";
import Draggable from "react-draggable";
function Tree() {
    return (
        <Draggable className={"Tree"}>
            <Node></Node>
        </Draggable>
    );
}

export default Tree;