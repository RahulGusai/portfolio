import config from './config';

class CommandProcessor {
  constructor(terminalInputElem, setDirsNavigated, setAutoCompleteOutput) {
    this.terminalInputElem = terminalInputElem;
    this.setDirsNavigated = setDirsNavigated;
    this.setAutoCompleteOutput = setAutoCompleteOutput;
    this.commands = {
      emptyCommand: {
        description: 'When user submits empty command',
        handler: function (arg, dirsNavigated) {
          return config.cmd_output_with_no_data;
        },
      },

      default: {
        description: 'Default command when the user enters an invalid command',
        handler: function (arg, dirsNavigated) {
          console.log(this.commands.default);
          const outputMessage = `Command not found: ${this.commands.default.cmdName}`;
          const cmdOutput = {
            data: [{ value: outputMessage }],
            type: 'row',
          };
          return cmdOutput;
        },
      },
      ls: {
        description: 'Lists all the files in the present directory',
        outputType: 'column',
        handler: function (commandArg, dirsNavigated) {
          const updatedDirsNavigated = [...dirsNavigated];
          if (commandArg) {
            const filter = { value: null };
            const retValue = this.parseCommandArg(
              commandArg,
              updatedDirsNavigated,
              filter
            );
            if (retValue || filter.value) {
              const outputMessage = `ls: ${commandArg}: No such file or directory`;
              return {
                data: [{ value: outputMessage }],
                type: 'row',
              };
            }
          }
          const currentDir =
            updatedDirsNavigated.length === 0
              ? 'home'
              : updatedDirsNavigated[updatedDirsNavigated.length - 1];
          const { output } = config.system_dirs[currentDir];
          return output;
        },
        autoCompleteHandler: function (command, commandArg, dirsNavigated) {
          return this.genericAutoCompleteHandler(
            command,
            commandArg,
            dirsNavigated
          );
        },
      },

      cd: {
        description: 'Change the current directory',
        handler: function (commandArg, dirsNavigated) {
          const updatedDirsNavigated = [...dirsNavigated];
          if (!commandArg) {
            updatedDirsNavigated.length = 0;
            this.setDirsNavigated(updatedDirsNavigated);
            return config.cmd_output_with_no_data;
          }

          const cmdArgDirectories = commandArg.split('/');

          for (const dir of cmdArgDirectories) {
            const currentDir =
              updatedDirsNavigated.length === 0
                ? 'home'
                : updatedDirsNavigated[updatedDirsNavigated.length - 1];
            const dirsInCurrentDir = config.system_dirs[currentDir].directories;

            switch (dir) {
              case '':
                break;
              case '.':
                break;
              case '..':
                updatedDirsNavigated.pop();
                this.setDirsNavigated(updatedDirsNavigated);
                break;
              default:
                if (dirsInCurrentDir.includes(dir)) {
                  this.setDirsNavigated([...updatedDirsNavigated, dir]);
                  break;
                }
                return {
                  data: [
                    { value: `cd: no such file or directory: ${commandArg}` },
                  ],
                  type: 'row',
                };
            }
          }
          return config.cmd_output_with_no_data;
        },
        autoCompleteHandler: function (command, commandArg, dirsNavigated) {
          return this.genericAutoCompleteHandler(
            command,
            commandArg,
            dirsNavigated
          );
        },
      },

      pwd: {
        description: 'Print the path to the current working directory.',
        handler: function (commandArg, dirsNavigated) {
          if (commandArg) {
            return {
              data: [{ value: 'pwd: too many arguements' }],
              type: 'row',
            };
          }
          const pwdStr =
            dirsNavigated.length === 0
              ? '/home'
              : `/home/${dirsNavigated.join('/')}`;
          return { data: [{ value: pwdStr }], type: 'row' };
        },
        autoCompleteHandler: function (command, commandArg, dirsNavigated) {
          return config.cmd_output_with_no_data;
        },
      },

      help: {
        description: '',
        handler: function handler(commandArg, dirsNavigated) {
          if (commandArg) {
            return {
              data: [{ value: 'help: too many arguements' }],
              type: 'row',
            };
          }

          const data = [
            {
              value: `You can run the following commands to explore this terminal and learn more about me.
                 It stores the history of commands and supports auto-completion as well.😎`,
            },
          ];

          const cmdsDescription = [];
          Object.entries(this.commands)
            .filter(
              ([key]) =>
                key !== 'default' && key !== 'help' && key !== 'emptyCommand'
            )
            .forEach(([key, value]) => {
              const { description } = value;
              cmdsDescription.push(
                { value: key },
                { value: `-- ${description}` }
              );
            });

          const usage = [
            { value: `Not sure how to proceed ?` },
            {
              value: `Enter "ls skills" to view the skills or "ls projects" to see projects.`,
            },
          ];

          return {
            data: [...data, ...cmdsDescription, ...usage],
            type: 'column',
          };
        },
        autoCompleteHandler: function (command, commandArg, dirsNavigated) {
          return config.cmd_output_with_no_data;
        },
      },
      clear: {
        description: 'Clears everything on the terminal.',
        handler: function handler(arg, dirsNavigated) {
          return {
            data: [],
          };
        },
        autoCompleteHandler: function (command, commandArg, dirsNavigated) {
          return config.cmd_output_with_no_data;
        },
      },
    };
    this.commands.help.handler = this.commands.help.handler.bind(this);
    this.commands.ls.handler = this.commands.ls.handler.bind(this);
    this.commands.cd.handler = this.commands.cd.handler.bind(this);
    this.commands.ls.autoCompleteHandler =
      this.commands.ls.autoCompleteHandler.bind(this);
    this.commands.cd.autoCompleteHandler =
      this.commands.cd.autoCompleteHandler.bind(this);
    this.commands.default.handler = this.commands.default.handler.bind(this);
  }

