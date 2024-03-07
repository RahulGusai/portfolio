const config = {
  DEFAULT_PROMPT_LABEL: 'rahul@portfolio:',

  default_cmd_output_list: {
    data: [{ value: 'Command not found.' }],
    type: 'row',
  },

  cmd_output_with_no_data: { data: [] },

  system_dirs: {
    home: {
      directories: ['skills', 'resume', 'contact-info', 'about'],
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
            type: 'card',
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
            <strong>Engineering problems excite me;</strong> I am a natural problem solver who enjoys creating scalable, maintainable systems and most importantly, <strong>solving problems.</strong>
            My inbox is always open for any opportunites ot discussions. (It could be non-technical as well)
            Apart from work, I am an avid trekker who finds solitude and peace in the lap of mountains. Here are a few pictures of mine while trekking in the Himalayas.`,
            type: 'about-section',
            metaData: {},
          },
        ],
        type: 'row',
      },
    },
  },
};

export default config;
