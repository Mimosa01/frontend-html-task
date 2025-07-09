import styled from 'styled-components';

export const SidebarContainer = styled.div`
  color: ${props => props.theme.textDefault};
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: ${props => (props['data-opened'] ? '220px' : '64px')};
  background: ${props => props.theme.sidebarBackground};
  transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
  box-shadow: 2px 0 8px rgba(0,0,0,0.04);
  ${props => props['data-opened'] && 'overflow: hidden;'}
`;

export const LogoRow = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 16px 16px 16px;
  gap: 12px;
`;

export const LogoImg = styled.img`
  width: 32px;
  height: 32px;
`;

export const LogoText = styled.span`
  color: ${props => props.theme.textLogo};
  font-weight: bold;
  font-size: 1.2em;
  display: ${props => props['data-active'] ? 'inline' : 'none'};
`;

export const ToggleButton = styled.button`
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  margin-left: ${props => props['data-opened'] ? '22px' : '16px'};
  margin-bottom: 0;
  padding: 10px 13px;
  border: none;
  border-radius: 100%;
  background: ${props => props['data-opened'] ? props.theme.sidebarBackgroundHover : props.theme.buttonBackground};
  color: ${props => props.theme.textDefault};
  cursor: pointer;
  font-size: 1em;
  transition: background 0.2s, margin-left 0.3s cubic-bezier(0.4,0,0.2,1);
  &:active {
    background: ${props => props.theme.buttonBackgroundActive};
  }
`;

export const NavSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  color: ${props => props['data-active'] ? props.theme.textActive : props.theme.textDefault};
  background: ${props => props['data-active'] ? props.theme.sidebarBackgroundActive : 'transparent'};
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${props => props.theme.sidebarBackgroundHover};
    color: ${props => props.theme.textHover};
  }
`;

export const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
`;

export const ThemeToggle = styled.button`
  align-self: flex-start;
  margin-bottom: 0;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background: ${props => props.theme.buttonBackground};
  color: ${props => props.theme.textDefault};
  cursor: pointer;
  font-size: 1em;
  transition: background 0.2s;
  &:active {
    background: ${props => props.theme.buttonBackgroundActive};
  }
`; 