<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script> If you’re using our compiled JavaScript and prefer to include Popper separately, add Popper before our JS, via a CDN preferably. <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script> <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js" integrity="sha384-IDwe1+LCz02ROU9k972gdyvl+AESN10+x7tBKgc9I5HFtuNz0wWnPclzo6p9vxnk" crossorigin="anonymous"></script>

Package managers Pull in Bootstrap’s source files into nearly any project with some of the most popular package managers. No matter the package manager, Bootstrap will require a Sass compiler and Autoprefixer for a setup that matches our official compiled versions.

npm Install Bootstrap in your Node.js powered apps with the npm package:

npm install bootstrap@5.2.2 const bootstrap = require('bootstrap') or import bootstrap from 'bootstrap' will load all of Bootstrap’s plugins onto a bootstrap object. The bootstrap module itself exports all of our plugins. You can manually load Bootstrap’s plugins individually by loading the /js/dist/\*.js files under the package’s top-level directory.

This is a student project that was created at CodeOp, a full stack development bootcamp in Barcelona.

# Price_tracker

price tracker that track online store's products price and notify user when the price drops

# Usage

Track the of given url product, if the product drop the price, then send a notification to the user.
Also you can use for the collect products from different sites

# Technologies used

React
Bootstrap
Express
NPM package rss-parser for reading RSS feeds
MySQL

![alt text](./App_look.png "app_main_page")
