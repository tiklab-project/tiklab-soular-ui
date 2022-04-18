/**
 * @name: useDingDingAuthConfig
 * @author: mahai
 * @date: 2021-10-29 13:05
 * @description：钉钉登录获取appkey和appsecret
 * @update: 2021-10-29 13:05
 */
import React, {useState, useEffect} from 'react';
import Api from '../login/api';

const useAuthConfig = (relDirectoryId) => {
  const [authKeys, setAuthKeys] = useState(null);
  useEffect(async () => {
      if (relDirectoryId) {
          await getAuthKeys(relDirectoryId)
      }
  }, [relDirectoryId]);

  const getAuthKeys = async (id) => {
      const res = await Api.getConfByRelDirectoryId(id)
      if (res.code === 0) {
          setAuthKeys(res.data)
      }
  }
  return authKeys
}
export default useAuthConfig
