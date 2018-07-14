import { getMenuData } from '../common/menu';

const getBreadcrumbNameMap = (menuData, routerData) => {
  const result = {};
  const childResult = {};
  for (const i of menuData) {
    if (!routerData[i.path]) {
      result[i.path] = i;
    }
    if (i.children) {
      Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData));
    }
  }
  return Object.assign({}, routerData, result, childResult);
};

export function getCurrentUrlInfo(routerData, pathname) {
  const menuData = getMenuData();
  const list = getBreadcrumbNameMap(menuData, routerData);
  const currentUrl = list[pathname];
  return currentUrl || {};
}
