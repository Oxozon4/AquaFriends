import styled from 'styled-components';

export const WhyUsSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 50px;

  @media ${({ theme }) => theme.breakpoints.sm} {
    padding: 40px 50px;
  }
`;

export const WhyUsSectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};
  width: 100%;
  margin-left: 5%;
  text-align: center;
`;

export const WhyUsSectionCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media ${({ theme }) => theme.breakpoints.sm} {
    flex-direction: row;
  }
`;
