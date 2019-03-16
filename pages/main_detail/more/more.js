var app = getApp()

Page({
    data: {
        navbar: ['校园地图', '校历'],
        currentTab: 0,
    },
    // 导航切换监听
    navbarTap: function (e) {
        console.debug(e);
        this.setData({
            currentTab: e.currentTarget.dataset.idx
        });
    },
})
