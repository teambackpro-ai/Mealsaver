// Icons load font files, which the test environment can't do.
// Replace them with an empty placeholder in tests.
jest.mock('@expo/vector-icons/Ionicons', () => {
  const Placeholder = () => null;
  return { __esModule: true, default: Placeholder };
});
