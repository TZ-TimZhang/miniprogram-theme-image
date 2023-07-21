// eslint-disable-next-line no-undef
// @ts-ignore
import Base64 from './base64.ts'

function isObject(val: any) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false
}
// eslint-disable-next-line no-undef
const app = getApp()

Component({
  options: {
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
  properties: {
    imageClass: {
      type: String,
      value: '',
    },
    img: {
      type: String,
      optionalTypes: [Object],
      value: '',
      observer: '_genSrcByIcon',
    },
    theme: {
      type: String,
      value: 'light',
      observer: '_genSrcByTheme',
    },
    mode: {
      type: String,
      value: 'aspectFill',
    },
  },
  data: {
    src: '',
  },
  methods: {
    _genSrcByTheme(theme) {
      if (isObject(this.data.img)) {
        const data = this.data.img[theme]
        if (!data) {
          return
        }
        this._genSrc(data)
      } else {
        const imgData = app.globalData.imageData
        if (imgData) {
          const data = imgData[this.data.img][this.data.theme]
          if (!data) {
            return
          }
          this._genSrc(data)
        }
      }
    },
    _genSrcByIcon(img) {
      if (isObject(img)) {
        const data = img[this.data.theme]
        if (!data) {
          return
        }
        this._genSrc(data)
      } else {
        const imgData = app.globalData.imageData
        if (imgData) {
          const data = imgData[img][this.data.theme]
          if (!data) {
            return
          }
          this._genSrc(data)
        }
      }
    },
    _genSrc(rawData) {
      if (!rawData) return // type 不存在
      if (rawData.startsWith('<svg')) {
        const base64 = Base64.encode(rawData)
        this.setData({
          src: 'data:image/svg+xml;base64,' + base64,
        })
      } else {
        this.setData({
          src: rawData,
        })
      }
    },
  },
})
