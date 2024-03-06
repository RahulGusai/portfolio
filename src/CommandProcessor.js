import { Breadcrumb } from 'semantic-ui-react';
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
          return config.default_cmd_output_list;
        },
      },
      ls: {
        description: 'Lists all the files in the present directory',
        outputType: 'column',
        handler: function (commandArg, dirsNavigated) {
          const directory =
            dirsNavigated.length === 0
              ? 'home'
              : dirsNavigated[dirsNavigated.length - 1];

          const currentDir = config.system_dirs[directory];
          if (commandArg) {
            const { directories, output } = currentDir;
            if (directories.includes(commandArg)) {
              return config.system_dirs[commandArg].output;
            } else {
              for (const file of output.data) {
                if (file.value === commandArg) {
                  return { data: [{ value: file.value }], type: 'row' };
                }
              }
              return {
                data: [{ value: 'ls: No such file or directory' }],
                type: 'row',
              };
            }
          }

          const { output } = currentDir;
          return output;
        },
        autoCompleteHandler: function (commandArg, dirsNavigated) {
          const currentDir =
            dirsNavigated.length === 0
              ? 'home'
              : dirsNavigated[dirsNavigated.length - 1];

          if (['skills', 'about', 'contact-info'].includes(currentDir)) {
            return config.cmd_output_with_no_data;
          }

          const { output } = config.system_dirs[currentDir];
          return output;
        },
      },

      cd: {
        description: 'Change the current directory',
        handler: function (commandArg, dirsNavigated) {
          if (!commandArg) {
            this.setDirsNavigated([]);
            return config.cmd_output_with_no_data;
          }

          const cmdArgDirectories = commandArg.split('/');
          console.log(cmdArgDirectories);

          for (const dir of cmdArgDirectories) {
            const currentDir =
              dirsNavigated.length === 0
                ? 'home'
                : dirsNavigated[dirsNavigated.length - 1];
            const dirsInCurrentDir = config.system_dirs[currentDir].directories;

            switch (dir) {
              case '':
                break;
              case '.':
                break;
              case '..':
                const updatedDirsNavigated = [...dirsNavigated];
                updatedDirsNavigated.pop();
                this.setDirsNavigated(updatedDirsNavigated);
                break;
              default:
                if (dirsInCurrentDir.includes(dir)) {
                  this.setDirsNavigated((dirsNavigated) => [
                    ...dirsNavigated,
                    dir,
                  ]);
                  break;
                }
                return {
                  data: [{ value: 'cd: No such file or directory' }],
                  type: 'row',
                };
            }
          }
          return config.cmd_output_with_no_data;
        },
        autoCompleteHandler: function (commandArg, dirsNavigated) {
          const currentDir =
            dirsNavigated.length === 0
              ? 'home'
              : dirsNavigated[dirsNavigated.length - 1];

          const data = [];
          for (const dir of config.system_dirs[currentDir].directories) {
            data.push({ value: dir });
          }

          return { data, type: 'row' };
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
        autoCompleteHandler: function (commandArg, dirsNavigated) {
          return config.cmd_output_with_no_data;
        },
      },

      help: {
        description: '',
        handler: null,
        autoCompleteHandler: function (commandArg, dirsNavigated) {
          return config.cmd_output_with_no_data;
        },
      },
    };
    this.commands.help.handler = this.createHelpCmdOutput.bind(this);
    this.commands.cd.handler = this.commands.cd.handler.bind(this);
  }

  handleCommandAutoComplete = (dirsNavigated) => {
    const terminalInputValue = this.terminalInputElem.current.value;
    if (terminalInputValue.length === 0) return;

    const [cmd, cmdArg] = terminalInputValue.split(' ');

    if (this.commands.hasOwnProperty(cmd)) {
      const autoCompleteOutput = this.commands[cmd].autoCompleteHandler(
        cmdArg,
        dirsNavigated
      );

      if (!cmdArg) {
        this.setAutoCompleteOutput(autoCompleteOutput);
        return;
      }

      const filteredAutoCompleteOutput = [];
      for (const dataObject of autoCompleteOutput.data) {
        if (dataObject.value.startsWith(cmdArg)) {
          filteredAutoCompleteOutput.push(dataObject);
        }
      }
      this.setAutoCompleteOutput({
        data: filteredAutoCompleteOutput,
        type: 'row',
      });
    } else {
      if (cmdArg) return;

      const autoCompleteOutput = [];
      for (const key in this.commands) {
        if (key.startsWith(cmd)) {
          autoCompleteOutput.push({ value: key });
        }
      }
      this.setAutoCompleteOutput({ data: autoCompleteOutput, type: 'row' });
    }
  };

  handleDirsNavigatedStateChange(commandArg, dirsNavigated) {
    if (!commandArg) {
      this.setDirsNavigated([]);
      return;
    }

    const cmdArgDirectories = commandArg.split('/');
    console.log(cmdArgDirectories);

    for (const dir of cmdArgDirectories) {
      const currentDir =
        dirsNavigated.length === 0
          ? 'home'
          : dirsNavigated[dirsNavigated.length - 1];
      const dirsInCurrentDir = config.system_dirs[currentDir].directories;

      switch (dir) {
        case '':
          break;
        case '.':
          break;
        case '..':
          const updatedDirsNavigated = [...dirsNavigated];
          updatedDirsNavigated.pop();
          this.setDirsNavigated(updatedDirsNavigated);
          break;
        default:
          if (dirsInCurrentDir.includes(dir)) {
            this.setDirsNavigated((dirsNavigated) => [...dirsNavigated, dir]);
            break;
          }
          return {
            data: [{ value: 'cd: No such file or directory' }],
            type: 'row',
          };
      }
    }
  }

  createHelpCmdOutput(commandArg, dirsNavigated) {
    if (commandArg) {
      return { data: [{ value: 'help: too many arguements' }], type: 'row' };
    }

    const data = [
      {
        value:
          'You can run the following commands to play around this terminal and know more about me. :)',
      },
    ];

    const cmdsDescription = [];
    Object.entries(this.commands)
      .filter(
        ([key]) => key !== 'default' && key !== 'help' && key !== 'emptyCommand'
      )
      .forEach(([key, value]) => {
        const { description } = value;
        cmdsDescription.push({ value: key }, { value: `-- ${description}` });
      });

    return { data: [...data, ...cmdsDescription], type: 'column' };
  }

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
      return this.commands.default;
    }

    return this.commands[commandName];
  }
}

export default CommandProcessor;
