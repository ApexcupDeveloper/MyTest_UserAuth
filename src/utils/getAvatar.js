export const getAvatar = str => {
  if (str) {
    return str.charAt(0).toUpperCase();
  } else {
    return '?';
  }
};
