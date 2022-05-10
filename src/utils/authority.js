export function getAuthority(str) {
  const authorityString =
    typeof str === 'undefined' && localStorage
      ? localStorage.getItem('optical-planning-authority')
      : str;
  let authority;
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string' || typeof authority === 'number') {
    return [authority];
  }
  return authority;
}

export function setAuthority(authority) {
  const proAuthority =
    typeof authority === 'string' || typeof authority === 'number'
      ? [authority]
      : authority;
  localStorage.setItem(
    'optical-planning-authority',
    JSON.stringify(proAuthority),
  );
}
