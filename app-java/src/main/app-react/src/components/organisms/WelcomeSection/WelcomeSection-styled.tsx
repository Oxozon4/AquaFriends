import styled from 'styled-components';

import Aquarium from '../../../assets/images/Aquarium.jpg';

export const SectionWrapper = styled.div`
  background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.6) 11.53%,
      rgba(0, 0, 0, 0.35) 88%
    ),
    url(${Aquarium});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  padding: 120px 2rem 80px;

  @media ${({ theme }) => theme.breakpoints.sm} {
    padding: 200px 2rem 120px;
  }
`;

export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.white};
`;

export const SectionContent = styled.p`
  color: ${({ theme }) => theme.colors.white};
  padding: 20px 0;
`;
