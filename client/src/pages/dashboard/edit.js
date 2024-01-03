import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import NavBar from './navbar';
import { useParams } from 'react-router-dom';


const Edit = () => {
    const { id } = useParams();
    const [name, setName] = useState(' '); // initial input fields
    const [cards, setTerms] = useState([{ term: '', def: '' }]);
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [sets, funcSets] = useState([]);
    const [username, setUsername] = useState('');

    const handleEdit = async () => { // when create button is clicked
        try {
            const response = await axios.post(`http://ec2-18-216-254-218.us-east-2.compute.amazonaws.com:3001/auth/editSet`, {
                name,
                cards,
            });
            console.log(response.data);
            // if set is created, redirect user to study page
            navigate(`/dashboard`);
        } catch (error) {
            console.error('Cannot edit set:', error.message);
        }
    };
    const addTerm = () => {
        // '...' create a copy of existing card array 
        // a new object { term: '', definition: '' } will be added to the end of the copied array
        setTerms([...cards, { term: '', def: '' }]);
    };
    const handleTermChange = (index, field, value) => {
        const updatedTerms = [...cards];
        // modify copied array  
        updatedTerms[index][field] = value;
        setTerms(updatedTerms);
    };

    return (
        <>
            <NavBar />
            <div style={titlestyle}>
                <h1>Edit this set</h1>
                <input type="text" placeholder="Title" onChange={(e) => setName(e.target.value)} />
            </div>
            <Button variant="outline-dark" onClick={addTerm} style={{ position: 'fixed', right: '60px' }}>Add term</Button>
            {cards.map((term, index) => ( // iterate through card array
                <div key={index} style={pagestyle}>
                    <input // for term side
                        type="text"
                        placeholder={`Term ${index + 1}`}
                        value={term.term}
                        onChange={(e) => handleTermChange(index, 'term', e.target.value)}
                        style={inputstyle}
                    />
                    <input // for defintion side
                        type="text"
                        placeholder={`Definition ${index + 1}`}
                        value={term.def}
                        onChange={(e) => handleTermChange(index, 'def', e.target.value)}
                        style={inputstyle}
                    />
                </div>
            ))}
            <Button variant="outline-warning" onClick={handleEdit} style={{ position: 'relative', left: '81rem', marginBottom: '5rem' }}>Edit</Button>
        </>
    );
};

const pagestyle = {
    width: '800px',
    height: '250px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
};

const inputstyle = {
    width: '100%',
    padding: '10px',
    margin: '8px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '2rem',
};

const titlestyle = {
    textAlign: 'center',
    width: '50%',
    marginTop: '3rem',
    margin: '3rem auto',
};

export default Edit;