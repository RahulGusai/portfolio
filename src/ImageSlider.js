import React, { Fragment, useRef } from 'react';
import { Icon } from 'semantic-ui-react';
import myImage from './me.jpeg';
import './imageSlider.css';

const ImageSlider = () => {
  const [current, setCurrent] = React.useState(0);

  const images = [
    myImage,
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
          size="small"
          name="chevron left"
          color="black"
          onClick={handleLeftArrowClick}
        />
        <Icon
          className="right-arrow"
          size="small"
          name="chevron right"
          color="black"
          onClick={handleRightArrowClick}
        />
      </nav>
    </div>
  );
};

export default ImageSlider;
