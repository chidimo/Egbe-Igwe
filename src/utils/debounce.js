export function debounce(fn, delay) {
  let timeout;
  return (...rest) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, rest), delay);
  };
}
