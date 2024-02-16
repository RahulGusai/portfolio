import React, { Fragment, useRef } from 'react';
import { Icon } from 'semantic-ui-react';

import './imageSlider.css';
import { func } from 'prop-types';

const ImageSlider = () => {
  const [current, setCurrent] = React.useState(0);

  const images = [
    'https://source.unsplash.com/gKk9rpyDryU',
    'https://source.unsplash.com/VFGEhLznjPU',
    'https://source.unsplash.com/InR-EhiO_js',
  ];

  function handleLeftArrowClick() {
    let newIndex = current - 1;
    if (newIndex < 0) {
      newIndex = images.length - 1;
    }
    setCurrent(newIndex);
  }

  function handleRightArrowClick() {
    let newIndex = current + 1;
    if (newIndex > images.length - 1) {
      newIndex = 0;
    }
    setCurrent(newIndex);
  }

  return (
    <div className="gallery-container">
      <div className="slider">
        {images.map((image, index) => {
          if (index != current) {
            return <img className="image" src={image}></img>;
          }
          return <img className="image active" src={image}></img>;
        })}
      </div>

      <nav className="slider-nav">
        <Icon
          className="left-arrow"
          size="large"
          name="left arrow"
          onClick={handleLeftArrowClick}
        />
        <Icon
          className="right-arrow"
          size="large"
          name="right arrow"
          onClick={handleRightArrowClick}
        />
      </nav>
    </div>
  );
};

export default ImageSlider;
