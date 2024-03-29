import './Terminal.css';
import Terminal from './Terminal';
import { SocialIcon } from 'react-social-icons/component';
import 'react-social-icons/linkedin';
import 'react-social-icons/instagram';
import 'react-social-icons/github';
import 'react-social-icons/stackoverflow';
import 'react-social-icons/google';
import 'react-social-icons/email';

function App() {
  return (
    <div className="outer-container">
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
    </div>
  );
}

export default App;
