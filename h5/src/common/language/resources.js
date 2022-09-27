import {cn, en} from './index'
import {orga_cn} from 'tiklab-user-ui/es/_utils'
import {privilege_cn} from 'tiklab-privilege-ui/es/_utils'
const resources = {
    zh: {
        translation: {...cn, ...orga_cn, ...privilege_cn},
    },
    en: {
        translation: en,
    },
}
export default resources
