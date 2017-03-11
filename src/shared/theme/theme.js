import { css } from 'styled-components';

const SIZES = {
  large: 1200,
  medium: 976,
  small: 768,
};

export const media = Object.keys(SIZES).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = SIZES[label] / 16;
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)}
    }
  `;
  return accumulator;
}, {});

export const BOLDR_NS = 'boldrui-';

export const StyleClasses = {
  APP: `${BOLDR_NS}app`,
  FOOTER: `${BOLDR_NS}footer`,
};
