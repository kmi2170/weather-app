import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
// import { render, screen, waitFor } from '@testing-library/react';

import { render, screen } from '../../utils/test-utils';
import SearchLocationBar from './index';

const user = userEvent.setup();
const setup = () => render(<SearchLocationBar />);

describe('SearchLocationBar', () => {
  const testSearchTerm = 'seattle, wa';
  it(`type in "${testSearchTerm}", then the value has "${testSearchTerm}"`, async () => {
    setup();
    await user.type(getTextbox(), testSearchTerm);
    expect(getTextbox()).toHaveValue(testSearchTerm);
  });

  it(`type in "${testSearchTerm}", then click clear icon and the value has "" `, async () => {
    setup();
    await user.type(getTextbox(), testSearchTerm);
    await user.click(getIcon(/clear button/i));
    expect(getTextbox()).toHaveValue('');
  });

  it(`type in "${testSearchTerm}", then click search icon and`, async () => {
    setup();
    await user.type(getTextbox(), testSearchTerm);
    await user.click(getIcon(/search button/i));
    // expect(getTextbox()).toHaveValue('');
  });
});

const getTextbox = () => screen.getByRole('textbox');

const getIcon = (icon_name: RegExp) =>
  screen.getByRole('img', {
    name: icon_name,
  });
