require('@testing-library/jest-native/extend-expect');

jest.mock('@react-navigation/native', () => ({
  useRoute: () => ({
    params: {
      questionx: 'Test question',
      randtask: 'Test task',
    },
  }),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('react-native-marked', () => {
  return function MockMarkdown() {
    return null;
  };
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
}));
