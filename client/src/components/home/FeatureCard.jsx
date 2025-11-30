// Sources:
// https://react-bootstrap.github.io/docs/components/cards/
// https://www.geeksforgeeks.org/reactjs/how-to-map-data-into-components-using-reactjs/

import React from 'react';
import Card from 'react-bootstrap/Card';
import '../../styles/feature_cards.css';

function FeatureCard(props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body className="card-body">
        <span className="material-symbols-rounded feature-icon">
          {props.icon}
        </span>
        <Card.Title className="card-title">{props.title}</Card.Title>
        <Card.Text className="card-text">{props.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default FeatureCard;
