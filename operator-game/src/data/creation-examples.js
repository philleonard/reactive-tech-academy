import { Observable } from 'rxjs';

export const creationExamples = {
  // Incomplete
  // from: {
  //   label: 'Observable.from([10, 20, 30]).delayWhen(x => timer(x))',
  //   inputs: [],
  //   apply: function(inputs, scheduler) {
  //     return Observable.from([10, 20, 30]).delayWhen(x => Observable.timer(x, scheduler));
  //   }
  // },

  L: {
    label: '',
    name: 'interval',
    inputs: [],
    apply: function(inputs, scheduler) {
      return Observable.interval(10, scheduler);
    },
    description: 'create an Observable that emits a sequence of integers spaced by a given time interval',
    hint: '10',
  },

  // of: {
  //   label: 'Observable.of(1)',
  //   inputs: [],
  //   apply: function() {
  //     return Observable.of(1);
  //   }
  // },

  // timer: {
  //   label: 'Observable.timer(30, 10)',
  //   inputs: [],
  //   apply: function(inputs, scheduler) {
  //     return Observable.timer(30, 10, scheduler);
  //   }
  // },
};
