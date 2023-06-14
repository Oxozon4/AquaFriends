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

export const AquariumContentHeader = styled.h3`
  margin-top: 0;
`;

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

export const FishItemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  position: relative;

  border: 1px solid ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
`;

export const FishItemTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.l};
  margin: 10px 0;
`;

export const FishItemDeleteIconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  position: absolute;
  top: 15px;
  right: 15px;
`;

export const DecoratorInputContainer = styled.div`
  position: relative;

  @media ${({ theme }) => theme.breakpoints.sm} {
    left: -25%;
  }
`;
