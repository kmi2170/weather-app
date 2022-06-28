import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
// import { render, screen, waitFor } from '@testing-library/react';
// import { render, screen, waitFor } from '@testing-library/react';

import { render, screen } from '../../../utils/test-utils';
import SwitchUnits from './index';

const user = userEvent.setup();
const setup = () => render(<SwitchUnits />);

describe('Switch units buttons', () => {
  it('Click setting icon, then menu appears with default, Imperial Units', async () => {
    setup();
    await user.click(getSettingIcon());
    expect(await screen.findByText(/Imperial Units/i)).toBeInTheDocument();
  });

  it('Click setting icon, then click close icon and menu disappears', async () => {
    setup();
    await user.click(getSettingIcon());
    await user.click(getButton(/close icon/i));
    expect(screen.getByTestId('menu')).not.toBeVisible();
  });

  describe('Click setting icon, then select units', () => {
    it('Click Celsius icon, then "Metric Units" appears', async () => {
      setup();
      await user.click(getSettingIcon());
      await user.click(getButton(/℃/i));
      expect(await screen.findByText(/Metric Units/i)).toBeInTheDocument();
    });

    it('Click fahrenheit icon, then "Imperial Units" appears again', async () => {
      setup();
      await user.click(getSettingIcon());
      await user.click(getButton(/℉/i));
      expect(await screen.findByText(/Imperial Units/i)).toBeInTheDocument();
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
