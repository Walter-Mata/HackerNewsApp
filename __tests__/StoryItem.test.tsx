import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import StoryItem from '../src/components/StoryItem';

const mockStore = configureStore([]);

describe('StoryItem', () => {
  const mockStory = {
    id: 1,
    title: 'Test Story',
    url: 'https://example.com',
    time: 1625097600,
    score: 100,
    by: 'testuser',
    type: 'story',
    descendants: 10,
  };

  const mockUser = {
    id: 'testuser',
    karma: 500,
    created: 1600000000,
  };

  const initialState = {
    stories: {
      users: {
        testuser: mockUser,
      },
    },
  };

  const store = mockStore(initialState);
  const onPressMock = jest.fn();

  it('renders correctly with all data', () => {
    const {getByText} = render(
      <Provider store={store}>
        <StoryItem story={mockStory} onPress={onPressMock} />
      </Provider>,
    );

    expect(getByText('Test Story')).toBeTruthy();
    expect(getByText('https://example.com')).toBeTruthy();
    expect(getByText('100')).toBeTruthy();
    expect(getByText(/testuser/)).toBeTruthy();
    expect(getByText(/Karma: 500/)).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const {getByText} = render(
      <Provider store={store}>
        <StoryItem story={mockStory} onPress={onPressMock} />
      </Provider>,
    );

    fireEvent.press(getByText('Test Story'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
