import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './PortalStyles.css';
import TreePortal from "./TreePortal";
import axios from 'axios';

function Portal() {
    const {userId} = useParams();
    const [name, setName] = useState("");
    const [trees, setTrees] = useState([]);

    useEffect(() => {
        const fetchTrees = async () => {
            try {
                const tree = await axios.get('http://localhost:4000/portal');
                setTrees(tree.data); // Use response.data to get the actual trees array
            } catch (error) {
                console.error('Error fetching trees', error);
                // Handle error appropriately
            }
        };

        fetchTrees();
    }, []);
    async function handleSubmit(ev) {
        ev.preventDefault()
        try {
            const response = await axios.post("http://localhost:4000/portal", {
                familyName: name,
                id: userId,
            });
            if (response === 200) {
                alert('success');
            }
        } catch (err) {
            alert(err)
        }

    }



    return (
        <div className={"container"}>
            <h1>Browse your Trees</h1>
            <form action="" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder={'familyName'}
                    value={name}
                    onChange={ev => setName(ev.target.value)}
                />
                <button> Submit</button>
            </form>
            <div className={'row'}>
                <div className={'col-md-6'}>
                    <h3>Your Trees</h3>
                    {trees.length > 0 && trees.map(tree => (
                        <TreePortal key={tree._id} tree={tree} />
                    ))}

                </div>
                <div className={'col-md-6'}>
                    <h3>Shared With You</h3>
                </div>
            </div>

        </div>
    );

}

export default Portal;