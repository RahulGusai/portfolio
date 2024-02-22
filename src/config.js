const config = {
  DEFAULT_PROMPT_LABEL: '$ rahul-portfolio:',

  ls_cmd_output_list: [
    { value: 'skills' },
    { value: 'resume' },
    { value: 'contact-info' },
    { value: 'projects' },
    { value: 'about' },
  ],

  default_cmd_output_list: [{ value: 'Command not found.' }],

  user_dirs: {
    skills: {
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
