// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

const mockGeolocation = {
  watchPosition: jest.fn(),
  getCurrentPosition: jest.fn().mockImplementation((success, err) => {
    // if (err) {
    //   err('Unable to locate you.');
    // }
    success({ coords: { latitude: 6.334986, longitude: 5.6037465 } });
  }),
};

global.navigator.geolocation = mockGeolocation;
