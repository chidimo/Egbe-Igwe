// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

const mockGeolocation = {
  watchPosition: jest.fn(),
  getCurrentPosition: jest.fn().mockImplementation((success) => {
    success({ coords: { latitude: 6.433, longitude: 7.483 } });
  }),
};

global.navigator.geolocation = mockGeolocation;
