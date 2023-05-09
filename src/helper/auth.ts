import { methodVersion } from "@/utils/request"

// 获取用户凭证
export const getUserToken = async ({ code, app_token }) => {
  const { data } = await methodVersion({
    url: `/authen/v1/access_coken`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${app_token}`
    },
    params: {
      code,
      grant_type: 'authorization_code'
    }
  })

  return data
}

export const refreshUserToken = async ({ refresh_token, app_token }) => {
  const { data } = await methodVersion({
    url: `/authen/v1/refresh_access_token`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${app_token}`
    },
    params: {
      app_token,
      refresh_token,
      grant_type: 'refresh_token'
    }
  })

  return data
}