import React, {useEffect, useState} from 'react';
import './TreeStyles.css'
import axios from 'axios';
import Node from "./Node";
import {Tree} from "react-d3-tree";

function TreeComponent() {
    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get('id')
    const [childId, setChildId] = useState("")
    const [rootVisable, setRootVisable] = useState(false);
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [deathday, setDeathday] = useState("");
    const [deceased, setDeceased] = useState(false);
    const [treeData, setTreeData] = useState(null);





    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/member', {
                treeId: id,
                name: name,
                attributes: {
                    deceased: deceased,
                    birthday: birthday,
                    dayOfDeath: deathday,
                },
                children: []
            });
            if (response.status === 201) {
                // Handle success logic here
                setRootVisable(false);
                window.location.reload();
            }
        } catch (err) {
            // Improved error handling
            alert(`Error: ${err.response?.data.message || 'An unknown error occurred'}`);
        }
    };


    const handleCheckboxChange = (event) => {
        setDeceased(event.target.checked);
    };

    async function handleChild(ev) {
        ev.preventDefault();
        try {
            alert(childId);
            const response = await axios.post('http://localhost:4000/member/child', {
                memberId: childId,
                name: name,
                attributes: {
                    deceased: deceased,
                    birthday: birthday,
                    dayOfDeath: deathday,
                },
                children: []
            });
            if (response.status === 201) {
                setRootVisable(false);
                window.location.reload();
            }
        } catch (err) {
            alert(`Error: ${err.response?.data.message || 'An unknown error occurred'}`);
        }

    }

    const handleNodeClick = (nodeData) => {
        setChildId(nodeData.data.id)
        setRootVisable(true)
    };

    useEffect(() => {
        const fetchCompleteTree = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/member/${id}`);
                setTreeData(response.data);

            } catch (error) {
                console.error('Error fetching complete tree', error);
            }
        };

        if (id) {
            fetchCompleteTree();
        }
    }, [id]);



    return (
        <div >
            <div className={"Tree"}>

                {treeData && (     <Tree data={treeData}
                                         renderCustomNodeElement={rd3tProps =>

                                             <Node {...rd3tProps} />
                                         }
                                         onNodeClick={handleNodeClick}
                />)}
                {rootVisable && (
                    <form onSubmit={handleChild}>
                        <input type="text" placeholder="Name" value={name} onChange={ev => setName(ev.target.value)}/>
                        <input type="checkbox" checked={deceased} onChange={handleCheckboxChange}/>
                        <input type="text" placeholder="Birthday" value={birthday}
                               onChange={ev => setBirthday(ev.target.value)}/>
                        <input type="text" placeholder="DeathDay" value={deathday}
                               onChange={ev => setDeathday(ev.target.value)}/>
                        <button type="submit">Submit</button>
                    </form>
                )}

            </div>
        </div>
    );
}

export default TreeComponent;