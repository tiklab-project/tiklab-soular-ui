import {cn, en} from './index'
import {orga_cn} from 'doublekit-user-ui'
import {privilege_cn} from 'doublekit-privilege-ui'
const resources = {
    zh: {
        translation: {...cn, ...orga_cn, ...privilege_cn},
    },
    en: {
        translation: en,
    },
}
export default resources
