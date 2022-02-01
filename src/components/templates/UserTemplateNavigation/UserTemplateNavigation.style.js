import styled from 'styled-components';
import { LogoImg } from 'components/atoms/LogoImg/LogoImg';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow-x: hidden;
`;

export const NavigationWrapper = styled.div`
  position: relative;
  z-index: 2500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  padding: 0 2.5rem;
`;

export const StyledLogoImg = styled(LogoImg)`
  width: 9rem;
  height: 1.7rem;
  background-size: cover;
`;
