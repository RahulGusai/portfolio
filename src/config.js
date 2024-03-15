const config = {
  DEFAULT_PROMPT_LABEL: 'rahul@portfolio:',

  // default_cmd_output_list: {
  //   data: [{ value: 'Command not found.' }],
  //   type: 'row',
  // },

  cmd_output_with_no_data: { data: [] },

  system_dirs: {
    home: {
      directories: [
        'skills',
        'resume',
        'contact-info',
        'about',
        'projects',
        'projects',
      ],
      output: {
        data: [
          { value: 'skills' },
          { value: 'resume' },
          { value: 'contact-info' },
          { value: 'projects' },
          { value: 'about' },
        ],
        type: 'row',
      },
    },
    skills: {
      directories: [],
      output: {
        data: [
          { value: 'Python', type: 'meter', metaData: { total: 5, value: 5 } },
          { value: 'Java', type: 'meter', metaData: { total: 5, value: 4 } },
          {
            value: 'Javascript/Typescript',
            type: 'meter',
            metaData: { total: 5, value: 3 },
          },
          {
            value: 'HTML/CSS',
            type: 'meter',
            metaData: { total: 5, value: 4 },
          },
          {
            value: 'React.Js/Next.Js',
            type: 'meter',
            metaData: { total: 5, value: 4 },
          },
          {
            value: 'Kubernetes',
            type: 'meter',
            metaData: { total: 5, value: 3 },
          },
          { value: 'Docker', type: 'meter', metaData: { total: 5, value: 3 } },
          { value: 'Jenkins', type: 'meter', metaData: { total: 5, value: 3 } },
          { value: 'AWS', type: 'meter', metaData: { total: 5, value: 4 } },
          {
            value: 'Technical Writing',
            type: 'meter',
            metaData: { total: 5, value: 3 },
          },
          {
            value: 'Software Development',
            type: 'meter',
            metaData: { total: 5, value: 4 },
          },
        ],
        type: 'column',
      },
    },
    resume: {
      directories: [],
      output: {
        data: [
          {
            value: 'resume.pdf',
            type: 'link',
            metaData: {
              address:
                'https://drive.google.com/file/d/1F_Y8uAUUhBJojrX7wEIiyFATdyxChEgl/view',
            },
          },
        ],
        type: 'row',
      },
    },
    'contact-info': {
      directories: [],
      output: {
        data: [
          {
            value: null,
            type: 'contact-card',
            metaData: {
              keys: ['Name', 'Email', 'Mobile No', 'Country'],
              values: [
                'Rahul Gusai',
                'rgusai97@gmail.com',
                '+91-8708157414',
                'India 🇮🇳',
              ],
            },
          },
        ],
        type: 'row',
      },
    },
    about: {
      directories: [],
      output: {
        data: [
          {
            value: `Hi, <strong>I'm Rahul</strong>.
            I am the right person if you want to build something beautiful, <strong>something that stands out</strong> and can be scaled and maintained going ahead.
            After all, What is use of a software which can't be extended or maintained?
            I have more than five years of professional experience in Software engineering, working with tech stacks such as Java, Python, SpringBoot, Django, FastAPI, Flutter and Apache Kafka, to name a few. I also have skills in front-end and infrastructure technologies, particularly in JavaScript, TypeScript, ReactJs, ThreeJs, NextJs, docker and K8s.
            <strong>Engineering problems excite me;</strong> I am a natural problem solver who enjoys creating <strong>customer centric solutions</strong> at the core.
            My inbox is always open for any opportunites or discussions. (It could be non-technical as well🙇🏻) 
            Apart from work, I am an avid trekker who finds solitude and peace in the lap of mountains. Here are a few pictures of mine while trekking in the Himalayas.🌄`,
            type: 'about-section',
            metaData: {},
          },
        ],
        type: 'row',
      },
    },

    projects: {
      directories: [],
      output: {
        data: [
          {
            value: null,
            type: 'project-card',
            metaData: {
              'Project Name': 'Note Keeper',
              Description: 'It is a web based instant note taking tool.',
              'Tech Stack':
                'Backend - Python,Flask, Frontend - Javascript/NextJs',
              hyperLinks: {
                Link: 'https://note-keeper-ochre.vercel.app/',
                Repo: 'https://github.com/RahulGusai/note-keeper',
              },
            },
          },
          {
            value: null,
            type: 'project-card',
            metaData: {
              'Project Name': 'Topic Modeller',
              Description:
                'This is a standalone application which can be used to extract the relevant topics from a webpage.',
              'Tech Stack': 'Python,FastAPI',
              hyperLinks: {
                Repo: 'https://github.com/RahulGusai/topic-modeller',
              },
            },
          },
        ],
        type: 'row',
      },
    },
  },
};

export default config;
