// libraries
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import { render } from '@testing-library/react';
// constants
import { theme } from '../../constants/theme';
// utils
import i18n from '../i18n';
import store from '../../store';

const renderWithProviders = component => {
  return render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>{component}</BrowserRouter>
        </I18nextProvider>
      </Provider>
    </ThemeProvider>,
  );
};

export default renderWithProviders;
