---
layout: layout.html
title: CLI
tags: configuration
---

# Dile Components CLI

The dile-components catalog provides a CLI that lets you generate components which require careful configuration work, especially those from the `@dile/crud` package, saving a significant amount of development effort.

You can find this project in the [dile-cli GitHub repository](https://github.com/Polydile/dile-cli) and the [Dile CLI documentation page](https://cli.dile-components.com), where you'll find all the documentation that provides a complete guide on how to use it, the available commands, and their various configuration options.

On this page, you can find some basic instructions as a summary.

## Installation

### Global use

```bash
npm i -g @dile/cli
# or
pnpm add -g @dile/cli
```

## Configuration

The CLI searches for configuration files using in the current directory (`process.cwd()`), in this order:

- `dile.config.js`
- `dile.config.cjs`
- `dile.config.mjs`
- `dile.config.json`
- `package.json`

### Base paths

You can configure the base output paths in this recommended way:

```js
// dile.config.js
export default {
  components: { basePath: 'src/components' },
  resources: { basePath: 'src/resources' },
};
```

As an alternative you can configure the pathis in the `package.json` file:

```json
{
  "dile": {
    "components": { "basePath": "src/components" },
    "resources": { "basePath": "src/resources" }
  }
}
```

If there is no configuration, the default values are:

- `componentsBase = "src/components"`
- `resourcesBase = "src/resources"`

## Commands

There are many commands you can use to generate different types of components. To see general help:

```bash
dile --help
```

On this website, you can find detailed commands on each of the component pages. For example, you can access the [Crud section](/crud/) to find more detailed information about the CLI commands.