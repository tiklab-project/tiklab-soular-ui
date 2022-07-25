
import {eam_cn} from 'doublekit-eam-ui/es/_utils'
import {privilege_cn,} from 'doublekit-privilege-ui/es/_utils';
import {message_cn} from 'doublekit-message-ui/es/_utils';
import {orga_cn,} from 'doublekit-user-ui/es/_utils';
import {pluginManage_cn} from 'doublekit-plugin-ui/es/_utils'

const resources = {
    zh: {
        translation: {...orga_cn, ...eam_cn,...privilege_cn, ...message_cn, ...pluginManage_cn},
    },
}


export default resources
