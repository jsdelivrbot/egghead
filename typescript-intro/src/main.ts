import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/interval';

import { SocialNetwork } from './social-network';

class App implements SocialNetwork {
  title = 'Eggheads';

  getUsers() {
    return [{ name: 'Vince' }];
  }
}

const app = new App();

console.log(_.isArray(new App().getUsers()));

Observable.timer(1000)
  .subscribe(x => console.log('Timer Done!'));

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
  return function(targetClass) {
    return class {
      name = new targetClass().name;
      age = age;
    }
  }
}

@addAge(26)
class Person {
  name = 'Vince';
}

console.log(new Person());
