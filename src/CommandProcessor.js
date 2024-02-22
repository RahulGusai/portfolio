import config from './config';

class CommandProcessor {
  constructor(terminalInputElem) {
    this.terminalInputElem = terminalInputElem;
    this.commands = {
      default: {
        description: '',
        outputType: 'row',
        handler: function (arg) {
          return config.default_cmd_output_list;
        },
      },
      ls: {
        description: '',
        outputType: 'row',
        handler: function (arg) {
          return config.ls_cmd_output_list;
        },
      },

      cd: {
        description: '',
        outputType: 'row',
        handler: function (arg) {
          if (!arg) {
            return [];
          }

          if (arg in config.user_dirs) {
            const { data } = config.user_dirs[arg];
            return data;
          }
          return [];
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
