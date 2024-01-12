import React, {useEffect, useState} from 'react';
import './TreeStyles.css'
import axios from 'axios';
import TreePortal from "../TreePortal";
function Tree() {
    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get('id')
    const [childId, setChildId] = useState("")
    const [rootVisable, setRootVisable] = useState(false);
    const [childVisable, setChildVisable] = useState(false);
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [deathday, setDeathday] = useState("");
    const [deceased, setDeceased] = useState(false);
    const [roots, setRoots] = useState([])


    const toggleFormVisibility = () => {
        setRootVisable(true);
    };

    function toggleChildVisibility(childsId){
        setChildId(childsId);
        setChildVisable(true);
    };

    useEffect(() => {
        const fetchRoots = async () => {
            try {
                const root = await axios.get(`http://localhost:4000/member?treeId=${id}`);
                setRoots(root.data);
            } catch (error) {
                console.error('Error fetching trees', error);
            }
        };
        fetchRoots();
    }, [id]);

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

    async function handleChild(ev){
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

    return (
        <div className={"Tree"}>
            <div >
                <button onClick={toggleFormVisibility}>Add Root Member</button>
                {rootVisable && (
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Name" value={name} onChange={ev => setName(ev.target.value)}/>
                        <input type="checkbox" checked={deceased} onChange={handleCheckboxChange}/>
                        <input type="text" placeholder="Birthday" value={birthday}
                               onChange={ev => setBirthday(ev.target.value)}/>
                        <input type="text" placeholder="DeathDay" value={deathday}
                               onChange={ev => setDeathday(ev.target.value)}/>
                        <button type="submit">Submit</button>
                    </form>
                )}
                {roots.length > 0 && roots.map(root => (
                    <p  onClick={() => toggleChildVisibility(root)}>{root}</p>
                ))}

                {childVisable && (
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

export default Tree;