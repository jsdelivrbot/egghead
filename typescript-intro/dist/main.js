"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/timer");
require("rxjs/add/observable/interval");
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
Observable_1.Observable.timer(1000)
    .subscribe(function (x) { return console.log('Timer Done!'); });
function addAge(age) {
}
// // Old way of doing decorators
// const person = { name: 'Vince' };
//
// function addAge(age) {
//   return function(person) {
//     return {
//       age,
//       name: person.name
//     }
//   }
// }
//
// const newPerson = addAge(26)(person);
// console.log(newPerson);
function addAge(age) {
    return function (targetClass) {
        return (function () {
            function class_1() {
                this.name = new targetClass().name;
                this.age = age;
            }
            return class_1;
        }());
    };
}
var Person = (function () {
    function Person() {
        this.name = 'Vince';
    }
    return Person;
}());
Person = __decorate([
    addAge(26)
], Person);
console.log(new Person());
