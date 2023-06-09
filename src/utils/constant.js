import teamwireImg from 'tiklab-eam-ui/es/assests/img/teamwire.png';
import postinImg from 'tiklab-eam-ui/es/assests/img/postin.png';
import matflowImg from 'tiklab-eam-ui/es/assests/img/matflow.png';
import kanassImg from 'tiklab-eam-ui/es/assests/img/kanass.png';
import testonImg from 'tiklab-eam-ui/es/assests/img/teston.png';
import easImg from 'tiklab-eam-ui/es/assests/img/eas.png';

/**
 * 全部应用产品
 * @type {{all: string, matflow: string, postin: string, eas: string, teston: string, teamwire: string, kanass: string, xcode: string, xpack: string}}
 */

const PROJECT_NAME = {
    eas:"EAS",
    teamwire:"TeamWire",
    kanass:"Kanass",
    postin:"PostIn",
    teston:"TestOn",
    matflow:"MatFlow",
    xcode:"XCode",
    xpack:"XPack",
    all:"全部"
}

const WORK_APP_SELECT = [
    {label: PROJECT_NAME.teamwire, value: 'teamwire',},
    {label: PROJECT_NAME.kanass, value: 'kanass',},
    {label: PROJECT_NAME.postin, value: 'postin',},
    {label: PROJECT_NAME.teston, value: 'teston',},
    {label: PROJECT_NAME.matflow, value: 'matflow',},
    {label: PROJECT_NAME.eas, value: 'eas',},
    {label: PROJECT_NAME.xcode, value: 'xcode',},
    {label: PROJECT_NAME.xpack, value: 'xpack',},
];

const WORK_NAME = {
    teamwire: {label: PROJECT_NAME.teamwire,},
    kanass: {label: PROJECT_NAME.kanass,},
    matflow: {label: PROJECT_NAME.matflow,},
    postin: {label: PROJECT_NAME.postin,},
    teston: {label: PROJECT_NAME.teston,},
    eas: {label: PROJECT_NAME.eas,},
    xcode:{label: PROJECT_NAME.xcode,},
    xpack:{label: PROJECT_NAME.xpack,}
}

const WORK_IMAGE = {
    teamwire:teamwireImg,
    postin:postinImg,
    matflow:matflowImg,
    kanass:kanassImg,
    teston:testonImg,
    eas:easImg,
    xcode:matflowImg,
    xpack:matflowImg
}

export {
    PROJECT_NAME,
    WORK_APP_SELECT,
    WORK_NAME,
    WORK_IMAGE
}