  genericAutoCompleteHandler = (command, commandArg, dirsNavigated) => {
    const updatedDirsNavigated = [...dirsNavigated];
    const filter = { value: null };

    if (commandArg) {
      const retValue = this.parseCommandArg(
        commandArg,
        updatedDirsNavigated,
        filter
      );
      if (retValue) return retValue;
    }

    const currentDir =
      updatedDirsNavigated.length === 0
        ? 'home'
        : updatedDirsNavigated[updatedDirsNavigated.length - 1];

    const data = [];
    for (const dir of config.system_dirs[currentDir].directories) {
      if (filter.value) {
        if (dir.startsWith(filter.value)) {
          data.push({ value: dir });
        }
      } else data.push({ value: dir });
    }

    if (data.length === 1) {
      const cmdArgList = commandArg.split('/').slice(0, -1);
      const prefix = cmdArgList.length > 0 ? `${cmdArgList.join('/')}/` : '';
      const [input] = data;
      this.terminalInputElem.current.value = `${command} ${prefix}${input.value}`;
      return;
    }
    return { data, type: 'row' };
  };

  parseCommandArg = (commandArg, updatedDirsNavigated, filter) => {
    const cmdArgDirectories = commandArg.split('/');
    for (let i = 0; i < cmdArgDirectories.length; i++) {
      const currentDir =
        updatedDirsNavigated.length === 0
          ? 'home'
          : updatedDirsNavigated[updatedDirsNavigated.length - 1];
      const dirsInCurrentDir = config.system_dirs[currentDir].directories;

      switch (cmdArgDirectories[i]) {
        case '':
          break;
        case '.':
          break;
        case '..':
          updatedDirsNavigated.pop();
          break;
        default:
          if (dirsInCurrentDir.includes(cmdArgDirectories[i])) {
            updatedDirsNavigated.push(cmdArgDirectories[i]);
          } else if (i < cmdArgDirectories.length - 1) {
            return config.cmd_output_with_no_data;
          } else {
            filter.value = cmdArgDirectories[i];
          }
      }
    }
  };

  handleCommandAutoComplete = (dirsNavigated) => {
    const terminalInputValue = this.terminalInputElem.current.value;
    if (terminalInputValue.length === 0) return;

    const [cmd, cmdArg] = terminalInputValue.split(' ');

    if (this.commands.hasOwnProperty(cmd)) {
      const autoCompleteOutput = this.commands[cmd].autoCompleteHandler(
        cmd,
        cmdArg,
        dirsNavigated
      );
      this.setAutoCompleteOutput(autoCompleteOutput);
    } else {
      if (cmdArg) return;

      const autoCompleteOutput = [];
      for (const key in this.commands) {
        if (key.startsWith(cmd)) {
          autoCompleteOutput.push({ value: key });
        }
      }

      if (autoCompleteOutput.length === 1) {
        const [input] = autoCompleteOutput;
        this.terminalInputElem.current.value = input.value;
        return;
      }
      this.setAutoCompleteOutput({ data: autoCompleteOutput, type: 'row' });
    }
  };

  getCommandObject(commandName) {
    this.terminalInputElem.current.value = '';

    if (commandName.length === 0) {
      return this.commands.emptyCommand;
    }

    if (
      commandName === 'default' ||
      commandName === 'emptyCommand' ||
      !this.commands.hasOwnProperty(commandName)
    ) {
      this.commands.default.cmdName = commandName;
      return this.commands.default;
    }

    return this.commands[commandName];
  }
}

export default CommandProcessor;
