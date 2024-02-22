import config from './config';

class CommandProcessor {
  constructor(terminalInputElem, setDirsNavigated) {
    this.terminalInputElem = terminalInputElem;
    this.commands = {
      default: {
        description: 'Default command when the user enters an invalid command',
        outputType: 'row',
        handler: function (arg, dirsNavigated) {
          return config.default_cmd_output_list;
        },
      },
      ls: {
        description: 'Lists all the files in the present directory',
        outputType: 'row',
        handler: function (arg, dirsNavigated) {
          const directory =
            dirsNavigated.length === 0
              ? 'home'
              : dirsNavigated[dirsNavigated.length - 1];

          const { data } = config.system_dirs[directory];
          return data;
        },
      },

      cd: {
        description: 'Change the current directory',
        outputType: 'row',
        handler: function (arg, dirsNavigated) {
          if (!arg || arg in config.system_dirs || arg === '..') {
            return [];
          }

          return [{ value: `cd: No such file or directory: ${arg}` }];
        },
      },

      pwd: {
        description: 'Print the path to the current working directory.',
        outputType: 'row',
        handler: function (aeg, dirsNavigated) {
          const pwdStr =
            dirsNavigated.length === 0
              ? '/home'
              : `/home/${dirsNavigated.join('/')}`;
          return [{ value: pwdStr }];
        },
      },

      help: {
        description: '',
        outputType: 'column',
        handler: null,
      },
    };
    this.commands.help.handler = this.createHelpCmdOutput.bind(this);
  }

  createHelpCmdOutput() {
    const data = [
      {
        value:
          'You can run the following commands to play around this terminal and know more about me. :)',
      },
    ];

    const cmdsDescription = [];
    Object.entries(this.commands)
      .filter(([key]) => key !== 'default' && key !== 'help')
      .forEach(([key, value]) => {
        const { description } = value;
        cmdsDescription.push({ value: key }, { value: `-- ${description}` });
      });

    return [...data, ...cmdsDescription];
  }

  getCommandObject(commandName) {
    this.terminalInputElem.current.value = '';

    if (!this.commands.hasOwnProperty(commandName)) {
      return this.commands.default;
    }

    return this.commands[commandName];
  }
}

export default CommandProcessor;
