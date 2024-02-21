import config from './config';

class CommandProcessor {
  constructor(terminalInputElem) {
    this.terminalInputElem = terminalInputElem;
    this.commands = {
      ls: {
        output: {
          values: config.ls_cmd_output_value,
          type: 'row',
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
