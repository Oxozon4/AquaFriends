import styled from 'styled-components';

export const TryForFreeSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.tertiary};
  padding: 40px 50px;
`;

export const TryForFreeSectionHeader = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};
`;

export const TryForFreeSectionParagraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.l};
  padding: 10px 0 30px;
  text-align: center;
`;
