# Contributing

## Getting Started

First, create a fork of the [Polydile/dile-components](https://github.com/Polydile/dile-components) repository by hitting the `fork` button on the GitHub page.

Next, clone our repository onto your computer.

```sh
git clone [git@github.com:Polydile/dile-components.git]
```

Once cloning is complete, change directory to the repository.

```sh
cd dile-components
```

Now add your fork as a remote (replacing YOUR_USERNAME with your GitHub username).

```sh
git remote add fork git@github.com:<YOUR_USERNAME>/dile-components.git
```

Create a new local branch.

```sh
git checkout -b my-awesome-fix
```

## Preparing Your Local Environment for Development

Now that you have cloned the repository, you need to install the dependencies.

```sh
npm install
```

This will download and install all packages needed.

This is a monorepo managed by [Lerna](https://github.com/lerna/lerna), so you need to link the local packages with lerna bootstrap.

```sh
npm run lerna bootstrap
```

To launch the demos run this command:

```sh
npm run start
```

## Making Your Changes

Make your changes to the project. Make something great!


## Committing Your Changes

Commit messages must follow the [conventional commit format](https://www.conventionalcommits.org/en/v1.0.0/)
So for example if you fix a _terrible bug_ in the package `@dile/dile-input`, the commit message should look like this:

```sh
fix(dile-input): fix terrible bug
```

## Create a Pull Request

Now it's time to push your branch that contains your committed changes to your fork.

```sh
git push -u fork my-awesome-fix
```

After a successful push, if you visit your fork on GitHub, you should see a button that will allow you to create a Pull Request from your forked branch, to our main branch.