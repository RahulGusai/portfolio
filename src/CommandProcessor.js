import config from './config';

class CommandProcessor {
  constructor(terminalInputElem, setDirsNavigated) {
    this.terminalInputElem = terminalInputElem;
    this.commands = {
      default: {
        description: '',
        outputType: 'row',
        handler: function (arg, dirsNavigated) {
          return config.default_cmd_output_list;
        },
      },
      ls: {
        description: '',
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
        description: '',
        outputType: 'row',
        handler: function (arg, dirsNavigated) {
          if (!arg || arg in config.system_dirs || arg === '..') {
            return [];
          }

          return [{ value: `cd: No such file or directory: ${arg}` }];
        },
      },
    };
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
