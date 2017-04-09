"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
require("rxjs/add/observable/timer");
require("rxjs/add/observable/interval");
// Observable.interval(1000)
//   .subscribe(x => console.log(x));
var App = (function () {
    function App() {
        this.title = 'Eggheads';
    }
    App.prototype.getUsers = function () {
        return [{ name: 'Vince' }];
    };
    return App;
}());
var app = new App();
console.log(_.isArray(new App().getUsers()));
