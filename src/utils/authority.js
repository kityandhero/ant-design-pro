// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  return localStorage.getItem('antd-pro-authority') || [];
  // return 'admin';
}

export function setAuthority(authority) {
  // console.dir(authority);
  return localStorage.setItem('antd-pro-authority', authority);
}
