// user's dashboard
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import NavBar from './navbar';
import { Link, useNavigate } from 'react-router-dom';
import Create from './create';
import Study from "./study";

const DashboardIndex = () => {
  const [sets, funcSets] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch data to display sets 
    axios.get('http://ec2-18-216-254-218.us-east-2.compute.amazonaws.com:3001/auth/index')
      .then(response => {
        console.log('no error');
        const { isAuthenticated, flashcardSets, username } = response.data;
        // Update the state based on the authentication status and flashcard sets
        setIsAuthenticated(isAuthenticated);
        if (isAuthenticated) {
          funcSets(flashcardSets);
          setUsername(username);
        }
      })
      .catch(error => console.error('Error fetching sets:', error));
  }, []); 
  
  // link to create a set page
  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate('/create', {
      state: { isAuthenticated, username },
    });
  };

  return (
    <div>
      <NavBar content={username}></NavBar>  
      {isAuthenticated ? (
        <div style={allcreate}>
          <div style={type}> My Sets
            <span style={{ margin: '0 10px' }}> </span>
            <Button variant="outline-warning" onClick={handleCreateClick}>Create a set</Button>
          </div>
          <div style={createstyle}>
            <hr style={{ width: '100%' }} />
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            {sets.map((set, index) => ( // iterate through array and display user's set
              <Card key={index} style={{ width: '15rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '5vh' }}>
                <Card.Body className="text-center">
                  <Card.Title>{set.setName}</Card.Title>
                  {/* <Link to={`/study/${set.id}`}>Study Set</Link> */}
                  <Card.Link href="/study">Study Set</Card.Link>
                </Card.Body>
              </Card>
            ))}
          </div>
            </div>
        </div>
      ) : (
        <div>
          {navigate('/login')}
        </div>
      )}
    </div>
  );
};

const type = {
  textAlign: 'left',
  marginTop: '4rem',
  marginLeft: '9rem',
  fontSize: '30px',
  fontWeight: 'bold',
}

const allcreate = {
  backgrounColor: '#F0F8FF',

};
const createstyle = {
  position: 'relative',
  width: '75rem',
  height: '70rem',
  margin: '20px auto',
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  backgroundColor: '#FFFFFF',
};

export default DashboardIndex;

