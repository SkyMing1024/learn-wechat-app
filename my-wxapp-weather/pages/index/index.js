//index.js
//获取应用实例
const app = getApp()

const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}

const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowTemp: 15,
    nowWeather: "多云",
    nowWeatherBackground: '/images/sunny-bg.png',
    forecast: [],
    todayDate:'',
    todayTemp:'',

    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNowWeather();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getNowWeather(()=>{
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  getNowWeather: function(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: { "city": "beijing" },
      success: resp => {
        let temp = resp.data.result.now.temp;
        let weather = resp.data.result.now.weather;
        this.setData({
          nowTemp: temp,
          nowWeather: weatherMap[weather],
          nowWeatherBackground: '/images/' + weather + '-bg.png'
        })
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[weather],

        })
        let list = resp.data.result.forecast;
        let nowHours = new Date().getHours();
        let forecast = [];
        for(let i=0; i<24;i+=3){
          forecast.push({
            time:(i+nowHours)%24 + '时',
            iconPath: '/images/' + list[i / 3].weather+'-icon.png',
            temp:list[i/3].temp,
          })
          forecast[0].time='现在'
          this.setData({
            forecast: forecast
          })
        }
        let date = new Date();
        let month = date.getMonth()+1;
        this.setData({
          todayDate: date.getFullYear() + '-' + month +'-'+ date.getDate() + ' 今天',
          todayTemp: resp.data.result.today.minTemp + '°' + ' - ' + resp.data.result.today.maxTemp +'°'
        })
        
      },
      complete: ()=>{
        callback && callback();
      }
    })
  },
  onTapDayWeather:function(){
    //跳转至其他页面
    wx.navigateTo({
      url: '/pages/list/list',
    })
  }
})