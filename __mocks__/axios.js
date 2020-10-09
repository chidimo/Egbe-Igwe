/* eslint-disable no-undef */
export default {
  get: jest.fn(() => Promise.resolve({})),

  defaults: {
    headers: {
      post: {
        'Content-Type': 'application/json',
      },
      common: {},
    },
    baseURL: '',
  },

  CancelToken: jest.fn(),
};
