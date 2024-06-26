const config = {
  DEFAULT_PROMPT_LABEL: 'rahul@portfolio:',

  cmd_output_with_no_data: { data: [] },

  system_dirs: {
    home: {
      directories: ['skills', 'resume', 'contact-info', 'about', 'projects'],
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
            value: 'Django/Flask/FastAPI',
            type: 'meter',
            metaData: { total: 5, value: 4 },
          },
          {
            value: 'SpringBoot',
            type: 'meter',
            metaData: { total: 5, value: 4 },
          },
          {
            value: 'HTML/CSS',
            type: 'meter',
            metaData: { total: 5, value: 4 },
          },
          {
            value: 'ReactJs/NextJs',
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
            value: 'Problem Solving',
            type: 'meter',
            metaData: { total: 5, value: 4 },
          },
          {
            value: 'Technical Leadership',
            type: 'meter',
            metaData: { total: 5, value: 3 },
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
        margin: true,
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
            With over five years of professional experience in software engineering, I specialize in delivering high-quality software solutions while maintaining a strong work ethic. My expertise spans across various tech stacks, encompassing both backend and frontend technologies. Additionally, my proficiency extends to infrastructure technologies, including containerization and orchestration tools like Docker and Kubernetes.
            <strong>Engineering problems excite me;</strong> I am a natural problem solver who enjoys creating <strong>customer centric solutions</strong> at the core.
            My inbox is always open for any opportunites or discussions. (It could be non-technical as well🙇🏻) 
            Apart from work, I am an avid trekker who finds solitude and peace in the lap of mountains. Here are a few pictures of mine while trekking in the Himalayas.🌄`,
            type: 'about-section',
            metaData: {},
          },
        ],
        type: 'row',
        margin: true,
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
              'Project Name': 'Portfolio',
              Description: 'My personal website.',
              'Tech Stack': 'HTML/CSS,Javascript and ReactJs',
              hyperLinks: {
                Link: 'https://rahul-gusai.vercel.app/',
                Repo: 'https://github.com/RahulGusai/portfolio',
              },
            },
          },
          {
            value: null,
            type: 'project-card',
            metaData: {
              'Project Name': 'Carbon Emissions Calculation Engine',
              Description:
                'This engine is tailored to assist businesses of all sizes in accurately calculating and offsetting their carbon emissions, paving the way for a greener and more sustainable future.',
              'Tech Stack':
                'Backend => Python,FastAPI, Frontend => Javascript/ReactJs',
              hyperLinks: {
                Link: 'https://climatecred.in',
                Repo: 'https://github.com/RahulGusai/carbon-emissions',
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
          {
            value: null,
            type: 'project-card',
            metaData: {
              'Project Name': 'Note Keeper',
              Description: 'It is a web based instant note taking tool.',
              'Tech Stack':
                'Backend => Python,Flask, Frontend => Javascript/NextJs',
              hyperLinks: {
                Link: 'https://note-keeper-ochre.vercel.app/',
                Repo: 'https://github.com/RahulGusai/note-keeper',
              },
            },
          },
        ],
        type: 'row',
        margin: true,
      },
    },
  },
};

export default config;
