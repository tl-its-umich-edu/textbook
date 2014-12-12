

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
* npm ([npm](http://nodejs.org/download/))
* Two shell sessions!

### Configuration

* Put local_env.yml in textbook/config
* Put CERT files inside /System/Library/OpenSSL/certs/


### Session one: the rails backend:

```
rvm use 1.9.3
git clone https://github.com/tl-its-umich-edu/textbook
cd textbook
bundle install
nohup bundle exec rails s -p 3000 &
```

### Session two: a grunt server

```
cd textbooks/ngapp
sudo npm install -g grunt-cli
sudo npm install -g bower
npm install
bower install
nohup grunt serve & # opens a browser window... you are done!
```

#License#

Copyright (c) 2014 University of Michigan

Licensed under the Educational Community License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

[http://www.osedu.org/licenses/ECL-2.0](http://www.osedu.org/licenses/ECL-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
