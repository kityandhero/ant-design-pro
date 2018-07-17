import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '分析页',
        path: 'analysis',
      },
      {
        name: '监控页',
        path: 'monitor',
      },
      {
        name: '工作台',
        path: 'workplace',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  {
    name: '贫困户信息',
    icon: 'idcard',
    path: 'personinformation',
    children: [
      {
        name: '基础信息',
        path: 'basiclist',
      },
    ],
  },
  {
    name: '参考标准',
    icon: 'schedule',
    path: 'incomeexpenditureprice',
    children: [
      // {
      //   name: '生产经营性收支',
      //   path: ':type',
      // },
      {
        name: '生产经营性收支',
        path: '0',
        children: [
          {
            name: '种植业收入',
            path: '2001',
          },
          {
            name: '养殖业收入',
            path: '2002',
          },
        ],
      },
      // {
      //   name: '各项补贴标准',
      //   path: 'standard/:type',
      // },
      // {
      //   name: '劳务收入标准',
      //   path: 'standard/:type',
      // },
      // {
      //   name: '刚性支出标准',
      //   path: 'standard/:type',
      // },
    ],
  },
  {
    name: '下属机构管理',
    icon: 'layout',
    path: 'povertyalleviationagency',
    children: [
      {
        name: '下属部门',
        path: 'list',
      },
    ],
  },
  {
    name: '表单页',
    icon: 'form',
    path: 'form',
    hideInMenu: true,
    children: [
      {
        name: '基础表单',
        path: 'basic-form',
      },
      {
        name: '分步表单',
        path: 'step-form',
      },
      {
        name: '高级表单',
        authority: 'admin',
        path: 'advanced-form',
      },
    ],
  },
  {
    name: '列表页',
    icon: 'table',
    path: 'list',
    hideInMenu: true,
    children: [
      {
        name: '查询表格',
        path: 'table-list',
      },
      {
        name: '标准列表',
        path: 'basic-list',
      },
      {
        name: '卡片列表',
        path: 'card-list',
      },
      {
        name: '搜索列表',
        path: 'search',
        children: [
          {
            name: '搜索列表（文章）',
            path: 'articles',
          },
          {
            name: '搜索列表（项目）',
            path: 'projects',
          },
          {
            name: '搜索列表（应用）',
            path: 'applications',
          },
        ],
      },
    ],
  },
  {
    name: '详情页',
    icon: 'profile',
    path: 'profile',
    hideInMenu: true,
    children: [
      {
        name: '基础详情页',
        path: 'basic',
      },
      {
        name: '高级详情页',
        path: 'advanced',
        authority: 'admin',
      },
    ],
  },
  {
    name: '结果页',
    icon: 'check-circle-o',
    path: 'result',
    hideInMenu: true,
    children: [
      {
        name: '成功',
        path: 'success',
      },
      {
        name: '失败',
        path: 'fail',
      },
    ],
  },
  {
    name: '异常页',
    icon: 'warning',
    path: 'exception',
    hideInMenu: true,
    children: [
      {
        name: '403',
        path: '403',
      },
      {
        name: '404',
        path: '404',
      },
      {
        name: '500',
        path: '500',
      },
      {
        name: '触发异常',
        path: 'trigger',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    hideInMenu: true,
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
  {
    name: '系统设置',
    icon: 'setting',
    path: 'systemconfig',
    children: [
      {
        name: '日志管理',
        icon: 'message',
        path: 'log',
        children: [
          {
            name: '异常日志',
            icon: 'exception',
            path: 'errorlog/list',
          },
          {
            name: '操作日志',
            icon: 'code-o',
            path: 'operatelog/list',
          },
          {
            name: '登陆日志',
            icon: 'info-circle-o',
            path: 'povertyalleviationagencyuserloginlog/listforcurrentpovertyalleviationagency',
          },
        ],
      },
      {
        name: '数据文件导入历史',
        icon: 'profile',
        path: 'excelimporthistory/list',
      },
      {
        name: '账户管理',
        icon: 'solution',
        path: 'account',
        children: [
          {
            name: '新增账户',
            icon: 'user-add',
            path: 'povertyalleviationagencyuser/add',
          },
          {
            name: '账户列表',
            icon: 'contacts',
            path: 'povertyalleviationagencyuser/listforcurrentpovertyalleviationagency',
          },
        ],
      },
      {
        name: '当前机构信息',
        icon: 'info-circle-o',
        path: 'povertyalleviationagency/detailscurrent/basicinfo',
      },
      {
        name: '权限管理',
        icon: 'wallet',
        path: 'jurisdiction',
        children: [
          {
            name: '菜单列表',
            icon: 'bars',
            path: 'list',
          },
        ],
      },
      {
        name: '当前账户信息',
        icon: 'idcard',
        path: 'povertyalleviationagencyuser/detailscurrent/basicinfo',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
