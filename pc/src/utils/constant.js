/**
 * @name: constant
 * @author mahai
 * @date 2022/8/1 11:13 AM
 * @description constant
 */


const PROJECT_NAME = {
    "eas":"EAS",
    "teamwire":"TeamWire",
    "kanass":"Kanass",
    "postin":"PostIn",
    "teston":"TestOn",
    "matflow":"MatFlow"
}

const DASHBOARD_NAME = {
    "normal":"通用",
    "left":"左侧",
    "right":"右侧"
}
const WORK_APP_SELECT = [
    {
        label: PROJECT_NAME.teamwire,
        value: 'teamwire',
    },
    {
        label: PROJECT_NAME.kanass,
        value: 'kanass',
    },
    {
        label: PROJECT_NAME.postin,
        value: 'postin',
    },
    {
        label: PROJECT_NAME.teston,
        value: 'TestOn',
    },
    {
        label: PROJECT_NAME.matflow,
        value: 'matflow',
    },
    {
        label: PROJECT_NAME.eas,
        value: 'eas',
    }
];

const WORK_NAME = {
    teamwire: {
        label: PROJECT_NAME.teamwire,
    },
    kanass: {
        label: PROJECT_NAME.kanass,
    },
    matflow: {
        label: PROJECT_NAME.matflow,
    },
    postin: {
        label: PROJECT_NAME.postin,
    },
    teston: {
        label: PROJECT_NAME.teston,
    },
    eas: {
        label: PROJECT_NAME.eas,
    }
};
export {
    PROJECT_NAME,
    DASHBOARD_NAME,
    WORK_APP_SELECT,
    WORK_NAME
}
