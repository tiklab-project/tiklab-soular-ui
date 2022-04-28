/**
 * @name: wechat
 * @author mahai
 * @date 2022/3/10 9:17 AM
 * @description 其他应用在企业微信中安装，需要同步组织用户，以及租户创建
 */


import React, {useEffect, useState} from "react";
import {saveUser, removeUser, urlQuery} from "doublekit-core-ui";
import weChatServiceApi from "../service/wechat.service";


const Wechat = (props) => {
    const params = urlQuery(props.location.search);
    const [step,setStep] = useState(0)
    const [errorData,setErrorData] = useState('')
    useEffect( () => {
        removeUser()
        if (params && params.corpid) {
            const validParams = {
                applicationType: params.application,
                corpId: params.corpid
            }
            setStep(1)
            let axiosHeader = {}
            getTenantByCorpId(params.corpid).then(tenant => {
                setStep(2)
                if (tenant.code === 0) {
                    // 检测企业微信的的 永久授权以及是否是首次
                    checkWechatApplication(validParams).then(checkApplication => {
                        setStep(3)
                        if (checkApplication.code === 0 ) {
                            if (checkApplication.data) {
                                const isFirst = checkApplication.data.isFirst;
                                if (tenant.data && isFirst !== 1) {
                                    axiosHeader = {
                                        tenant: tenant.data.id
                                    }
                                }
                            }
                            // 获取ticket
                            getWechatApplicationTicket(params, axiosHeader).then(applicationTicket => {
                                setStep(4)
                                if (applicationTicket.code === 0 ) {
                                    saveUser(applicationTicket.data)
                                    // 再次获取住户id
                                    getTenantByCorpId(params.corpid).then(tenantAgain => {
                                        if (tenantAgain.code === 0) {
                                            if (tenantAgain.data) {
                                                const tenantId = tenantAgain.data.id
                                                // 同步数据
                                                syncWechatApplication(params, {tenant:tenantId}).then((syncResult) => {
                                                    setStep(5)
                                                    if (syncResult.code === 0 ) {
                                                        // saveUser(applicationTicket.data);
                                                        let projectPath = "";
                                                        const application = params.application;
                                                        switch (application) {
                                                            case "1":
                                                                projectPath = "/project/"
                                                                break;
                                                            case "2":
                                                                projectPath = "/wiki/"
                                                                break;
                                                            case "3":
                                                                projectPath = "/jtest/"
                                                                break;
                                                            case "4":
                                                                projectPath = "/apibox/"
                                                                break;
                                                            default:
                                                                projectPath = "/workbench/";

                                                        }
                                                        if (tenantAgain.data) {
                                                            const url = window.location.protocol +
                                                                "//www." + wechatUrl +
                                                                `/#/?corpid=${tenantAgain.data.id}&tenant=${tenantAgain.data.id}&userId=${applicationTicket.data.userId}&name=${applicationTicket.data.name}&email=${applicationTicket.data.email}&phone=${applicationTicket.data.phone}&ticket=${applicationTicket.data.ticket}&phone=${applicationTicket.data.phone}`;
                                                            window.location.href = url
                                                        } else  {
                                                            getTenantByCorpId(params.corpid).then(tenantAgain => {
                                                                if (tenantAgain.code === 0) {
                                                                    const url = window.location.protocol +
                                                                        "//www." + wechatUrl +
                                                                        `/#/?corpid=${tenantAgain.data.id}&tenant=${tenantAgain.data.id}&userId=${applicationTicket.data.userId}&name=${applicationTicket.data.name}&email=${applicationTicket.data.email}&phone=${applicationTicket.data.phone}&ticket=${applicationTicket.data.ticket}&phone=${applicationTicket.data.phone}`;
                                                                    window.location.href = url
                                                                } else {
                                                                    setErrorData("再次获取住户数据根据企业id---" + JSON.stringify(syncResult))
                                                                }
                                                            })

                                                        }

                                                    } else {
                                                        setErrorData("同步企业微信数据失败---" + JSON.stringify(syncResult))
                                                    }
                                                })
                                            } else {
                                                setErrorData("再次获取住户数据根据企业id---没有查询到创建的住户" + JSON.stringify(tenantAgain))
                                            }
                                        } else {
                                            setErrorData("再次获取住户数据根据企业id---" + JSON.stringify(tenantAgain))
                                        }
                                    })
                                } else {
                                    setErrorData("创建企业微信或者登录企业微信获取ticket---" + JSON.stringify(applicationTicket))
                                }
                            })
                        } else {
                            setErrorData('检测企业微信' + JSON.stringify(checkApplication))
                        }
                    })
                } else {
                    setErrorData('根据企业id获取住户id' + tenant.msg)
                }
            })

        }
    }, []);

    // 获取租户id
    const getTenantByCorpId = async (id) => {
        return await weChatServiceApi.getTenantByCorpId(id)
    }

    // 获取ticket
    const getWechatApplicationTicket = async (params, header) => {
        return await weChatServiceApi.getWechatApplicationTicket(params, header)
    }

    // 同步企业微信的数据
    const syncWechatApplication = async (params, header) => {
        return await weChatServiceApi.syncWechatApplication(params, header)
    }
    // 校验企业微信的数据
    const checkWechatApplication = async (params) => {
        const result = await weChatServiceApi.checkWechatApplication(params);
        return result
    }


    if (!params.corpid) return <div>参数错误！</div>

    switch (step) {
        case 1:
            return <div>开始根据企业id检测是否有租户...</div>
        case 2:
            return <div>根据企业id检测是否有租户完成： {errorData && errorData.toString()}</div>
        case 3:
            return <div>检测是否是首次： {errorData && errorData.toString()}</div>
        case 4:
            return <div>获取用户ticket : {errorData && errorData.toString()}</div>
        case 5:
            return <div>同步微信的组织架构 : {errorData && errorData.toString()}</div>
        default:
            return <div>准备中...</div>
    }
}

export default Wechat;
