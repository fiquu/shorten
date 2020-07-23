# @fiquu/shorten

[![Build Status](https://travis-ci.org/fiquu/shorten.svg?branch=master)](https://travis-ci.org/fiquu/shorten)
![GitHub](https://img.shields.io/github/license/fiquu/shorten)
![GitHub last commit](https://img.shields.io/github/last-commit/fiquu/shorten)
![npm (scoped)](https://img.shields.io/npm/v/@fiquu/shorten)
![npm](https://img.shields.io/npm/dw/@fiquu/shorten)

Dependency-free and configurable tool to shorten (truncate) a string keeping whole words by default.

## Installation

```sh
npm i @fiquu/shorten
```

## Usage

```ts
import shorten from `@fiquu/shorten`;

const short = shorten('Some long string to shorten with many possible words to split into.');
// 'Some long string to shorten with many possible...'
```

## Documentation

See [the documentaion page](https://fiquu.github.io/shorten/) for more info and options.
