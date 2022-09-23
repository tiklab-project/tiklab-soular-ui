
import {eam_cn} from 'tiklab-eam-ui/es/_utils'
import {privilege_cn,} from 'tiklab-privilege-ui/es/_utils';
import {message_cn} from 'tiklab-message-ui/es/_utils';
import {orga_cn,} from 'tiklab-user-ui/es/_utils';
import {pluginManage_cn} from 'tiklab-plugin-ui/es/_utils'
import todoTask_cn from 'tiklab-todotask-ui/es/_utils/language'
import log_cn from 'tiklab-oplog-ui/es/_utils/language'
const resources = {
    zh: {
        translation: {...orga_cn, ...eam_cn,...privilege_cn, ...message_cn, ...pluginManage_cn, ...todoTask_cn, ...log_cn},
    },
}


export default resources
