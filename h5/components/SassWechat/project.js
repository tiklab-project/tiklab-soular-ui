/**
 * @name: project
 * @author mahai
 * @date 2022/3/24 2:55 PM
 * @description project
 */


import React, {useEffect, useState} from 'react';
import {removeUser, saveUser, urlQuery} from 'doublekit-core-h5'
import weChatServiceApi from "../service/wechat.service";


const ProjectWechatSaas = ({location}) =>  {

    const query = urlQuery(location.search);

    const suite_id = "ww30f817a7f03854bd";
    const redirect_url = "http://portal.dev.doublekit.net/#/project";
    const encode = encodeURI(redirect_url);


    const [step,setStep] = useState('初始话')
    console.log('渲染')

    useEffect(() => {

        if (!query.code) {
            const url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + suite_id + "&redirect_uri=" + encode + "&response_type=code&scope=snsapi_privateinfo#wechat_redirect";
            window.location.href = url;
        }
    },[])
    useEffect(() => {
        let axiosHeader = {}
        if (query.code) {
            (async () => {
                removeUser()
                const userInfo = await weChatServiceApi.getUserinfo3rd(query.code, "h5");
                debugger
                if (!userInfo.code) {
                    setStep("H5 第一步，获取第三方用户数据")
                    const userId = userInfo.data.UserId;
                    const CorpId = userInfo.data.CorpId;
                    const tenantResponse = await getTenantByCorpId(CorpId);
                    if (!tenantResponse.code) {
                        setStep("H5 第2步，查询企业是否有租户数据")
                        const validParams = {
                            applicationType: 1,
                            corpId:CorpId
                        }
                        const checkWechat = await checkWechatApplication(validParams);
                        if (!checkWechat.code) {
                            setStep("H5 第3步，检测企业微信的的 永久授权以及是否是首次")
                            const isFirst = checkWechat.data.isFirst;
                            if (tenantResponse.data && isFirst !== 1) {
                                axiosHeader = {
                                    tenant: tenantResponse.data.id
                                }
                            }

                            const paramsTicket = {
                                userId: userId,
                                corpid: CorpId,
                                application:1
                            }
                            const ticketResponse = await getWechatApplicationTicket(paramsTicket, axiosHeader);
                            if (!ticketResponse.code) {
                                setStep("H5 第4步，获取用户ticket")
                                if (tenantResponse.data && isFirst === 0) {
                                    const url = window.location.protocol +
                                        "//192.168.10.9:3005?corpid="+`${CorpId}&tenant=${tenantResponse.data.id}&userId=${ticketResponse.data.userId}&name=${ticketResponse.data.name}&email=${ticketResponse.data.email}&phone=${ticketResponse.data.phone}&ticket=${ticketResponse.data.ticket}&phone=${ticketResponse.data.phone}`;
                                    window.location.href = url
                                } else {
                                    setStep("H5 第5步，再次获取租户，原因是第一次安装的时候，还没有租户，需要执行完上面流程才会有租户")
                                    // 是首次安装
                                    const againTenantResponse = await getTenantByCorpId(CorpId);
                                    if (againTenantResponse.code === 0 && againTenantResponse.data) {
                                        const tenantId = againTenantResponse.data.id;
                                        const syncWechatResponse = await syncWechatApplication(paramsTicket, {tenant:tenantId});
                                        if (syncWechatResponse.code === 0) {
                                            setStep("H5 第6步，同步数据完成")
                                            const url = window.location.protocol +
                                                "//192.168.10.9:3005?corpid="+`${CorpId}&tenant=${tenantId}&userId=${ticketResponse.data.userId}&name=${ticketResponse.data.name}&email=${ticketResponse.data.email}&phone=${ticketResponse.data.phone}&ticket=${ticketResponse.data.ticket}&phone=${ticketResponse.data.phone}`;
                                            window.location.href = url
                                        }
                                    }
                                }
                            }
                        }
                    }

                }
            })()
        }
    }, [query.code]);

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
        const result = await weChatServiceApi.checkWechatApplication(params);
        return result
    }
    return (
        <div>{step}</div>
    );
}

export default ProjectWechatSaas;
