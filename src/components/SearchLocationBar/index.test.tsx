import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// import { render, screen, waitFor } from '@testing-library/react';
import { render, screen } from '../../utils/test-utils';
import SearchLocationBar from './index';

const handlers = [
  rest.get('/api/geolocation', (req, res, ctx) => {
    return res(ctx.json([]), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);
// Enable API mocking before tests.
beforeAll(() => server.listen());
// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());
// Disable API mocking after the tests are done.
afterAll(() => server.close());

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

  it(`type in random text "abc123ABC", then click search icon and displays examples for search terms`, async () => {
    setup();
    await user.type(getTextbox(), 'abc123ABC');
    await user.click(getIcon(/search button/i));
    expect(await screen.findByText(/no place found/i)).toBeInTheDocument();
  });
});

const getTextbox = () => screen.getByRole('textbox');

const getIcon = (icon_name: RegExp) =>
  screen.getByRole('img', {
    name: icon_name,
  });
