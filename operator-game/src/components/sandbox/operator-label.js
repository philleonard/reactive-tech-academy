import { div, span, button } from '@cycle/dom';

import {
  renderElevation2After,
  renderElevation2Before
} from '../../styles/utils';
import { fontCode, DIMENS, merge } from '../../styles';

function renderOperatorLabel(label) {
  let fontSize = (label.length >= 45) ? 1.3 : (label.length >= 30) ? 1.5 : 2;
  let style = merge({
    fontWeight: '400',
    fontSize: `${fontSize}rem`,
  }, fontCode);
  return span('.operatorLabel', { style }, label);
}

function renderHintButton() {
  let style = {
    position: 'absolute',
    right: '0px',
    top: '0px',
    fontSize: '2rem',
    cursor: 'pointer'
  }
  return span('.show-hint', { style }, '💡')
}

export function renderOperatorBox(label) {
  const style = {
    border: '1px solid rgba(0,0,0,0.06)',
    padding: DIMENS.spaceMedium,
    textAlign: 'center',
    position: 'relative',
  };
  return div('.operatorBox', { style }, [
    // renderElevation2Before(),
    renderOperatorLabel(label),
    renderHintButton(),
    // renderElevation2After(),
  ]);
}
