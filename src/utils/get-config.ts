const path = require('path')

export const getEnv = () => {
  return process.env.RUNNING_ENV
}

export const getConfig = (type?: string) => {
  const enviroment = getEnv()
  const yamlPath = path.resolve(__dirname, `../../envConfig/${enviroment}.js`)
  const config = require(yamlPath).default
  console.log(`当前配置文件路径：${JSON.stringify(config)}`)

  if (type) {
    return config[type]
  }

  return {
    ...config,
    ...process.env
  }
}