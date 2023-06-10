import styled from 'styled-components';

export const AquariumModalContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const AquariumModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  padding: 0 15px;
`;

export const AquariumContentWrapper = styled.div`
  padding: 17px 16% 35px;
`;

export const AquariumContentHeader = styled.h3``;

export const AquariumContentDescription = styled.p``;

export const AquariumForm = styled.form``;

export const AquariumModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 6px 24px;
`;
