import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo.png';
import {
  SidebarContainer,
  LogoRow,
  LogoImg,
  LogoText,
  ToggleButton,
  NavSection,
  NavItem,
  BottomSection,
  ThemeToggle
} from '../../styled/Sidebar.styled';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const routes = [
  { title: 'Home', icon: 'fas-solid fa-house', path: '/' },
  { title: 'Sales', icon: 'chart-line', path: '/sales' },
  { title: 'Costs', icon: 'chart-column', path: '/costs' },
  { title: 'Payments', icon: 'wallet', path: '/payments' },
  { title: 'Finances', icon: 'chart-pie', path: '/finances' },
  { title: 'Messages', icon: 'envelope', path: '/messages' },
];
const bottomRoutes = [
  { title: 'Settings', icon: 'sliders', path: '/settings' },
  { title: 'Support', icon: 'phone-volume', path: '/support' },
];
const ANIMATION_DELAY = 150;
const LOGO_DELAY = 500;
const LOGO_SHOW_DELAY = 200;

const Sidebar = ({ onToggleTheme }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [activePath, setActivePath] = useState('/');
  const menuLength = routes.length + bottomRoutes.length + 1;
  const [showLogo, setShowLogo] = useState(true);
  const [showMenuItems, setShowMenuItems] = useState(Array(menuLength).fill(false));
  const timersRef = useRef([]);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => {
    clearAllTimers();
    if (isOpened) {
      setShowLogo(false);
      setShowMenuItems(Array(menuLength).fill(false));
      const logoTimeout = setTimeout(() => {
        setShowLogo(true);
        const menuTimeout = setTimeout(() => {
          for (let idx = 0; idx < menuLength; idx++) {
            const t = setTimeout(() => {
              setShowMenuItems(prev => {
                const arr = [...prev];
                arr[idx] = true;
                return arr;
              });
            }, idx * ANIMATION_DELAY);
            timersRef.current.push(t);
          }
        }, LOGO_SHOW_DELAY);
        timersRef.current.push(menuTimeout);
      }, LOGO_DELAY);
      timersRef.current.push(logoTimeout);
    } else {
      setShowLogo(true);
      setShowMenuItems(Array(menuLength).fill(false));
    }
    return clearAllTimers;
  }, [isOpened, menuLength, clearAllTimers]);

  const getBottomAnimIdx = idx => routes.length + (bottomRoutes.length - 1 - idx);
  const themeAnimIdx = routes.length + bottomRoutes.length;

  const isDark = document.body.classList.contains('dark') || document.documentElement.classList.contains('dark');

  const goToRoute = useCallback((path) => {
    setActivePath(path);
  }, []);

  return (
    <SidebarContainer data-opened={isOpened ? 'true' : undefined}>
      <LogoRow style={{ opacity: isOpened ? (showLogo ? 1 : 0) : 1, transition: 'opacity 0.2s' }}>
        <LogoImg src={ logo } alt="TensorFlow logo" />
        <LogoText data-active={isOpened ? 'true' : undefined}>TensorFlow</LogoText>
        <ToggleButton onClick={() => setIsOpened(v => !v)} data-opened={isOpened ? 'true' : undefined} aria-label="Сменить размер">
          <FontAwesomeIcon icon={ isOpened ? 'angle-left' : 'angle-right' }/>
        </ToggleButton>
      </LogoRow>
      <NavSection>
        {routes.map((route, idx) => (
          <NavItem
            key={ route.title }
            data-active={activePath === route.path ? 'true' : undefined}
            onClick={() => goToRoute(route.path)}
          >
            <span
              style={
                isOpened
                  ? {
                      opacity: showMenuItems[idx] ? 1 : 0,
                      transform: showMenuItems[idx] ? 'translateY(0)' : 'translateY(-20px)',
                      transition: 'opacity 0.3s, transform 0.3s',
                      display: 'inline-flex',
                      alignItems: 'center',
                    }
                  : {
                      opacity: 1,
                      transform: 'none',
                      transition: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                    }
              }
            >
              <span style={{ width: 24, minWidth: 24, display: 'inline-block' }}>
                <FontAwesomeIcon icon={ route.icon }/>
              </span>
              {isOpened && <span>{route.title}</span>}
            </span>
          </NavItem>
        ))}
      </NavSection>
      <BottomSection style={{ opacity: isOpened ? (showLogo ? 1 : 0) : 1, transition: 'opacity 0.2s' }}>
        {bottomRoutes.map((route, idx) => {
          const animIdx = getBottomAnimIdx(idx);
          return (
            <NavItem
              key={ route.title }
              data-active={activePath === route.path ? 'true' : undefined}
              onClick={() => goToRoute(route.path)}
            >
              <span
                style={
                  isOpened
                    ? {
                        opacity: showMenuItems[animIdx] ? 1 : 0,
                        transform: showMenuItems[animIdx] ? 'translateY(0)' : 'translateY(-20px)',
                        transition: 'opacity 0.3s, transform 0.3s',
                        display: 'inline-flex',
                        alignItems: 'center',
                      }
                    : {
                        opacity: 1,
                        transform: 'none',
                        transition: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                      }
                }
              >
                <span style={{ width: 24, minWidth: 24, display: 'inline-block' }}>
                  <FontAwesomeIcon icon={ route.icon }/>
                </span>
                {isOpened && <span>{route.title}</span>}
              </span>
            </NavItem>
          );
        })}
        <ThemeToggle
          onClick={onToggleTheme}
          aria-label="Сменить тему"
          style={
            isOpened
              ? {
                  opacity: showMenuItems[themeAnimIdx] ? 1 : 0,
                  transform: showMenuItems[themeAnimIdx] ? 'translateY(0)' : 'translateY(-20px)',
                  transition: 'opacity 0.3s, transform 0.3s',
                }
              : {
                  opacity: 1,
                  transform: 'none',
                  transition: 'none',
                }
          }
        >
          <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
        </ThemeToggle>
      </BottomSection>
    </SidebarContainer>
  );
};

Sidebar.propTypes = {
  onToggleTheme: PropTypes.func.isRequired,
};

export default Sidebar;