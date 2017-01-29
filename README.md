# yarn-run
Run locally-installed node module executables with yarn.


### run local executables from node_modules

Any executable available to an npm / yarn lifecycle script is available to `yarn-run`.

### run script from package.json

if no executable was found locally or global `yarn-run` will run the script of your package.json if any  

## Usage

```bash
> yarn add mocha # mocha installed in ./node_modules
> yarn-run mocha test/* # uses locally installed mocha executable
```

## Installation

```bash
> yarn global add yarn-run
```


## License

MIT
