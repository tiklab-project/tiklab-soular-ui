
import {eam_cn} from 'tiklab-eam-ui/es/_utils'
import {privilege_cn,} from 'tiklab-privilege-ui/es/_utils';
import {message_cn} from 'tiklab-message-ui/es/_utils';
import {orga_cn,} from 'tiklab-user-ui/es/_utils';
import {pluginManage_cn} from 'tiklab-plugin-ui/es/_utils'

const resources = {
    zh: {
        translation: {...orga_cn, ...eam_cn,...privilege_cn, ...message_cn, ...pluginManage_cn},
    },
}


export default resources
