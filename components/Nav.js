import Link from 'next/link';
import styled from '@emotion/styled';

const NavContainerStyled = styled.div`
  position: fixed;
  width: var(--nav-width);
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  align-content: center;
  padding: var(--size-4) 0;
  background-color: ${(props) => props.backgroundColour};
`;
const NavStyled = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NavItem = styled.h3`
  font-size: var(--nav-title);
  writing-mode: vertical-lr;
  transform: rotate(-180deg);
  text-transform: uppercase;
`;

const Nav = ({ backgroundColour = 'var(--colour-page-background)' }) => {
  return (
    <NavContainerStyled backgroundColour={backgroundColour}>
      <Link href='/' passHref={true} scroll={false}>
        <a>
          <svg
            width='48'
            height='48'
            viewBox='0 0 48 48'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect width='48' height='48' rx='6' fill='#FFFBF2' />
            <path
              d='M25.0349 34.384C29.7389 34.384 32.4269 31.792 33.9629 29.136L30.0589 27.248C29.1629 29.008 27.2429 30.352 25.0349 30.352C21.1629 30.352 18.3469 27.376 18.3469 23.344C18.3469 19.312 21.1629 16.336 25.0349 16.336C27.2429 16.336 29.1629 17.712 30.0589 19.44L33.9629 17.52C32.4589 14.864 29.7389 12.304 25.0349 12.304C18.6349 12.304 13.6749 16.784 13.6749 23.344C13.6749 29.904 18.6349 34.384 25.0349 34.384Z'
              fill='#041D1F'
            />
          </svg>
        </a>
      </Link>

      <NavStyled>
        <NavItem>Projects</NavItem>
        <Link href='/photography'>
          <a>
            <NavItem>Photography</NavItem>
          </a>
        </Link>
        <NavItem>Info</NavItem>
      </NavStyled>
    </NavContainerStyled>
  );
};

export default Nav;
