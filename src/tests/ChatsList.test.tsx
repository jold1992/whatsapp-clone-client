/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/prefer-find-by */
import { cleanup, fireEvent, render, waitFor, screen } from '@testing-library/react';
import { ChatsList } from '../components/ChatsListScreen/ChatsList';

import { useLocation, BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('ChatsList', () => {

  afterEach(() => {
    cleanup();
    //delete window.location;
    window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        href: '/',
      },
      writable: true,
    });
  });

  it('renders fetched chats data', async () => {
    //console.log('hello world');
    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: {
          chats: [
            {
              id: 1,
              name: 'Foo Bar',
              picture: 'https://localhost:4000/picture.jpg',
              lastMessage: {
                id: 1,
                content: 'Hello',
                createdAt: new Date('1 Jan 2019 GMT'),
              },
            },
          ],
        },
      })
    );

    {
      const { container, getByTestId } = render(
        <BrowserRouter>
          <ChatsList />
        </BrowserRouter>
      );

      //console.log(screen.getByTestId('name'))

      await waitFor(() => screen.getByTestId('name'));

      expect(getByTestId('name')).toHaveTextContent('Foo Bar');
      expect(getByTestId('picture')).toHaveAttribute(
        'src',
        'https://localhost:4000/picture.jpg'
      );
      expect(getByTestId('content')).toHaveTextContent('Hello');
      expect(getByTestId('date')).toHaveTextContent('19:00');
    }
  });

  it('should navigate to the target chat room on chat item click', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: {
          chats: [
            {
              id: 1,
              name: 'Foo Bar',
              picture: 'https://localhost:4000/picture.jpg',
              lastMessage: {
                id: 1,
                content: 'Hello',
                createdAt: new Date('1 Jan 2019 GMT'),
              },
            },
          ],
        },
      })
    );

    {
      const history = createMemoryHistory();
      const { container, getByTestId } = render(
        <Router navigator={history} location={"/"}>
          <ChatsList />
        </Router>
      );

      await waitFor(() => screen.findByTestId('chat'));

      fireEvent.click(getByTestId('chat'));

      await waitFor(() =>
        expect(history.location.pathname).toEqual('/chats/1')
      );
    }
  });
});
