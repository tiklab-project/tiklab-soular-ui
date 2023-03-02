
import {eam_cn} from 'tiklab-eam-ui/es/utils'
import {privilege_cn,} from 'tiklab-privilege-ui/es/utils';
import {message_cn} from 'tiklab-message-ui/es/utils';
import {orga_cn,} from 'tiklab-user-ui/es/utils';
import {pluginManage_cn} from 'tiklab-plugin-manager-ui/es/utils/language'
import todoTask_cn from 'tiklab-todotask-ui/es/utils/language'
import log_cn from 'tiklab-security-ui/es/utils/language'

import form_cn from 'tiklab-form-ui/es/utils/language'
const resources = {
    zh: {
        translation: {...orga_cn, ...eam_cn,...privilege_cn, ...message_cn, ...pluginManage_cn, ...todoTask_cn, ...log_cn, ...form_cn},
    },
}


export default resources
