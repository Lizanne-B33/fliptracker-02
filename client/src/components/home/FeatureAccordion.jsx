// Sources:
// https://www.geeksforgeeks.org/reactjs/react-bootstrap-custom-accordions/

import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import FeatureData from '../../lists/FeatureData';
import '../../styles/accordion.css';

function FeatureAccordion() {
  // Set the default active key
  const [activeKey, setActiveKey] = useState('0');

  // construct the group function
  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };

  // giving a variable that holds the result of calling the function.
  const featureGroupedByGroup = groupBy(FeatureData, 'group');

  // Need to break the object into something that I can use for mapping and getting the values.
  return (
    <div className="container">
      <h3>FlipTrackr Features</h3>
      <Accordion activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        {Object.entries(featureGroupedByGroup).map(([group, features]) => (
          <Accordion.Item eventKey={group} key={group}>
            <Accordion.Header>{group}</Accordion.Header>
            <Accordion.Body>
              {features.map((featureItem) => (
                <Card.Body key={featureItem.id} className="accordion-body">
                  <strong>{featureItem.title}</strong> — {featureItem.text}
                </Card.Body>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default FeatureAccordion;
