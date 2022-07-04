import {form_cn} from 'doublekit-form-ui'

import {eam_cn} from 'doublekit-eam-ui'
import {privilege_cn,} from 'doublekit-privilege-ui';
import {message_cn} from 'doublekit-message-ui';
import {orga_cn,} from 'doublekit-user-ui';
import {pluginManage_cn} from 'doublekit-plugin-ui'

const resources = {
    zh: {
        translation: {...orga_cn, ...eam_cn,...privilege_cn, ...message_cn, ...pluginManage_cn, ...form_cn},
    },
}


export default resources
