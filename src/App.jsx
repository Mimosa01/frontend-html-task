import React from 'react'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./components/Sidebar";
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './theme/light';
import { darkTheme } from './theme/dark';

library.add(fas);

export default class App extends React.Component{
  state = {
    theme: 'light',
  };

  toggleTheme = () => {
    this.setState(({ theme }) => ({
      theme: theme === 'light' ? 'dark' : 'light',
    }));
  };

  render () {
      const { theme } = this.state;
      const themeObject = theme === 'light' ? lightTheme : darkTheme;
      return (
        <ThemeProvider theme={themeObject}>
          <Sidebar color={theme} onToggleTheme={this.toggleTheme} />
        </ThemeProvider>
      )
  }
}
