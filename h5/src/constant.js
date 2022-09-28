/**
 * @name: constant
 * @author mahai
 * @date 2022/5/21 5:35 PM
 * @description constant
 */

const WORK_NAME = {
    apibox: {
        label: 'API BOX',
    },
    project: {
        label: '项目管理',
    },
    jtest: {
        label: 'Jtest',
    },
    wiki: {
        label: '知识库',
    },
};

const WORK_LIST = [
    {
        label: '项目管理',
        value: 'project',
    },
    {
        label: 'API BOX',
        value: 'apibox',
    },
    {
        label: 'Jtest',
        value: 'jtest',
    },
    {
        label: '知识库',
        value: 'wiki',
    },
]
const WORK_APP_LINK = (applicationTypes) => {
    const filterData = WORK_LIST.filter(item => !applicationTypes.includes(item.value))
    return [filterData];
}

const TabItems = [
    { key: 'all', title: '全部' },
    { key: 'eas', title: 'EAS' },
    { key: 'teamwire', title: 'TeamWire' },
    { key: 'kanass', title: 'KanAss' },
    { key: 'postin', title: 'PostIn' },
    { key: 'teston', title: 'TestOn' },
    { key: 'matflow', title: 'MatFlow' },
]

export {
    WORK_NAME,
    WORK_APP_LINK,
    TabItems
}
