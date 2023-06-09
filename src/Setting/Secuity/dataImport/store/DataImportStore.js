import {action,observable} from "mobx";
import {Axios} from "tiklab-core-ui";

export class DataImportStore{

    /**
     * 导入数据
     * @param value
     * @returns {Promise | Promise<unknown>}
     */
    @action
    importData = value =>{
        return Axios.post("/data/import",value)
    }

    /**
     * 获取进度信息
     * @returns {*}
     */
    @action
    findImportMessage = () =>{
        return Axios.post("/data/findImportMessage")
    }


}

export const DATAIMPORT_STORE = "dataImportStore"
