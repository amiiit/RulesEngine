# Rules Engine - Hubrick's frontend challenge

Rules engine is a cli utility that parses and validates data against a set of rules. This is a learning challenge and nothing that should be used in production.

```
git clone git@github.com:amitit/RulesEngine.git
cd RulesEngine
npm install
```

Try the utility with the supplied input data (see `assets/`):

```
npm run try
```


For building the utility:
```
npm run build
```

The the utility can then be executed for example as follows:

```
node build/rulesengine-cli.js -v assets/fnv-values.json -r assets/fruit-n-veg-rules.json
```

For running the tests

```
npm test
```




## Theoretical todo list

- terminal UI
- support more formats for rules and values
- integrate eslint