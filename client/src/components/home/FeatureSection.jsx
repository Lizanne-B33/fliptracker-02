/*Sources:
        https://www.geeksforgeeks.org/reactjs/how-to-render-an-array-of-objects-in-reactjs/
        https://medium.com/yavar/how-to-use-the-reduce-in-javascript-and-react-4bc8b5f8fa4b
        https://dev.to/learnwithparam/how-to-group-an-array-of-objects-through-a-key-using-array-reduce-in-javascript-1lki
        */

import React from 'react';
import FeatureCard from './FeatureCard';
import FeatureData from '../../lists/FeatureData.jsx';
import '../../styles/feature_cards.css';

console.log('Imported FeatureData:', FeatureData);

function FeaturesSection() {
  // pull in the list as a local variable called featureData
  const featureData = FeatureData;
  console.log(featureData);
  console.log(FeatureData);

  // Group the list by group keyword, so that it becomes a key(group)/value(arrays of items)
  // created a utility function called groupBy to do this.
  // The reduce function actually creates an object.
  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };

  // giving a variable that holds the result of calling the function.
  const featureGroupedByGroup = groupBy(featureData, 'group');

  // Need to break the object into something that I can use for mapping and getting the values.
  const groupedFeatures = Object.entries(featureGroupedByGroup).map(
    ([group, features]) => (
      <div className="row feature" key={group}>
        <div className="col-12 mt-5 text-center feature-group">
          <h1 className="feature-group-text">{group}</h1>
        </div>

        {features.map((featureItem) => (
          <div className="col-md-4 feature-grid" key={featureItem.id}>
            <FeatureCard
              icon={featureItem.icon}
              title={featureItem.title}
              text={featureItem.text}
            />
          </div>
        ))}
      </div>
    )
  );

  return <div className="container">{groupedFeatures}</div>;
}

export default FeaturesSection;
