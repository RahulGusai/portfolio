import { Fragment, useEffect, useRef, useState } from 'react';
import './Terminal.css';

const Terminal = () => {
  const welcomeMsgElem = useRef(null);
  const welcomeMsgCursorElem = useRef(null);
  const audioElem = useRef(null);

  const [welcomeMessageIndex, setWelcomeMessageIndex] = useState(0);
  const welcomeMessage =
    'Hi there! Welcome to my page.\nYou can use this terminal to learn more about me.\nFeel free to reach out if you have any questions or inquiries.';

  useEffect(() => {
    if (welcomeMessageIndex < welcomeMessage.length) {
      welcomeMsgElem.current.innerHTML +=
        welcomeMessage.charAt(welcomeMessageIndex);
      const updatedWelcomeMessageIndex = welcomeMessageIndex + 1;
      setTimeout(() => setWelcomeMessageIndex(updatedWelcomeMessageIndex), 100);
    } else {
      welcomeMsgCursorElem.current.className = 'inactive';
      audioElem.current.pause();
      audioElem.current.currentTime = 0;
    }
  }, [welcomeMessageIndex]);

  useEffect(() => {
    audioElem.current.play();
  }, []);

  const restartAudio = () => {
    audioElem.current.currentTime = 0;
    audioElem.current.play();
  };

  return (
    <Fragment>
      <audio
        id="demo"
        ref={audioElem}
        type="audio/mp3"
        src="sound.mp3"
        onEnded={restartAudio}
      ></audio>
      <div className="terminal">
        <div className="welcome-message">
          <pre className="welcome-message-text" ref={welcomeMsgElem}></pre>
          <span className="cursor" ref={welcomeMsgCursorElem}>
            {' '}
            |
          </span>
          {Array.from({ length: 2 }).map(() => (
            <br></br>
          ))}
        </div>
        <div
          className="prompt"
          onClick={() => {
            audioElem.current.play();
          }}
        >
          <div className="prompt-label">$</div>
          <div className="prompt-output">rahul-portfolio:</div>
        </div>
      </div>
    </Fragment>
  );
};

export default Terminal;
