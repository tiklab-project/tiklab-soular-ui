/**
 * @name: useWechatConfig
 * @author mahai
 * @date 2022/5/5 6:40 PM
 * @description 企业微信服务商不同系统的hook
 */
import React, {useEffect, useState} from 'react';
import {Axios, removeUser, saveUser} from "tiklab-core-ui";
import weChatServiceApi from "./wechat.service";
// import {message} from "antd";

const useWechatConfig = (history, type, query) => {

    const [suiteId,setSuiteId] = useState(null);
    const [redirectUrl,setRedirectUrl] = useState(null);
    const [url,setUrl] = useState(null);

    const [step,setStep] = useState('初始话')

    useEffect(() =>{
        (async () => {
            const response = await wechatConfig();
            let suite_id,redirect_url, url = null;
            if (!response.code) {
                switch (type) {
                    case 'portal':
                        suite_id = response.data.wechatSuiteId;
                        redirect_url = encodeURI(response.data.wechatRedirectUrl);
                        break;
                    default:
                        suite_id = response.data.wechatSuiteId;
                        redirect_url = encodeURI(response.data.wechatRedirectUrl);
                        url = response.data.wechatApplicationUrl;
                }
                setRedirectUrl(redirect_url);
                setUrl(url);
                setSuiteId(suite_id)
            }
        })()
    },[]);

    useEffect(() => {
        if (!query.code && redirectUrl && suiteId) {
            const url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + suiteId + "&redirect_uri=" + redirectUrl + "&response_type=code&scope=snsapi_privateinfo#wechat_redirect";
            return window.location.href = url;
        }
    }, [redirectUrl, suiteId]);

    useEffect(() => {
        let axiosHeader = {}
        if (query.code && redirectUrl && suiteId) {
            (async () =>{
                removeUser()
                const userInfo = await weChatServiceApi.getUserinfo3rd(query.code, type);
                if (!userInfo.code) {
                    setStep("第一步，获取第三方用户数据")
                    const userId = userInfo.data.UserId;
                    const CorpId = userInfo.data.CorpId;
                    const tenantResponse = await getTenantByCorpId(CorpId);
                    if (!tenantResponse.code) {
                        setStep("第2步，查询企业是否有租户数据")
                        const validParams = {
                            application: getApplictaionType(type),
                            corpId:CorpId
                        }
                        const checkWechat = await checkWechatApplication(validParams);
                        if (!checkWechat.code) {
                            setStep("第3步，检测企业微信的的 永久授权以及是否是首次")
                            let isFirst = 0
                            if (checkWechat.data) {
                                isFirst = checkWechat.data.isFirst;
                            }
                            if (tenantResponse.data && isFirst !== 1) {
                                axiosHeader = {
                                    tenant: tenantResponse.data.id
                                }
                            }
                            const paramsTicket = {
                                userId: userId,
                                corpid: CorpId,
                                application:getApplictaionType(type)
                            }
                            const ticketResponse = await getWechatApplicationTicket(paramsTicket, axiosHeader);
                            if (!ticketResponse.code) {
                                setStep("第4步，获取用户ticket")
                                debugger
                                if (tenantResponse.data && isFirst === 0) {
                                    const userCookie = {
                                        corpid: CorpId,
                                        tenant:tenantResponse.data.id,
                                        userId: ticketResponse.data.userId,
                                        name: ticketResponse.data.name,
                                        email:ticketResponse.data.email,
                                        phone: ticketResponse.data.phone,
                                        isRam: 1,
                                        ticket: ticketResponse.data.ticket,
                                        applicationType: getApplictaionType(type)
                                    }
                                    saveUser(userCookie)
                                    if (type === 'portal') {
                                        history.push('/')
                                    } else {
                                        if (url) {
                                            return window.location.href = url + "?corpid=" + `${CorpId}&tenant=${tenantResponse.data.id}&userId=${ticketResponse.data.userId}&name=${ticketResponse.data.name}&email=${ticketResponse.data.email}&phone=${ticketResponse.data.phone}&ticket=${ticketResponse.data.ticket}&isRam=1`
                                        } else {
                                            // return message.error('配置参数中没有跳转项目的url')
                                        }
                                    }
                                } else {
                                    setStep("第5步，再次获取租户，原因是第一次安装的时候，还没有租户，需要执行完上面流程才会有租户")
                                    // 是首次安装
                                    const againTenantResponse = await getTenantByCorpId(CorpId);
                                    if (againTenantResponse.code === 0 && againTenantResponse.data) {
                                        const tenantId = againTenantResponse.data.id;
                                        const syncWechatResponse = await syncWechatApplication(paramsTicket, {tenant:tenantId});
                                        if (syncWechatResponse.code === 0) {
                                            const userCookie = {
                                                corpid: CorpId,
                                                tenant:tenantId,
                                                userId: ticketResponse.data.userId,
                                                name: ticketResponse.data.name,
                                                email:ticketResponse.data.email,
                                                phone: ticketResponse.data.phone,
                                                isRam: 1,
                                                ticket: ticketResponse.data.ticket,
                                                applicationType: getApplictaionType(type)
                                            }
                                            saveUser(userCookie)
                                            setStep("第6步，同步数据完成")
                                            if (type === 'portal') {
                                                history.push('/')
                                            } else {
                                                if (url) {
                                                    return window.location.href = url + "?corpid=" + `${CorpId}&tenant=${tenantId}&userId=${ticketResponse.data.userId}&name=${ticketResponse.data.name}&email=${ticketResponse.data.email}&phone=${ticketResponse.data.phone}&ticket=${ticketResponse.data.ticket}&isRam=1`
                                                } else {
                                                    return message.error('配置参数中没有跳转项目的url')
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }


            })()
        }
    }, [query.code, redirectUrl, suiteId]);

    const wechatConfig = async () => {
        return await Axios.post('/authConfig/getWechatConfig')
    };


    const getApplictaionType = (type) => {
        switch (type) {
            case "portal" : {
                return 0;
            }
            case "project" : {
                return 1;
            }
            case "wiki" : {
                return 2;
            }
            case "jest" : {
                return 3;
            }
            case "apibox" : {
                return 4;
            }
            default:{
                return 0
            }
        }
    }

    // 查询企业租户id
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
        return await weChatServiceApi.checkWechatApplication(params)
    }
    return step
}


export default useWechatConfig
