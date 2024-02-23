const config = {
  DEFAULT_PROMPT_LABEL: 'rahul@portfolio:',

  default_cmd_output_list: [{ value: 'Command not found.' }],

  system_dirs: {
    home: {
      directories: ['skills', 'resume'],
      data: [
        { value: 'skills' },
        { value: 'resume' },
        { value: 'contact-info' },
        { value: 'projects' },
        { value: 'about' },
      ],
    },
    skills: {
      directories: [],
      data: [
        { value: 'Python' },
        { value: 'Java' },
        { value: 'Javascript/Typescript' },
        { value: 'HTML/CSS' },
        { value: 'React.Js/Next.Js' },
        { value: 'Kubernetes' },
        { value: 'Docker' },
        { value: 'Jenkins' },
        { value: 'AWS' },
        { value: 'Technical Writing' },
        { value: 'Software Development' },
      ],
    },
    resume: {
      directories: [],
      data: [
        {
          value: 'demo-link',
          type: 'link',
          metaData: {
            address:
              'https://drive.google.com/file/d/1F_Y8uAUUhBJojrX7wEIiyFATdyxChEgl/view',
          },
        },
      ],
    },
  },
};

export default config;
