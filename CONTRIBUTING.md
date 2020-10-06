# Contributing to Ethopedia

Want to contribute to the project? This document outlines how to do it.

## Which repository should I contribute to?

Ethopedia has two main repositories:

0. [The site](https://github.com/ethopedia/site) (The one you're in right now)
0. [The graphql api](https://github.com/ethopedia/api)

If you are interested in contributing to the api, you can follow the [contributing guidelines](https://github.com/ethopedia/api/blob/master/CONTRIBUTING.md) for that repository.

If you are interested in contributing to the site, read on.

## Table of Contents

0. [How to contribute](#how-to-contribute)
0. [Style guide](#style-guide)
0. [Setting up your environment](#setting-up-your-environment)

## How to contribute

If you'd like to contribute, start by searching through the [issues](https://github.com/ethopedia/site/issues) and [pull requests](https://github.com/ethopedia/site/pulls) to see whether someone else has raised a similar idea or question.

If you don't see your idea listed, and you think it fits into the goals of this project, do one of the following:
* **If your contribution is minor,** such as a typo fix, open a pull request.
* **If your contribution is major,** such as an update to the existing site interface, start by opening an issue first. That way, other people can weigh in on the discussion before you do any work.

Please create a new branch for each feature you are adding.

## Style guide
When contributing code to this project, please prefer typescript to javascript and try to adhere to the coding conventions outlined [here](https://google.github.io/styleguide/jsguide.html) and [here](https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md).

*While writing clean code is important, it's better to have messy code that works than nothing! So don't stress too much over it :)*


## Setting up your environment

This site is powered by [React](https://reactjs.org/). Running it on your local machine requires [npm](https://www.npmjs.com/) to be installed on your machine.
You can find out how to install it [here](https://www.npmjs.com/get-npm).

Once you have that set up, make sure you are in the project's root directory and run:

`npm install` to install any dependencies

If you are only working on the site and are ok with using the production api then run:

`npm run start:with-production-api`

…and open http://localhost:3000 in your web browser.

If you are running the api locally and want to use that instance, then create a file named `.env.development` and copy the contents of the
`template.env.development` file into it. Then run `npm start` and open http://localhost:3000 in your web browser.
