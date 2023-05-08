const path = require('path')

export const getEnv = () => {
  return process.env.RUNNING_ENV
}

export const getConfig = () => {
  const enviroment = getEnv()
  const yamlPath = path.resolve(__dirname, `../../envConfig/${enviroment}.js`)
  const config = require(yamlPath).default
  console.log(`当前配置文件路径：${JSON.stringify(config)}`)

  return {
    ...config,
    ...process.env
  }
}