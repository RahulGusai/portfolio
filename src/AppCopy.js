import './App.css';
import Terminal from 'react-console-emulator';
import config from './config.js';
import { SocialIcon } from 'react-social-icons/component';
import 'react-social-icons/linkedin';
import 'react-social-icons/instagram';
import 'react-social-icons/github';
import 'react-social-icons/stackoverflow';
import 'react-social-icons/google';
import 'react-social-icons/email';
import { Fragment, useRef, useState } from 'react';
import { Icon } from 'semantic-ui-react';

import ImageSlider from './ImageSlider';

function App() {
  const outerContainerRef = useRef(null);
  const aboutPageRef = useRef(null);

  const skills = [
    'Python',
    'Java',
    'Javascript/Typescript',
    'HTML/CSS',
    'React.Js/Next.Js',
    'Kubernetes',
    'Docker',
    'Jenkins',
    'AWS',
    'Technical Writing',
    'Software Development',
  ];

  const contactInfo = {
    'Email Id': 'rgusai97@gmail.com',
    'Phone No': '+91-8708157414',
    Country: 'India 🇮🇳',
  };

  const commandNames = [
    'skills',
    'professional-exp',
    'projects',
    'contact',
    'show',
  ];

  const commandNamesStr = commandNames
    .map((command_name, index) => {
      return `${index + 1}. ${command_name}`;
    })
    .join('\n');

  const commands = {
    show: {
      description: 'Show all the available commands',
      fn: function () {
        const outputStr =
          'You can use the following commands to learn more about me.\n';
        return `${outputStr}${commandNamesStr}`;
      },
    },
    skills: {
      description: 'Describes the skill set',
      fn: function () {
        return skills
          .map((skill, index) => {
            return `* ${skill}`;
          })
          .join('\n');
      },
    },
    contact: {
      description: 'Shows the contact information',
      fn: function () {
        let outputStr = 'I am reachable using these details \n';
        const contactDetailsArr = [];
        for (const key in contactInfo) {
          contactDetailsArr.push(`${key} - ${contactInfo[key]}`);
        }
        return `${outputStr}${contactDetailsArr.join('\n')}`;
      },
    },
    'professional-exp': {
      description: 'Displays the professional experience',
      fn: function () {},
    },
    projects: {
      description: 'Displays the projects information',
      fn: function () {},
    },
  };

  function handleScrollDownClick(e) {
    aboutPageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleScrollUpClick(e) {
    outerContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <Fragment>
      <div className="outer-container" ref={outerContainerRef}>
        <Terminal
          className="terminal"
          commands={commands}
          welcomeMessage={`${config.welcomeMessage}${commandNamesStr}`}
          errorText={
            "This command doesn't exist. Please ENTER show to list the available commands."
          }
          noAutoScroll={true}
          promptLabelStyle={config.promptLabelStyle}
          contentStyle={config.contentStyle}
          inputTextStyle={config.inputTextStyle}
          messageStyle={config.messageStyle}
          style={config.terminalStyle}
        ></Terminal>
        <div class="scroll-btn" onClick={handleScrollDownClick}>
          <div class="mousey">
            <div class="scroller"></div>
          </div>
        </div>
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

      <div className="about-page" ref={aboutPageRef}>
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
      </div>
    </Fragment>
  );
}

export default App;
