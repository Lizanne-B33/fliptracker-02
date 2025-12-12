// Sources:
// https://react-bootstrap.github.io/docs/components/cards/
// https://www.geeksforgeeks.org/reactjs/how-to-map-data-into-components-using-reactjs/

// This component is used to display features in cards for larger devices.

import React from 'react';
import Card from 'react-bootstrap/Card';
import '../../styles/feature_cards.css';

function FeatureCard(props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body className="feature-body">
        <span className="material-symbols-rounded feature-icon">
          {props.icon}
        </span>
        <Card.Title className="feature-title">{props.title}</Card.Title>
        <Card.Text className="feature-text">{props.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default FeatureCard;
