import { css } from 'styled-components';

export const sizes = {
  desktopXL: 1420,
  desktopM: 1350,
  desktop: 1250,
  tabletXL: 1024,
  tablet: 768,
  phone: 361,
};

export default Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});
