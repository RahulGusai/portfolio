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
            value: `Hi, <strong>I'm Rahul.</strong>
            You're here because you need something built. But not just anything.
            You need something excellent not just someone's idea of a minimum viable product. What you're looking for is something beautiful;<strong> something that stands out. Something Different</strong>
            And you came looking for me.
            That's a pretty good call.
            I have over five years of experience in Software engineering, working with tech stacks such as Java, Python, SpringBoot, Django, Flutter and Apache Kafka, just to name a few. I also have skills in front-end development, particularly in JavaScript, TypeScript, ReactJs,Three.Js and NextJs.
            <strong>Engineering problems excite me;</strong>  I am a natural problem solver who enjoys creating scalable, maintainable systems. Apart from work, I am an avid trekker who finds solitude and peace in the lap of mountains. Here are a few pictures of mine while trekking in the Himalayas.
            I do not do things small and I do not do things halfway. If you or your company need a sure bet, my inbox is open.`,
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
