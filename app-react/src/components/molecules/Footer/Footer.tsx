import { Wrapper, GreenTextWrapper, About } from './Footer-styled';

const Footer = () => {
  return (
    <Wrapper>
      <About>
        <span>Więcej informacji</span>
      </About>
      <span>
        &copy;2022 <GreenTextWrapper>B</GreenTextWrapper>ookify
      </span>
      <span>Polityka prywatności</span>
    </Wrapper>
  );
};

export default Footer;
