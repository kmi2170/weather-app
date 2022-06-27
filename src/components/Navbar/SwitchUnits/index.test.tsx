import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import SwitchUnits from './index';
import { store } from '../../../app/store';

const user = userEvent.setup();
const setup = () =>
  render(
    <Provider store={store}>
      <SwitchUnits />)
    </Provider>
  );

describe('Switch units buttons', () => {
  it('Click setting icon, then menu appears', async () => {
    setup();
    await user.click(getSettingIcon());
    expect(await screen.findByText('Units')).toBeInTheDocument();
    // await waitFor(() => expect(screen.getByText('Units')).toBeInTheDocument());
  });

  describe('Click setting icon, then select units', () => {
    it('Click Celsius icon, then menu disappers', async () => {
      setup();
      await user.click(getSettingIcon());
      await user.click(getButton(/℃/i));
      await waitFor(() => {
        expect(getMenu()).not.toBeVisible();
      });
    });

    it('Click fahrenheit icon, then menu disappers', async () => {
      setup();
      await user.click(getSettingIcon());
      await user.click(getButton(/℉/i));
      await waitFor(() => {
        expect(getMenu()).not.toBeVisible();
      });
    });
  });
});

const getSettingIcon = () =>
  screen.getByRole('button', {
    name: /setting icon/i,
  });

const getButton = (button_name: RegExp) =>
  screen.getByRole('button', {
    name: button_name,
  });

const getMenu = () => screen.getByTestId('menu');
