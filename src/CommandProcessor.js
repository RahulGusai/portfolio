class CommandProcessor {
  constructor(terminalInputElem) {
    this.terminalInputElem = terminalInputElem;
    this.commands = {};
  }

  processCommand(commandName) {
    this.terminalInputElem.current.value = '';
    if (!this.commands.hasOwnProperty(commandName)) {
      console.log('Command not found..');
      return 'Command not found';
    }
  }
}

export default CommandProcessor;
