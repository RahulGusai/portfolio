// Shared content blocks — referenced by both the terminal commands
// (CommandProcessor.js) and the matching directory listings below, so the
// two never drift.

const skillsGroups = {
  data: [
    { value: 'AI / LLM', type: 'section-heading' },
    {
      value:
        'Python · LLM orchestration · agents · RAG · vector DBs (Pinecone, pgvector) · MCP · LangGraph · LangChain / LlamaIndex · OpenAI + Anthropic (Claude) · prompt & tooling',
      type: 'section-body',
    },
    { value: 'Backend', type: 'section-heading' },
    {
      value:
        'FastAPI · Django · async processing · REST APIs · data modeling · Postgres / MySQL · Redis · Celery',
      type: 'section-body',
    },
    { value: 'Infra', type: 'section-heading' },
    { value: 'Docker · Kubernetes · CI/CD', type: 'section-body' },
  ],
  type: 'column',
  margin: true,
};

const projectsOutput = {
  data: [
    {
      value: null,
      type: 'project-card',
      metaData: {
        'Project Name': 'Crewline',
        Description:
          'Autonomous AI engineering crew: agents pick up tickets, write code, review each other, and open PRs.',
        hyperLinks: { Link: 'https://crewline.in/' },
      },
    },
    {
      value: null,
      type: 'project-card',
      metaData: {
        'Project Name': 'RAG Knowledge Assistant',
        Description:
          'Ask questions across long documents with accurate, cited retrieval.',
        hyperLinks: { Link: 'https://knowledge-assistant.lovable.app' },
      },
    },
    {
      value: null,
      type: 'project-card',
      metaData: {
        'Project Name': 'BrandPilot',
        Description:
          'Autonomous AI marketing pipeline: brand research → strategy → content.',
        hyperLinks: { Link: 'https://ai-brandkit.lovable.app/' },
      },
    },
    {
      value: null,
      type: 'project-card',
      metaData: {
        'Project Name': 'Capila',
        Description: 'AI systems for a healthcare product (client work).',
        hyperLinks: { Link: 'https://www.capilahealth.com/' },
      },
    },
  ],
  type: 'row',
  margin: true,
};

const contactLines = {
  data: [
    {
      value: 'rgusai97@gmail.com',
      type: 'link',
      metaData: { address: 'mailto:rgusai97@gmail.com' },
    },
    {
      value: 'github.com/RahulGusai',
      type: 'link',
      metaData: { address: 'https://github.com/RahulGusai' },
    },
    {
      value: 'linkedin.com/in/rahulgusai',
      type: 'link',
      metaData: { address: 'https://www.linkedin.com/in/rahulgusai/' },
    },
  ],
  type: 'column',
  margin: true,
};

const config = {
  DEFAULT_PROMPT_LABEL: 'rahul@portfolio:',

  cmd_output_with_no_data: { data: [] },

  // exposed for the commands that reuse them
  skills_groups: skillsGroups,
  contact_lines: contactLines,

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
      output: skillsGroups,
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
      output: contactLines,
    },
    about: {
      directories: [],
      output: {
        data: [
          {
            value: `Hi, <strong>I'm Rahul</strong>.
            I am the right person if you want to build something beautiful, <strong>something that stands out</strong> and can be scaled and maintained going ahead.
            After all, What is use of a software which can't be extended or maintained?
            With over seven years of professional experience in software engineering, I specialize in delivering high-quality software solutions while maintaining a strong work ethic. My expertise spans across various tech stacks, encompassing both backend and frontend technologies. Additionally, my proficiency extends to infrastructure technologies, including containerization and orchestration tools like Docker and Kubernetes.
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
      output: projectsOutput,
    },
  },
};

export default config;
