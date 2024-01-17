import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PortalStyles.css';
import TreePortal from "./TreePortal";
import Popup from 'reactjs-popup';
import axios from 'axios';
import tree from "./Tree/Tree";

function Portal() {
    const { userId } = useParams();
    const [treeName, setTreeName] = useState("");
    const [trees, setTrees] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control the popup visibility
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [deathday, setDeathday] = useState("");
    const [deceased, setDeceased] = useState(false);
    const [treeId, setTreeId] = useState(null);
    useEffect(() => {
        const fetchTrees = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/portal?userId=${userId}`);
                setTrees(response.data); // Use response.data to get the actual trees array
            } catch (error) {
                console.error('Error fetching trees', error);
            }
        };
        fetchTrees();
    }, [userId]);

    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/portal", {
                familyName: treeName,
                id: userId,
            });
            if (response.status === 200) {
                setTreeId(response.data._id)
                setIsPopupOpen(true); // Open the popup on successful submission
            }
        } catch (err) {
            alert(err);
        }
    }

    async function handleFirstPersonSubmit(ev) {
        ev.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/member', {
                treeId: treeId,
                name: name,
                attributes: {
                    deceased: deceased,
                    birthday: birthday,
                    dayOfDeath: deathday,
                },
                children: []
            });
            if (response.status === 201) {
                window.location.reload();
            }
        } catch (err) {
            alert(`Error: ${err.response?.data.message || 'An unknown error occurred'}`);
        }
        setIsPopupOpen(false);
    }

    const handleCheckboxChange = (event) => {
        setDeceased(event.target.checked);
    };

    return (
        <div className={"container portalContainer"}>
            <h1>Browse your Trees</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder={'Family Name'}
                    value={treeName}
                    onChange={ev => setTreeName(ev.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            <div className={'row'}>
                <div className={'col-md-6'}>
                    <h3>Your Trees</h3>
                    {trees.length > 0 && trees.map(tree => (
                        <TreePortal key={tree._id} tree={tree} />
                    ))}

                </div>
            </div>

            <Popup className = "Popup" open={isPopupOpen} closeOnDocumentClick onClose={() => setIsPopupOpen(false)}>
                <div className="popup-content">
                    <h3>Add First Person</h3>
                    <form onSubmit={handleFirstPersonSubmit}>
                        <input type="text" placeholder="Name" value={name} onChange={ev => setName(ev.target.value)}/>
                        <input type="checkbox" checked={deceased} onChange={handleCheckboxChange}/>
                        <input type="text" placeholder="Birthday" value={birthday}
                               onChange={ev => setBirthday(ev.target.value)}/>
                        <input type="text" placeholder="DeathDay" value={deathday}
                               onChange={ev => setDeathday(ev.target.value)}/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </Popup>
        </div>
    );
}

export default Portal;
