import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './navbar';
import Spinner from 'react-bootstrap/Spinner';
import ReactCardFlip from 'react-card-flip';
import CardDisplay from './stylecard';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

class Study extends Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false,
      cardData: [],
      showDeleteModal: false,
    };
  }

  componentDidMount() {
    // const { id } = this.props.match.params;
    // const { username } = this.props; refer to bottom code for guidance?
    axios
      .get(`http://ec2-18-216-254-218.us-east-2.compute.amazonaws.com:3001/auth/set`)
      .then(response => {
        this.setState({ cardData: response.data.set });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  handleClick = e => {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  };

  handleEdit = () => {
    const navigate = this.props.navigate; // Access navigate from the props
    navigate('/edit');
  };

  handleDelete = async () => {
    try {
      await axios.post(
        `http://ec2-18-216-254-218.us-east-2.compute.amazonaws.com:3001/auth/deleteSet`
      );
      console.log('Set deleted successfully');
      const navigate = this.props.navigate;
      navigate('/dashboard');
    } catch (error) {
      console.error('Cannot delete set:', error);
      // Handle error, show an error message, etc.
    }
  };

  render() {
    const { cardData } = this.state;
    return (
      <>
        <NavBar />
         {/* <NavBar content={username}></NavBar>  */}
        <span style={{ margin: '0 10px' }}> </span>
        <Button variant="warning" onClick={this.handleEdit}>
          Edit
        </Button>
        <Button variant="outline-warning" onClick={() => this.handleDelete()}>
          Delete
        </Button>
        {cardData ? (
          cardData.map((card, index) => (
            <ReactCardFlip key={index} isFlipped={this.state.isFlipped} flipDirection="vertical">
              <CardDisplay onClick={this.handleClick} content={<div>{card.term}</div>} />
              <CardDisplay onClick={this.handleClick} content={<div>{card.def}</div>} />
            </ReactCardFlip>
          ))
        ) : (
          <Spinner animation="border" variant="warning" />
        )}
      </>
    );
  }
}

export default function StudyWrapper(props) {
  const navigate = useNavigate();
  return <Study {...props} navigate={navigate} />;
}
