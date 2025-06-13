// 平台适配工具类
const platform = uni.getSystemInfoSync().platform
const systemInfo = uni.getSystemInfoSync()

export const isIOS = platform === 'ios'
export const isAndroid = platform === 'android'
export const isH5 = platform === 'web'
export const isWeixin = platform === 'mp-weixin'
export const isAlipay = platform === 'mp-alipay'

// 获取状态栏高度
export const getStatusBarHeight = () => systemInfo.statusBarHeight || 0

// 获取安全区域
export const getSafeAreaInsets = () => {
  if (typeof systemInfo.safeAreaInsets !== 'undefined') {
    return systemInfo.safeAreaInsets
  }
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
}

// 检查API可用性
export const checkApiSupport = (apiName) => {
  return new Promise((resolve) => {
    if (uni[apiName]) {
      uni.checkIsSupportSoterAuthentication({
        success: (res) => {
          resolve(true)
        },
        fail: () => {
          resolve(false)
        }
      })
    } else {
      resolve(false)
    }
  })
}

// 适配不同平台的分享功能
export const shareContent = (options) => {
  if (isWeixin) {
    return new Promise((resolve, reject) => {
      uni.showShareMenu({
        withShareTicket: true,
        success: resolve,
        fail: reject
      })
    })
  } else if (isH5) {
    // H5环境下的分享处理
    const shareData = {
      title: options.title,
      text: options.desc,
      url: options.link
    }
    if (navigator.share && navigator.canShare(shareData)) {
      return navigator.share(shareData)
    }
  }
  // 其他平台的分享处理
  return Promise.resolve()
}

// 获取当前环境
export const getEnv = () => {
  let env = 'production'
  // #ifdef DEBUG
  env = 'development'
  // #endif
  return env
}

// 设备适配
export const deviceAdapter = {
  // 是否是刘海屏
  isNotchScreen: () => {
    const res = uni.getSystemInfoSync()
    return res.safeArea?.top > 20 || res.notchHeight > 0
  },

  // 获取屏幕宽度
  screenWidth: systemInfo.screenWidth,

  // 获取屏幕高度
  screenHeight: systemInfo.screenHeight,

  // 获取像素比
  pixelRatio: systemInfo.pixelRatio,

  // 获取字体缩放比例
  fontScale: systemInfo.fontScale || 1
}

export default {
  isIOS,
  isAndroid,
  isH5,
  isWeixin,
  isAlipay,
  getStatusBarHeight,
  getSafeAreaInsets,
  checkApiSupport,
  shareContent,
  getEnv,
  deviceAdapter
} 