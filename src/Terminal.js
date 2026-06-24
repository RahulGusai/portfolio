import { Fragment, useEffect, useRef, useState } from 'react';
import CommandProcessor from './CommandProcessor';
import config from './config';
import './Terminal.css';
import ImageSlider from './ImageSlider';

// Evaluated once: when reduced motion is requested we skip the typing
// animation (and its sound) and render the hero instantly.
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Terminal = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [commandSnapshots, setCommandSnapshots] = useState([]);
  const [commandsHistory, setCommandsHistory] = useState({
    index: 0,
    commands: [],
  });
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
  const welcomeMessage = `Hi, I'm Rahul.\nI build production-grade AI agents and automated workflows that actually ship and hold up once real users show up. 7+ years engineering; now focused on applied AI.\n\nType \`help\` to look around. Try \`projects\`, \`resume\`, or \`whoami\`.`;

  useEffect(() => {
    // Reduced motion: render the whole hero at once, no typing, no sound.
    if (prefersReducedMotion) {
      welcomeMsgElem.current.textContent = welcomeMessage;
      welcomeMsgCursorElem.current.className = 'cursor blink';
      return;
    }

    if (welcomeMessageIndex < welcomeMessage.length) {
      if (!isTyping) setIsTyping(true);

      if (welcomeMessageIndex === 0) {
        welcomeMsgElem.current.textContent = '';
      }
      welcomeMsgElem.current.textContent +=
        welcomeMessage.charAt(welcomeMessageIndex);
      const next = welcomeMessageIndex + 1;
      const timerId = setTimeout(() => setWelcomeMessageIndex(next), 18);
      return () => clearTimeout(timerId);
    } else {
      // Typing finished: leave a calm blinking block cursor at the prompt.
      welcomeMsgCursorElem.current.className = 'cursor blink';

      if (isTyping) {
        setIsTyping(false);
      }
    }
  }, [isTyping, welcomeMessageIndex, welcomeMessage]);

  useEffect(() => {
    if (isTyping) {
      // play() can reject if the browser blocks autoplay before a gesture.
      const playPromise = audioElem.current.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    } else {
      audioElem.current.pause();
      audioElem.current.currentTime = 0;
    }
  }, [isTyping]);

  useEffect(() => {
    scrollToBottom();
  });

  const restartAudio = () => {
    audioElem.current.currentTime = 0;
    const playPromise = audioElem.current.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
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

        const commandObj = commandProcessor.getCommandObject(commandName);
        let output = commandObj.handler(commandArg, dirsNavigated);

        if (commandName === 'history') {
          const cmds = commandsHistory.commands;
          output =
            cmds.length === 0
              ? { data: [{ value: 'No commands in history yet.' }], type: 'row' }
              : {
                  data: cmds.map((cmd, i) => ({ value: `${i + 1}  ${cmd}` })),
                  type: 'column',
                };
        }
        const pathToCurrentDir =
          dirsNavigated.length > 0 ? `~/${dirsNavigated.join('/')}` : '~';

        if (commandName === 'clear') {
          terminalInputElem.current.value = '';
          setCommandSnapshots([]);
        } else {
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
        }

        if (!commandName) return;

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
            <span className="cursor" ref={welcomeMsgCursorElem}></span>
            {Array.from({ length: 2 }).map(() => (
              <br></br>
            ))}
          </div>
        </div>

        {commandSnapshots.map((commandSnapshot, index) => {
          let currentOutputClass =
            commandSnapshot.command.output.type === 'row'
              ? 'current-output-row'
              : 'current-output-column';
          currentOutputClass = commandSnapshot.command.output.margin
            ? `${currentOutputClass} with-margin`
            : currentOutputClass;

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

                  if (type === 'resume-name') {
                    return <div className="resume-name">{value}</div>;
                  }

                  if (type === 'section-heading') {
                    return <div className="section-heading">{value}</div>;
                  }

                  if (type === 'section-body') {
                    return <div className="section-body">{value}</div>;
                  }

                  if (type === 'disclaimer') {
                    return <div className="disclaimer">{value}</div>;
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
            {autoCompleteOutput.data.map((dataObject, index) => {
              const { value } = dataObject;
              return (
                <div key={index} className="current-output-div">
                  {value}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Terminal;
