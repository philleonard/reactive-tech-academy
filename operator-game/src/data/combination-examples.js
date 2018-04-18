import { Observable } from 'rxjs';

/* t = time, c = content */
export const combinationExamples = {
  A: {
    name: 'combineLatest',
    label: '',
    inputs: [
      [{t:0, c:1}, {t:20, c:2}, {t:65, c:3}, {t:75, c:4}, {t:92, c:5}],
      [{t:10, c:'A'}, {t:25, c:'B'}, {t:50, c:'C'}, {t:57, c:'D'}]
    ],
    apply: function(inputs) {
      return Observable.combineLatest(inputs[0], inputs[1],
        (x, y) => ('' + x.content + y.content)
      );
    },
    description: 'when an item is emitted by either of two Observables, combine the latest item emitted by each Observable via a specified function and emit items based on the results of this function',
    hint: '(x, y) => "" + x + y',
  },

  B: {
    label: '',
    name: 'concat',
    inputs: [
      [{t:0, c:1}, {t:15, c:1}, {t:50, c:1}, 57],
      [{t:0, c:2}, {t:8, c:2}, 12]
    ],
    apply: function(inputs) {
      return Observable.concat(...inputs);
    },
    description: 'emit the emissions from two or more Observables without interleaving them',
    hint: 'operator(source1, source2)',
  },

  C: {
    label: '',
    name: 'merge',
    inputs: [
      [{t:0, c:20}, {t:15, c:40}, {t:30, c:60}, {t:45, c:80}, {t:60, c:100}],
      [{t:37, c:1}, {t:68, c:1}]
    ],
    apply: function(inputs) {
      return Observable.merge(...inputs);
    },
    description: 'combine multiple Observables into one by merging their emissions',
    hint: 'operator(source1, source2)',
  },

  // race: {
  //   label: 'race',
  //   inputs: [
  //     [{t:10, c:20}, {t:20, c:40}, {t:30, c:60}],
  //     [{t:5, c:1}, {t:15, c:2}, {t:25, c:3}],
  //     [{t:20, c:0}, {t:32, c:0}, {t:44, c:0}]
  //   ],
  //   apply: function(inputs) {
  //     return Observable.race(inputs);
  //   }
  // },

  // startWith: {
  //   label: 'startWith(1)',
  //   inputs: [
  //     [{t:30, c:2}, {t:40, c:3}]
  //   ],
  //   apply: function(inputs, scheduler) {
  //     return inputs[0].startWith(1, scheduler);
  //   }
  // },

  D: {
    name: 'withLatestFrom',
    label: '',
    inputs: [
      [{t:0, c:1}, {t:20, c:2}, {t:65, c:3}, {t:75, c:4}, {t:92, c:5}],
      [{t:10, c:'A'}, {t:25, c:'B'}, {t:50, c:'C'}, {t:57, c:'D'}]
    ],
    apply: function(inputs) {
      return inputs[0].withLatestFrom(inputs[1],
        (x, y) => ('' + x.content + y.content)
      );
    },
    description: 'when an item is emitted by the source Observable, combine the latest item emitted by each Observable via a specified function and emit items based on the results of this function',
    hint: '(x, y) => "" + x + y',
  },

  E: {
    label: '',
    name: 'zip',
    inputs: [
      [{t:0, c:1}, {t:20, c:2}, {t:65, c:3}, {t:75, c:4}, {t:92, c:5}],
      [{t:10, c:'A'}, {t:25, c:'B'}, {t:50, c:'C'}, {t:57, c:'D'}]
    ],
    apply: function(inputs) {
      return Observable.zip(inputs[0], inputs[1],
        (x, y) => ('' + x.content + y.content)
      );
    },
    description: 'combine the emissions of multiple Observables together via a specified function and emit single items for each combination based on the results of this function',
    hint: '(x, y) => "" + x + y',
  },
}