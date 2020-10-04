export const formatAsNumber = (amount) =>
  new Intl.NumberFormat('en-NG', { minimumSignificantDigits: 2 }).format(
    amount,
  );
