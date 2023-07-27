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
We leverage prompt engineering and are inspired by [TypeChat](https://github.com/microsoft/TypeChat/),
directing the LLM into responding in a machine-readable way.

Configuration is read through a Waffiefile where you can specify test files, API providers,
and model versions.

Results are returned so you can compare across multiple models and time.

# Usage
<!-- usage -->
```sh-session
$ npm install -g waffie
$ waffie file examples/sentiment-analysis/Waffiefile
```
<!-- usagestop -->


# Commands
<!-- commands -->
* [`waffie file WAFFIEFILE`](#waffie-file-waffiefile)
* [`waffie help [COMMANDS]`](#waffie-help-commands)

## `waffie file WAFFIEFILE`

Compare input and expected output

```
USAGE
  $ waffie file WAFFIEFILE

ARGUMENTS
  WAFFIEFILE Path to Waffiefile

FLAGS

DESCRIPTION
  Compare input and expected output across different providers and models

EXAMPLES
  $ waffie file examples/sentiment-analysis/Waffiefile
  {
    file: '/Users/rogerlam/waffie/examples/sentiment-analysis/test/feedback.csv',
    count: 22,
    passed: 22,
    allPassed: true
  }
```
