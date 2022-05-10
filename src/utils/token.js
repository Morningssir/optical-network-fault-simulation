export function getToken(str) {
  const tokenString =
    typeof str === 'undefined' && localStorage
      ? localStorage.getItem('optical-planning-token')
      : str;
  let token;
  try {
    if (tokenString) {
      token = JSON.parse(tokenString);
    }
  } catch (e) {
    token = tokenString;
  }
  if (typeof token === 'string') {
    return [token];
  }
  return token;
}

export function setToken(token) {
  const proToken = typeof token === 'string' ? [token] : token;
  localStorage.setItem('optical-planning-token', JSON.stringify(proToken));
}
