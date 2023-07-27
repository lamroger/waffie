Waffie CLI
=================

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Why
LLMs are statistical alien interns. They can pattern match and reach conclusions but
don't tell you how confident they are in their answers. Maybe today they're wrong 2%
of the time. In a month, they learn new things and start becoming wrong 5% of the time.
Now the planet of Anthropic's interns are better at sentiment analysis.

Concepts like loss calculation and model drift already exist in traditional machine learning settings. The Waffie CLI is built to help make those concepts accessible to software developers leveraging LLM APIs, enabling them to create the best out-of-this-world solutions possible.

## How
We leverage prompt engineering and [TypeChat](https://github.com/microsoft/TypeChat/) to
direct the LLM into responding in a machine-readable way.

Configuration is read through a Waffiefile where you can specify test files, API providers,
and model versions.

Results are returned so you can compare across multiple models and time.

# Usage
<!-- usage -->
```sh-session
$ npm install -g waffie
$ waffie COMMAND
running command...
$ waffie (--version)
waffie/0.0.0 darwin-x64 node-v18.9.0
$ waffie --help [COMMAND]
USAGE
  $ waffie COMMAND
...
```
<!-- usagestop -->


# Commands
<!-- commands -->
* [`waffie hello PERSON`](#waffie-hello-person)
* [`waffie hello world`](#waffie-hello-world)
* [`waffie help [COMMANDS]`](#waffie-help-commands)

## `waffie hello PERSON`

Say hello

```
USAGE
  $ waffie hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/lamroger/waffie/blob/v0.0.0/dist/commands/hello/index.ts)_

## `waffie hello world`

Say hello world

```
USAGE
  $ waffie hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ waffie hello world
  hello world! (./src/commands/hello/world.ts)
```

## `waffie help [COMMANDS]`

Display help for waffie.

```
USAGE
  $ waffie help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for waffie.
```
<!-- commandsstop -->
