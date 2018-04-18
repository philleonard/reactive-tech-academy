import { div } from '@cycle/dom';
import { Observable } from 'rxjs';
import { apply, flip, identity, length, map, merge, prop, zip } from 'ramda';

import { Collection } from '../../collection';
import { examples } from '../../data';
import { bgWhite } from '../../styles';
import { merge as mergeStyles, elevation1 } from '../../styles/utils';

import { Timeline } from '../timeline';

import { createOutputStream$ } from './sandbox-output';
import { inputsToTimelines } from './sandbox-input';
import { renderOperatorBox } from './operator-label';


const sandboxStyle = mergeStyles(bgWhite, elevation1, { borderRadius: '2px' });

export function Sandbox({ DOM, store }) {
  const example$ = store.pluck('route')
    .skip(1) // blank first route
    .distinctUntilChanged()
    .map(exampleKey => examples[exampleKey])
    .publishReplay(1).refCount();

  const inputStores$ = example$
    .switchMap(example =>
      store.pluck('inputs')
        .filter(identity)
        // bug: For some reason inputDataList$ emits old value after
        // route change. Skip it.
        .skip(1)
        .startWith(inputsToTimelines(example.inputs))
    )
    .publishReplay(1).refCount();

  const outputStore$ = createOutputStream$(example$, inputStores$);
  const outputTimelineSources$ = {
    DOM,
    marbles: outputStore$.pluck('marbles'),
    end: outputStore$.pluck('end'),
    interactive: Observable.of(false),
  };

  const inputTimelines$
    = Collection.gather(Timeline, { DOM }, inputStores$, 'id')
      .publishReplay(1).refCount()
  const outputTimeline = Timeline(outputTimelineSources$);

  const inputDOMs$ = Collection.pluck(inputTimelines$, prop('DOM'));
  const inputDataList$ = Collection.pluck(inputTimelines$, prop('data'))
    .filter(length)
    .debounceTime(0)
    .withLatestFrom(inputStores$, zip)
    .map(map(apply(flip(merge))));

  const hintButton$ = DOM.select('.show-hint').events('click');
  const showHint$ = Observable.merge(example$.switchMap(e => hintButton$.scan((acc, event) => !acc, false)), example$.map(e => false));
  // const showHint$ = Observable.merge(hintButton$.scan((acc, event) => !acc, true), example$.map(e => false));

  const vtree$ = Observable
    .combineLatest(inputDOMs$, outputTimeline.DOM, example$, showHint$)
    .map(([inputsDOMs, outputDOM, example, showHint]) =>
      div({ style: sandboxStyle }, [
        ...inputsDOMs,
        renderOperatorBox(showHint && example.hint ? example.hint : ''),
        outputDOM,
      ]),
    );

  return {
    DOM: vtree$,
    data: inputDataList$.map((inputs) => ({ inputs })),
  };
}
