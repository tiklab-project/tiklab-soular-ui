/**
 * @name: constant
 * @author mahai
 * @date 2022/5/21 5:35 PM
 * @description constant
 */

const WORK_NAME = {
    teamwire: {
        label: 'TeamWire',
    },
    postin: {
        label: 'PostIn',
    },
    kanass: {
        label: 'Kanass',
    },
    teston: {
        label: 'TestOn',
    },
    matflow: {
        label: 'MatFlow',
    },
};

const WORK_LIST = [
    {
        label: 'TeamWire',
        value: 'teamwire',
    },
    {
        label: 'PostIn',
        value: 'postin',
    },
    {
        label: 'Kanass',
        value: 'kanass',
    },
    {
        label: 'TestOn',
        value: 'teston',
    },
    {
        label: 'MatFlow',
        value: 'matflow',
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
