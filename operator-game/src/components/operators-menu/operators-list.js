import { div, li, ul, label } from '@cycle/dom';
import { keys, merge, toPairs } from 'ramda';

import { shuffle } from './operators-utils';

import { greyDark, DIMENS } from '../../styles';
import { examples } from '../../data';

const operatorsMenuStyle = {
    marginLeft: DIMENS.spaceLarge,
    boxSizing: 'border-box',
    overflowY: 'scroll',
    height: 'calc(100vh - 150px)'
};

const operatorsMenuItemStyle = merge({
    fontSize: '1rem',
    lineHeight: '1.6rem'
}, greyDark);

const categoryMenuStyle = {
    margin: '0',
    padding: '0',
    listStyleType: 'none',
};

function renderOperatorItem(operator, description) {
    return label({ attrs: { title: `${description}` } }, [ `${operator}` ]);
}

export function renderOperatorsList() {
    const links = shuffle(keys(examples))
        .map(key => examples[key])
        .map(example => li({ style: operatorsMenuItemStyle }, [ renderOperatorItem(example.name, example.description) ]))


    return div(
        { style: operatorsMenuStyle },
        [
            ul({ style: categoryMenuStyle }, [ ...links ]),
        ],
    );
}