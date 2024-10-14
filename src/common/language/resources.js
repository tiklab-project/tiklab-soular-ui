import {eam_cn} from 'tiklab-eam-ui/es/utils'
import {message_cn} from 'tiklab-message-ui/es/utils';
import {user_cn} from 'tiklab-user-ui/es/utils';
import {privilege_cn} from 'tiklab-privilege-ui/es/utils'
import log_cn from 'tiklab-security-ui/es/utils/language'

const resources = {
    zh: {
        translation: {
            ...user_cn,
            ...eam_cn,
            ...message_cn,
            ...log_cn,
            ...privilege_cn,
        },
    }
}


export default resources
