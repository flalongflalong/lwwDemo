// 动态创建个人中心我的收藏中的tr标签开始

var collectNews = [{
    name: '全流程信贷系统',
    type: '源系统数据区',
    time: '2017-03-06 09:31:31',
    publisher: '用户1',
    operate: '查看'
}, {
    name: '客户关系管理系统',
    type: '源系统数据区',
    time: '2017-03-06 09:31:31',
    publisher: '用户1',
    operate: '查看'
}, {
    name: '统一报表',
    type: '数据应用区',
    time: '2017-03-06 09:31:31',
    publisher: '用户1',
    operate: '查看'
}, {
    name: '中小企业贷款管理系统',
    type: '源系统数据区',
    time: '2017-03-06 09:31:31',
    publisher: '用户1',
    operate: '查看'
}, {
    name: '核心报表系统',
    type: '源系统数据区',
    time: '2017-03-06 09:31:31',
    publisher: '用户1',
    operate: '查看'
}, {
    name: '核心系统',
    type: '源系统数据区',
    time: '2017-03-06 09:31:31',
    publisher: '用户1',
    operate: '查看'
}, {
    name: '核心柜面系统',
    type: '源系统数据区',
    time: '2017-03-06 09:31:31',
    publisher: '用户1',
    operate: '查看'
}, {
    name: '基础汇总区',
    type: '数据集成区',
    time: '2017-03-06 09:31:31',
    publisher: '用户1',
    operate: '查看'
}, {
    name: '临时区',
    type: '数据集成区',
    time: '2017-03-06 09:31:31',
    publisher: '用户1',
    operate: '查看'
}, {
    name: '统一报表集市',
    type: '数据集成区',
    time: '2017-03-06 09:31:31',
    publisher: '系统管理员',
    operate: '查看'
}, {
    name: 'DS区',
    type: '数据交换区',
    time: '2017-03-06 09:31:31',
    publisher: '系统管理员',
    operate: '查看'
}, {
    name: 'ODS系统',
    type: '数据集成区',
    time: '2017-03-06 09:31:31',
    publisher: '系统管理员',
    operate: '查看'
}, {
    name: '核心国结系统',
    type: '源系统数据区',
    time: '2017-03-06 09:31:31',
    publisher: '系统管理员',
    operate: '查看'
}, {
    name: '关键业务指标应用系统',
    type: '数据应用区',
    time: '2017-03-06 09:31:31',
    publisher: '系统管理员',
    operate: '查看'
}, {
    name: '全流程信贷系统',
    type: '源系统数据区',
    time: '2017-03-06 09:31:31',
    publisher: '用户1',
    operate: '查看'
}, {
    name: '客户关系管理系统',
    type: '源系统数据区',
    time: '2017-03-06 09:31:31',
    publisher: '用户1',
    operate: '查看'
}, {
    name: '统一报表',
    type: '数据应用区',
    time: '2017-03-06 09:31:31',
    publisher: '用户1',
    operate: '查看'
}, {
    name: '中小企业贷款管理系统',
    type: '源系统数据区',
    time: '2017-03-06 09:31:31',
    publisher: '用户1',
    operate: '查看'
}, {
    name: '核心报表系统',
    type: '源系统数据区',
    time: '2017-03-06 09:31:31',
    publisher: '用户1',
    operate: '查看'
}, {
    name: '核心系统',
    type: '源系统数据区',
    time: '2017-03-06 09:31:31',
    publisher: '用户1',
    operate: '查看'
}, {
    name: '核心柜面系统',
    type: '源系统数据区',
    time: '2017-03-06 09:31:31',
    publisher: '用户1',
    operate: '查看'
}, {
    name: '基础汇总区',
    type: '数据集成区',
    time: '2017-03-06 09:31:31',
    publisher: '用户1',
    operate: '查看'
}, {
    name: '临时区',
    type: '数据集成区',
    time: '2017-03-06 09:31:31',
    publisher: '用户1',
    operate: '查看'
}, {
    name: '统一报表集市',
    type: '数据集成区',
    time: '2017-03-06 09:31:31',
    publisher: '系统管理员',
    operate: '查看'
}, {
    name: 'DS区',
    type: '数据交换区',
    time: '2017-03-06 09:31:31',
    publisher: '系统管理员',
    operate: '查看'
}, {
    name: 'ODS系统',
    type: '数据集成区',
    time: '2017-03-06 09:31:31',
    publisher: '系统管理员',
    operate: '查看'
}, {
    name: '核心国结系统',
    type: '源系统数据区',
    time: '2017-03-06 09:31:31',
    publisher: '系统管理员',
    operate: '查看'
}, {
    name: '关键业务指标应用系统',
    type: '数据应用区',
    time: '2017-03-06 09:31:31',
    publisher: '系统管理员',
    operate: '查看'
}];

function addNews(newsId,newsInfo) {
    for (var i = 0; i < newsInfo.length; i++) {
        var curNew = newsInfo[i];
        $('#'+newsId).append($('<tr><td>' + curNew.name + '</td><td>' + curNew.type + '</td><td>' + curNew.time + '</td><td>' + curNew.publisher + '</td><td><a href="#">' + curNew.operate + '</a></td></tr>'));
    }
}
//添加我的收藏信息
addNews('my_favorite_list',collectNews);
//添加历史记录信息
addNews('history_list',collectNews);




// 动态创建个人中心我的收藏中的tr标签结束


//id是tabel的id，index是tabel中有2个标题行(tr)，index就是1，
//给我的收藏页面添加分页标签功能
addPage('#my_favorite_list', 1, 'favorite_');
//给历史记录页面添加分页标签功能
addPage('#history_list', 1, 'history_');



$('#personal_title_btn button').on('click', function() {
    var index = $(this).index();
    $(this).siblings().removeClass('btn-primary btn-primary:focus').addClass('btn-default btn:focus btn-default:focus');
    $(this).removeClass('btn-default btn:focus btn-default:focus').addClass('btn-primary btn-primary:focus');
    $('#personal_center_content>div:eq(' + index + ')').show().siblings().hide();

});



