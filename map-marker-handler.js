// components/map-handler/map-handler.js
Component({
  /**
   * Component properties
   */
  behaviors: ['wx://component-export'],
  properties: {
    longitude: Number,
    latitude: Number
  },

  /**
   * Component initial data
   */
  data: {
    show_cover: true,
    first_tap: true,
    marker_position: {
      lon: 0,
      lat: 0
    },
    markers: []
  },
  // export the 'markers' field
  export(){
    return {
      markers: this.data.markers
    }
  },
  /**
   * Component methods
   */
  methods: {
    // entry point for setting the position
    // selection action based on whether this is the first tap
    tapAction: function (e) {
      if (this.data.first_tap) {
        this._startSetting(e)
      } else {
        this._setMarkerFromTapping(e)
      }
    },
    // if this is the first tap: remove the cover, get location from the corresponding function
    _startSetting: function (e) {
      let that = this
      wx.showActionSheet({
        itemList: ['在地图上选择位置', '使用设备当前位置'],
        success(res) {
          that.setData({ show_cover: false })
          if (res.tapIndex === 1) {
            that._setMarkerFromCurrentLocation()
          }
          that.setData({ first_tap: false })
        }
      })
    },
    _setMarkerFromTapping: function (e) {
      this.setData({
        marker_position: {
          lat: e.detail.latitude,
          lon: e.detail.longitude
        }
      })
      this._addMarkers()
    },
    _setMarkerFromCurrentLocation: function () {
      let that = this
      wx.getLocation({
        success(res) {
          that.setData({
            marker_position: {
              lat: res.latitude,
              lon: res.longitude
            }
          })
          that._addMarkers()
        }
      })
    },
    _addMarkers: function () {
      this.data.markers.push({
        id: Date.now(),
        latitude: this.data.marker_position.lat,
        longitude: this.data.marker_position.lon,
        label: {
          content: (new Date()).toDateString(),
          fontSize: 10,
          anchorY: -10,
          anchorX: 10
        }
      })
      this.setData({
        markers: this.data.markers
      })
    },
    removeMarker: function (e) {
      let that = this
      wx.showModal({
        title: "提示",
        content: '是否移除此位置？',
        cancelColor: 'cancelColor',
        success(res) {
          if (res.confirm) {
            let marker_list = that.data.markers.filter(v => v.id != e.detail.markerId)
            that.setData({ markers: marker_list })
            // resume the cover when marker list is empty
            if (that.data.markers.length === 0){
              that.setData({
                show_cover: true,
                first_tap: true
              })
            }
          }
        }
      })
    },

  }
})
