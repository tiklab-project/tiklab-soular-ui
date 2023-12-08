
import {eam_cn} from 'thoughtware-eam-ui/es/utils'
import {message_cn} from 'thoughtware-message-ui/es/utils';
import {user_cn} from 'thoughtware-user-ui/es/utils';
import {privilege_cn} from 'thoughtware-privilege-ui/es/utils'
import pluginManage_cn from 'thoughtware-plugin-manager-ui/es/utils/language'
import todoTask_cn from 'thoughtware-todotask-ui/es/utils/language'
import log_cn from 'thoughtware-security-ui/es/utils/language'

const resources = {
    zh: {
        translation: {
            ...user_cn,
            ...eam_cn,
            ...message_cn,
            ...pluginManage_cn,
            ...todoTask_cn,
            ...log_cn,
            ...privilege_cn,
        },
    }
}


export default resources
