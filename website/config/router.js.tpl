/**
 * Created by shiyonggao on 2019/11/06.
 */


const router = {

    /**系统配置**/
    'system': {
        title: '系统配置',
        role: 'ROLE_APP_ODP5_CUSTOM_SYSTEM_SDK',
        children: {
            'sdkVersion': {
                title: 'SDK版本管理',
                url: 'sdkversion.html',
                active: 'sdkVersion',
                role: 'ROLE_APP_ODP5_CUSTOM_SYSTEM_SDK'
            },
        }
    },

    'dialog': {
        title: '自定义弹窗',
        url: 'dialog.html',
        active: 'index',
        icon: 'el-icon-video-camera',
        role: '',
    },

    'demo' : {
        title: '公共功能展示',
        url: 'demo.html',
        active: 'demo',
        icon: 'el-icon-video-camera',
        role: '',
    },

    /**无权限访问页面**/
    'noAccess': {
        title: '权限提示',
        url: 'noaccess.html',
        active: 'noAccess',
        role: '',
        icon: ''
    },

    /**404访问页面**/
    'notfind': {
        title: '404',
        url: 'notfind.html',
        active: 'notfind',
        icon: '',
        role: '',
    },

    /**游戏信息配置**/
    'gameConfig' : {
        title:  '游戏信息配置',
        icon: 'icon-youxi1',
        role: 'ROLE_APP_ODP5_CUSTOM_GAMEDEPLOY',
        projectType: 1,
        children: {
            'baseInfo' : {
                title: '基础信息配置',
                url: 'baseinfo.html',
                active: 'baseInfo',
                role: 'ROLE_APP_ODP5_CUSTOM_GAMEDEPLOY_BASIC'
            },
            'commonInfo': {
                title: '游戏参数配置',
                url: 'commoninfo.html',
                active: 'commonInfo',
                role: 'ROLE_APP_ODP5_CUSTOM_GAMEDEPLOY_UNIVERSAL'
            },
            'PackagePlanManager': {
                title: '包名计划管理',
                url: 'packageplanmanager.html',
                active: 'PackagePlanManager',
                role: 'ROLE_APP_ODP5_CUSTOM_GAMEDEPLOY_PACKAGE'
            },
            'server': {
                title: '服列表管理',
                url: 'server.html',
                active: 'server',
                role: 'ROLE_APP_ODP5_CUSTOM_GAMEDEPLOY_SERVICE'
            },
        }
    },

    /**SDK配置发行**/
    'sdk': {
        title: 'SDK配置发行',
        icon: 'icon-SDKxiazai',
        projectType: 1,
        role: 'ROLE_APP_ODP5_CUSTOM_SDK',
        children: {
            'configList': {
                title: 'SDK配置文件',
                url: 'configlist.html',
                active: 'configList',
                role: 'ROLE_APP_ODP5_CUSTOM_SDK_BASIC',
            },
            'configEdit': {
                title: '详情',
                url: 'configedit.html',
                active: 'configList',
                role: 'ROLE_APP_ODP5_CUSTOM_SDK_BASIC',
            },
            'releasesList': {
                title: 'SDK版本发行',
                url: 'releaseslist.html',
                active: 'releasesList',
                role: 'ROLE_APP_ODP5_CUSTOM_SDK_ISSUE',
            },
            'releasesEdit': {
                title: '详情',
                url: 'releasesedit.html',
                active: 'releasesList',
                role: 'ROLE_APP_ODP5_CUSTOM_SDK_ISSUE',
            },
            'adjustToken': {
                title: 'adjust Token',
                url: 'adjusttoken.html',
                active: 'adjustToken',
                role: 'ROLE_APP_ODP5_CUSTOM_SDK_MAP',
            }
        }
    },

    /**CP参数导出**/
    'cpArgExport': {
        title: 'CP参数导出',
        url: 'cpargexport.html',
        active: 'cpArgExport',
        icon: 'el-icon-s-operation',
        projectType: 1,
        role: 'ROLE_APP_ODP5_CUSTOM_CPMAP'
    },

    /**支付**/
    'payPackageSetting': {
        title: '支付套餐配置',
        url: 'paypackagesetting.html',
        active: 'payPackageSetting',
        icon: 'icon-pay1',
        projectType: 1,
        role: 'ROLE_APP_ODP5_CUSTOM_PAY3'
    },

    /**用户查询**/
    'query': {
        title: '数据查询',
        icon: 'icon-shujuchaxun',
        role: 'ROLE_APP_ODP5_CUSTOM_VIEW',
        projectType: 2,
        children: {
            'user': {
                title: '用户查询',
                url: 'user.html',
                active: 'user',
                role: 'ROLE_APP_ODP5_CUSTOM_VIEW_USER',
            },
            'reg': {
                title: '注册查询',
                url: 'reg.html',
                active: 'reg',
                role: 'ROLE_APP_ODP5_CUSTOM_VIEW_LOGIN',
            },
            'terminal': {
                title: '设备查询',
                url: 'terminal.html',
                active: 'terminal',
                role: 'ROLE_APP_ODP5_CUSTOM_VIEW_DEVICE',
            },
            'pay': {
                title: '充值日志',
                url: 'pay.html',
                active: 'pay',
                role: 'ROLE_APP_ODP5_CUSTOM_VIEW_PAY',
            }
        }
    },

    /**用户查询**/
    'watch': {
        title: '数据监控',
        icon: 'icon-jiankong',
        projectType: 2,
        role: 'ROLE_APP_ODP5_CUSTOM_MONITOR',
        children: {
            'attendence': {
                title: '打卡记录',
                url: 'attendence.html',
                active: 'attendence',
                role: 'ROLE_APP_ODP5_CUSTOM_MONITOR_CHECKIN',
            },
            'line': {
                title: '报警曲线',
                url: 'line.html',
                active: 'line',
                role: 'ROLE_APP_ODP5_CUSTOM_MONITOR_ALARM',
            },
            'alarmPolicy': {
                title: '报警策略配置',
                url: 'alarmpolicy.html',
                active: 'alarmPolicy',
                role: 'ROLE_APP_ODP5_CUSTOM_MONITOR_RULE',
            },
            'alarmGroup': {
                title: '报警群组配置',
                url: 'alarmgroup.html',
                active: 'alarmGroup',
                role: 'ROLE_APP_ODP5_CUSTOM_MONITOR_GROUP',
            }
        }
    },

    /**游戏运营**/
    'push' :{
        title: '游戏运营',
        icon: 'icon-yunying',
        projectType: 2,
        role: 'ROLE_APP_ODP5_CUSTOM_OPERATION',
        children: {
            'PushPlanManager': {
                title: '推送方案管理',
                url: 'pushplanmanager.html',
                active: 'PushPlanManager',
                role: 'ROLE_APP_ODP5_CUSTOM_OPERATION_PUSH'
            },
            'PushPlanDetail': {
                title: '推送方案详情',
                url: 'pushplandetail.html',
                active: 'PushPlanManager',
                role: 'ROLE_APP_ODP5_CUSTOM_OPERATION_PUSH'
            },

            'ces': {
                title: '内容配置管理',
                url: 'ces.html',
                active: 'ces',
                role: 'ROLE_APP_ODP5_CUSTOM_OPERATION_CONCENT'
            },
            'serverListManager': {
                title: '服列表管理',
                url: 'serverlistmanager.html',
                active: 'serverListManager',
                jumpToRoute: 'gameConfig/server',
                role: 'ROLE_APP_ODP5_CUSTOM_OPERATION_CONCENT'
            }
        }
    }
};

export default router;
