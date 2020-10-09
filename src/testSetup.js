import { axios } from './render';
import { WA_GLOBAL, WA_RETRY } from './utils/storeKeys';

jest.spyOn(window.localStorage, 'getItem').mockImplementation((key) => {
  switch (key) {
  case WA_GLOBAL:
    return {};
  case WA_RETRY:
  default:
    throw new Error(`UNMATCHED KEY ${key}`);
  }
});

axios.get.mockImplementation((url) => {
  switch (url) {
  default:
    throw new Error('UNMATCHED', url);
  }
});
