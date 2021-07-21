import styled from '@emotion/styled';
import Nav from '../components/Nav';
const ContainerStyled = styled.div`
  background-color: ${(props) => props.backgroundColour};
  min-height: 100vh;
  margin-left: var(--nav-width);
`;

const Layout = ({
  children,
  backgroundColour = 'var(--colour-page-background)',
}) => {
  return (
    <ContainerStyled backgroundColour={backgroundColour}>
      <Nav backgroundColour={backgroundColour} />
      {children}
    </ContainerStyled>
  );
};

export default Layout;
