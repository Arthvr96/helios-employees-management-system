import styled from 'styled-components';
import media from 'utliltes/media';

export const WrapperWindows = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: fit-content;
  max-width: 145rem;
`;

export const WrapperDropDownWindows = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40rem;
  height: fit-content;
  margin-left: 2rem;

  ${media.desktopM`
    flex-direction: row;
    width: 82rem;
  `}
`;
