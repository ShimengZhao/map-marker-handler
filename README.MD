# map-marker-handler 组件介绍
- [简介](#简介)
- [功能](#功能)
- [demo](#demo)
## 简介
当使用微信小程序的map组件作为添加marker的平台时，有一些操作遵从相对固定的模式。该组件将这些操作模式进行封装，以便直接调用。
## 功能
1. Cover  
当地图初始化时，地图上会有一层cover, 提示“点击地图添加位置”
2. 选则marker添加方式  
点击cover，可选择“在地图上选择位置”或“使用设备当前位置”来添加marker
3. 点击添加多个marker  
选择“在地图上选择位置”之后，可通过点击地图上的位置，添加多个marker
4. 点击marker删除  
点击已经设置的marker，可以删除该marker；当marker数量被删除至0时，地图的cover会恢复
5. 向父组件传递所选marker
在父组件中，使用微信小程序提供的[selectComponent api](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html)，可以接受map-marker-handler传递过来的所有marker的数据；
## Demo