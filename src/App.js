import './App.css';
import Terminal from './Terminal';
import { SocialIcon } from 'react-social-icons/component';
import 'react-social-icons/linkedin';
import 'react-social-icons/instagram';
import 'react-social-icons/github';
import 'react-social-icons/stackoverflow';
import 'react-social-icons/google';
import 'react-social-icons/email';
import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <Terminal></Terminal>
      <div className="footer">
        <div className="icons-container">
          <SocialIcon
            url="https://www.linkedin.com/in/rahulgusai/"
            label="new"
            style={{ height: 25, width: 25 }}
            bgColor="#212121"
          />
          <SocialIcon
            url="https://www.instagram.com/raahgirahul/"
            label="new"
            style={{ height: 25, width: 25 }}
            bgColor="#212121"
          />
          <SocialIcon
            url="https://github.com/RahulGusai"
            style={{ height: 25, width: 25 }}
            bgColor="#212121"
          />
          <SocialIcon
            url="https://stackoverflow.com/users/6749197/rahul-gusai"
            style={{ height: 25, width: 25 }}
            bgColor="#212121"
          />
          <SocialIcon
            url="https://drive.google.com/file/d/1F_Y8uAUUhBJojrX7wEIiyFATdyxChEgl/view"
            style={{ height: 25, width: 25 }}
            bgColor="#212121"
          />
        </div>
        <div className="description">Crafted with ❤️</div>
      </div>

      {/* <div className="about-page" ref={aboutPageRef}>
        <div class="scroll-btn" onClick={handleScrollUpClick}>
          <div class="mousey">
            <div class="scroller"></div>
          </div>
        </div>
        <div className="about-container">
          <div className="images-container">
            <ImageSlider></ImageSlider>
          </div>
          <div className="content-container"></div>
        </div>
      </div> */}
    </Fragment>
  );
}

export default App;
