import config from './config';

class CommandProcessor {
  constructor(terminalInputElem) {
    this.terminalInputElem = terminalInputElem;
    this.commands = {
      default: {
        description: '',
        outputType: 'row',
        handler: function (arg) {
          return config.default_cmd_output_values;
        },
      },
      ls: {
        description: '',
        outputType: 'row',
        handler: function (arg) {
          return config.ls_cmd_output_values;
        },
      },

      cd: {
        description: '',
        outputType: 'row',
        handler: function (arg) {
          if (!arg) {
            return [];
          }

          return [];
        },
      },
    };
  }

  getCommandObject(commandName) {
    this.terminalInputElem.current.value = '';

    if (!this.commands.hasOwnProperty(commandName)) {
      return config.cmd_not_found;
    }

    return this.commands[commandName];
  }
}

export default CommandProcessor;
