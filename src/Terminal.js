import { Fragment, useEffect, useRef, useState, useCallback } from 'react';
import CommandProcessor from './CommandProcessor';
import config from './config';
import './Terminal.css';

const Terminal = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [commandSnapshots, setCommandSnapshots] = useState([]);
  const [commandsHistory, setCommandsHistory] = useState({
    index: 0,
    commands: [],
  });
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const welcomeMsgElem = useRef(null);
  const welcomeMsgCursorElem = useRef(null);
  const audioElem = useRef(null);
  const terminalInputElem = useRef(null);
  const currentOutputElem = useRef(null);

  const commandProcessor = new CommandProcessor(terminalInputElem);

  const [welcomeMessageIndex, setWelcomeMessageIndex] = useState(0);
  const welcomeMessage =
    'Hi there! Welcome to my page.\nYou can use this terminal to learn more about me.\nFeel free to reach out if you have any questions or inquiries.';

  useEffect(() => {
    if (welcomeMessageIndex < welcomeMessage.length) {
      if (!isTyping) setIsTyping(true);

      welcomeMsgElem.current.innerHTML +=
        welcomeMessage.charAt(welcomeMessageIndex);
      const updatedWelcomeMessageIndex = welcomeMessageIndex + 1;
      setTimeout(() => setWelcomeMessageIndex(updatedWelcomeMessageIndex), 50);
    } else {
      welcomeMsgCursorElem.current.className = 'inactive';
      setIsPageLoaded(true);

      if (isTyping && !isPageLoaded) {
        setIsTyping(false);
      }
      if (!isPageLoaded) setIsPageLoaded(true);
    }
  }, [isPageLoaded, isTyping, welcomeMessageIndex]);

  useEffect(() => {
    if (isTyping) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
      audioElem.current.currentTime = 0;
    }
  }, [isTyping]);

  useEffect(() => {
    if (!isPageLoaded) {
      terminalInputElem.current.disabled = true;
    } else {
      terminalInputElem.current.disabled = false;
      terminalInputElem.current.focus();
    }
  }, [isPageLoaded]);

  const printAnimatedOutput = useCallback(
    (output) => {
      if (output.length === 0) {
        return;
      }

      const currentValue = currentOutputElem.current.innerHTML;

      if (!currentValue) {
        currentOutputElem.current.innerHTML += output[0];
        setTimeout(() => printAnimatedOutput(output), 50);
      } else if (currentValue.length < output.length) {
        currentOutputElem.current.innerHTML += output[currentValue.length];
        setTimeout(() => printAnimatedOutput(output), 50);
      } else {
        setIsTyping(false);
      }
    },
    [currentOutputElem]
  );

  useEffect(() => {
    if (!currentOutputElem.current) return;
    setIsTyping(true);
    printAnimatedOutput(
      commandSnapshots[commandSnapshots.length - 1].commandOutput
    );
  }, [commandSnapshots, printAnimatedOutput]);

  const restartAudio = () => {
    audioElem.current.currentTime = 0;
    audioElem.current.play();
  };

  const handleKeyPressed = (event) => {
    const keyPressed = event.key;

    switch (keyPressed) {
      case 'Enter':
        const commandName = event.target.value;
        const commandOutput = commandProcessor.processCommand(commandName);
        setCommandSnapshots((commandSnapshots) => [
          ...commandSnapshots,
          {
            promptLabel: config.DEFAULT_PROMPT_LABEL,
            promptInput: commandName,
            commandOutput: commandOutput,
          },
        ]);
        const updatedCommands = [...commandsHistory.commands, commandName];
        setCommandsHistory((commandsHistory) => ({
          ...commandsHistory,
          commands: updatedCommands,
          index: updatedCommands.length - 1,
        }));

        break;

      case 'ArrowUp':
        if (commandsHistory.commands.length === 0) return;
        terminalInputElem.current.value =
          commandsHistory.commands[commandsHistory.index];
        setCommandsHistory((commandsHistory) => ({
          ...commandsHistory,
          index:
            commandsHistory.index - 1 >= 0
              ? commandsHistory.index - 1
              : commandsHistory.commands.length - 1,
        }));
        break;

      default:
        break;
    }
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

        {commandSnapshots.map((commandSnapshot, index) => {
          if (index === commandSnapshots.length - 1) {
            return (
              <>
                <div className="prompt">
                  <div className="prompt-label">
                    {commandSnapshot.promptLabel}
                  </div>
                  <div className="prompt-input">
                    <input
                      disabled
                      type="text"
                      value={commandSnapshot.promptInput}
                    ></input>
                  </div>
                </div>
                <div ref={currentOutputElem} className="current-output"></div>
              </>
            );
          }

          return (
            <>
              <div className="prompt">
                <div className="prompt-label">
                  {commandSnapshot.promptLabel}
                </div>
                <div className="prompt-input">
                  <input
                    disabled
                    type="text"
                    value={commandSnapshot.promptInput}
                  ></input>
                </div>
              </div>
              <div className="current-output">
                {commandSnapshot.commandOutput}
              </div>
            </>
          );
        })}

        <div className="prompt">
          <div className="prompt-label">$ rahul-portfolio:</div>
          <div className="prompt-input">
            <input
              autoFocus
              type="text"
              ref={terminalInputElem}
              onKeyDown={handleKeyPressed}
            ></input>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Terminal;
