import { Fragment, useEffect, useRef, useState, useCallback } from 'react';
import CommandProcessor from './CommandProcessor';
import config from './config';
import './Terminal.css';
import ImageSlider from './ImageSlider';
import { Icon } from 'semantic-ui-react';

const Terminal = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [commandSnapshots, setCommandSnapshots] = useState([]);
  const [commandsHistory, setCommandsHistory] = useState({
    index: 0,
    commands: [],
  });
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [dirsNavigated, setDirsNavigated] = useState([]);
  const [autoCompleteOutput, setAutoCompleteOutput] = useState(null);

  const welcomeMsgElem = useRef(null);
  const welcomeMsgCursorElem = useRef(null);
  const audioElem = useRef(null);
  const terminalInputElem = useRef(null);
  const terminalContainerElem = useRef(null);

  const commandProcessor = new CommandProcessor(
    terminalInputElem,
    setDirsNavigated,
    setAutoCompleteOutput
  );

  const [welcomeMessageIndex, setWelcomeMessageIndex] = useState(0);
  const welcomeMessage = `Hi, I'm Rahul.\nYou're here because you need something built. But not just anything.You need something excellent, not just someone's idea of a minimum viable product.\nI do not do things small and I do not do things halfway. If you or your company need a sure bet, my inbox is open. :)\nYou can navigate through this terminal to know more about me. help command will list all the available commands.`;

  useEffect(() => {
    if (welcomeMessageIndex < welcomeMessage.length) {
      if (!isTyping) setIsTyping(true);

      if (welcomeMessageIndex === 0) {
        welcomeMsgElem.current.innerHTML = '';
      }
      welcomeMsgElem.current.innerHTML +=
        welcomeMessage.charAt(welcomeMessageIndex);
      const updatedWelcomeMessageIndex = welcomeMessageIndex + 1;
      setTimeout(() => setWelcomeMessageIndex(updatedWelcomeMessageIndex), 60);
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

  const printAnimatedOutput = useCallback((animatedDiv, output) => {
    if (output.length === 0) {
      return;
    }

    const currentValue = animatedDiv.innerHTML;

    if (!currentValue) {
      animatedDiv.innerHTML += output[0];
      setTimeout(() => printAnimatedOutput(animatedDiv, output), 50);
    } else if (currentValue.length < output.length) {
      animatedDiv.innerHTML += output[currentValue.length];
      setTimeout(() => printAnimatedOutput(animatedDiv, output), 50);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  });

  // useEffect(() => {
  //   const currentOutputAnimatedDivs = document.querySelectorAll(
  //     '.current-output-div-animated'
  //   );

  //   if (currentOutputAnimatedDivs.length === 0) return;
  //   // if (soundEnabled) setIsTyping(true);

  //   let delay = 0;
  //   currentOutputAnimatedDivs.forEach((animatedDiv, index) => {
  //     setTimeout(() => {
  //       const output =
  //         commandSnapshots[commandSnapshots.length - 1].command.outputList[
  //           index
  //         ];
  //       if (output.hasOwnProperty('type')) {
  //         animatedDiv.innerHTML = `<a href=${output['metaData']['address']} target="_blank" rel="noreferrer"> <u>${output.value}</u></a>`;
  //         return;
  //       }
  //       printAnimatedOutput(animatedDiv, output.value);
  //     }, delay);
  //     delay += 200;
  //   });
  // }, [commandSnapshots, printAnimatedOutput, soundEnabled]);

  const restartAudio = () => {
    audioElem.current.currentTime = 0;
    audioElem.current.play();
  };

  const clearAnimatedDivs = () => {
    const currentOutputAnimatedDivs = document.querySelectorAll(
      '.current-output-div-animated'
    );

    currentOutputAnimatedDivs.forEach((animatedDiv) => {
      animatedDiv.innerHTML = '';
    });
  };

  const scrollToBottom = () => {
    terminalContainerElem.current.scrollTop =
      terminalContainerElem.current.scrollHeight;
  };

  const handleKeyPressed = (event) => {
    const keyPressed = event.key;

    switch (keyPressed) {
      case 'Enter':
        clearAnimatedDivs();
        setAutoCompleteOutput(null);

        const [commandName, commandArg] = event.target.value.split(' ');

        if (commandName === 'clear') {
          terminalInputElem.current.value = '';
          setCommandSnapshots([]);
          return;
        }

        const commandObj = commandProcessor.getCommandObject(commandName);
        const output = commandObj.handler(commandArg, dirsNavigated);
        const pathToCurrentDir =
          dirsNavigated.length > 0 ? `~/${dirsNavigated.join('/')}` : '~';

        setCommandSnapshots((commandSnapshots) => [
          ...commandSnapshots,
          {
            promptLabel: config.DEFAULT_PROMPT_LABEL,
            pathToCurrentDir: pathToCurrentDir,
            promptInput: commandArg
              ? `${commandName} ${commandArg}`
              : commandName,
            command: { ...commandObj, output: output },
          },
        ]);

        const updatedCommands = [
          ...commandsHistory.commands,
          commandArg ? `${commandName} ${commandArg}` : commandName,
        ];
        setCommandsHistory((commandsHistory) => ({
          ...commandsHistory,
          commands: updatedCommands,
          index: updatedCommands.length - 1,
        }));

        break;

      case 'ArrowUp':
        if (commandsHistory.commands.length === 0) return;
        terminalInputElem.current.focus();
        const value = commandsHistory.commands[commandsHistory.index];
        terminalInputElem.current.value = value;
        terminalInputElem.current.setSelectionRange(value.length, value.length);

        setCommandsHistory((commandsHistory) => ({
          ...commandsHistory,
          index:
            commandsHistory.index - 1 >= 0
              ? commandsHistory.index - 1
              : commandsHistory.commands.length - 1,
        }));
        break;

      case 'Tab':
        event.preventDefault();
        commandProcessor.handleCommandAutoComplete(dirsNavigated);
        break;

      default:
        break;
    }
  };

  const handleVolumeIconPressed = (e) => {
    if (!soundEnabled) {
      setSoundEnabled(true);
    } else {
      setSoundEnabled(false);
    }
  };

  const handleTerminalClick = (e) => {
    terminalInputElem.current.focus();
  };

  const pathToCurrentDir =
    dirsNavigated.length > 0 ? `~/${dirsNavigated.join('/')}` : '~';

  return (
    <Fragment>
      <audio
        id="demo"
        ref={audioElem}
        type="audio/mp3"
        src="sound.mp3"
        onEnded={restartAudio}
      ></audio>
      <div
        className="terminal"
        ref={terminalContainerElem}
        onClick={handleTerminalClick}
      >
        <div className="terminal-toolbar">
          <div className="toolbar-icon close"></div>
          <div className="toolbar-icon minimize"></div>
          <div className="toolbar-icon collapse"></div>
        </div>
        <div className="terminal-header">
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
          {/* <div onClick={handleVolumeIconPressed}>
            <Icon
              className="volume-icon"
              color="teal"
              size="large"
              name="volume up"
              disabled={soundEnabled ? false : true}
            />
          </div> */}
        </div>

        {commandSnapshots.map((commandSnapshot, index) => {
          const currentOutputClass =
            commandSnapshot.command.output.type === 'row'
              ? 'current-output-row'
              : 'current-output-column';

          return (
            <>
              <div className="prompt">
                <div className="prompt-label">
                  {commandSnapshot.promptLabel}
                  <span className="current-dir">
                    {commandSnapshot.pathToCurrentDir}
                  </span>
                </div>
                <div className="prompt-input">
                  <input
                    disabled
                    type="text"
                    value={commandSnapshot.promptInput}
                  ></input>
                </div>
              </div>
              <div className={currentOutputClass}>
                {commandSnapshot.command.output.data.map((dataObject) => {
                  const { type, value, metaData } = dataObject;

                  if (type === 'meter') {
                    return (
                      <div className="current-output-meter-div">
                        <div className="current-output-div-text">{value}</div>
                        <div className="meter-container">
                          {Array.from(
                            { length: metaData.value },
                            (_, i) => i + 1
                          ).map(() => (
                            <div className="box fill"></div>
                          ))}
                          {Array.from(
                            { length: metaData.total - metaData.value },
                            (_, i) => i + 1
                          ).map(() => (
                            <div className="box"></div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  if (type === 'link') {
                    return (
                      <div className="current-output-div">
                        <a
                          href={dataObject['metaData']['address']}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <u>{value}</u>
                        </a>
                      </div>
                    );
                  }

                  if (type === 'contact-card') {
                    return (
                      <div className="current-output-div">
                        <div className="contact-card">
                          {metaData.keys.map((key, index) => {
                            return (
                              <div className="contact-card-data">
                                <span>
                                  <b>{`${key}: `}</b>
                                </span>
                                <span>{metaData.values[index]}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  if (type === 'project-card') {
                    console.log(Object.keys(metaData));
                    return (
                      <div className="project-card">
                        {Object.keys(metaData).map((key) => {
                          if (key === 'hyperLinks') {
                            return (
                              <div className="project-card-data">
                                {Object.keys(metaData.hyperLinks).map((key) => {
                                  return (
                                    <a
                                      href={metaData.hyperLinks[key]}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <u>{key}</u>
                                    </a>
                                  );
                                })}
                              </div>
                            );
                          }
                          return (
                            <div className="project-card-data">
                              <span>
                                <b>{`${key}: `}</b>
                              </span>
                              <span>{metaData[key]}</span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  }

                  if (type === 'about-section') {
                    return (
                      <div className="about-section">
                        <div
                          className="text"
                          dangerouslySetInnerHTML={{ __html: value }}
                        ></div>
                        <div className="images-container">
                          <ImageSlider></ImageSlider>
                        </div>
                      </div>
                    );
                  }

                  return <div className="current-output-div">{value}</div>;
                })}
              </div>
            </>
          );
        })}

        <div className="prompt">
          <div className="prompt-label">
            {config.DEFAULT_PROMPT_LABEL}
            <span className="current-dir">{pathToCurrentDir}</span>
          </div>
          <div className="prompt-input">
            <input
              autoFocus
              type="text"
              ref={terminalInputElem}
              onKeyDown={handleKeyPressed}
            ></input>
          </div>
        </div>

        {autoCompleteOutput && (
          <div className="current-output-row">
            {autoCompleteOutput.data.map((dataObject) => {
              const { type, value, metaData } = dataObject;
              return <div className="current-output-div">{value}</div>;
            })}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Terminal;
