

Textbook is [AngularJS](http://angularjs.org) [app] which uses [rails](http://rubyonrails.org/) as a backend.

There are several advantages to this setup:

* Ability to manage the frontend app using [Yeoman](http://yeoman.io/) (including [generators](https://github.com/yeoman/generator-angular#readme)!).
* No more questions about file layout: use rails layout for rails stuff, angular-generator layout for angular stuff.
* Easily install external assets via [bower](http://bower.io/) (e.g. angularjs, jquery, twitter bootstrap, underscore, etc.).
* Write client side unit tests and run them with [karma](http://karma-runner.github.com).
* Promotes unit-testing the js codebase and removes the temptation of integration-testing everything: testing with karma is a lot faster than using capybara or a similar solution.
* [LiveReload](http://livereload.com/) support for free with yeoman's angular generator! (uses websockets, no need to install a browser plugin).

## Setting the environment up

You'll need:

* ruby 1.9.3 ([rvm](https://rvm.io/) recommended for installation)
* node 0.10.13 ([nvm](https://github.com/creationix/nvm) recommended for installation)
* Two shell sessions!

### Session one: the rails backend:

```
rvm use 1.9.3
git clone https://github.com/tl-its-umich-edu/textbook
cd simple-angular-rails-app
bundle install
bundle exec rails s -p 3000
```

**NOTE**:  the angular application was generated using these commands.

```
npm install -g yo generator-angular
mkdir ngapp; cd ngapp
yo angular notes
```

### Session two: a grunt server

```
nvm use 0.10.13
cd textbooks/ngapp
npm install -g grunt-cli
npm install
bower install
grunt server # opens a browser window... you are done!
```
