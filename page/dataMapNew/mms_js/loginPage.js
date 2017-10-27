var errInfo = $('#login_errInfo')[0];

$('#login_btn').on('click', function() {
    var formData = $('#login_form').serialize();

    var obj = {};

    function getInfo(str) {
        var infoArr = [];
        infoArr = str.split('&');
        for (var i = 0; i < infoArr.length; i++) {
            var temp = infoArr[i].split('=');
            obj[temp[0]] = temp[1];
        }
        return obj;
    }
    var userInfo = getInfo(formData);
    var userName = userInfo.username;
    var pwd = userInfo.password;

    location.href = './mms_views/dataMap.html';
    // if (userName == '' || pwd == '') {
    //     $(errInfo).text('请输入您的用户名或密码！').css('display', 'block');

    // }
    //  else if (userName != 'admin1' || pwd != 123) {
    //     $(errInfo).text('您输入的用户名或密码有误！').css('display', 'block');
    // }
    //  else if (userName == 'admin1' && pwd == 123) {
    //     // $(errInfo).text('登录成功！').css('display','block');
    //     location.href = './mms_views/metadataAssets.html';
    // } else if (userName == 'admin2' && pwd == 456) {
    //     location.href = './mms_views/metadataView.html';
    // }

    

    // var a = $('#view_username');
    // console.log(a);

    // $.ajax({
    // 	type:'post',
    // 	url:'',
    // 	data:formData,
    // 	dataType:'json',
    // 	success:function (data){
    // 		console.log(data);
    // 	},
    // 	error:function (data){
    // 		console.log(data);
    // 	}
    // });

    return false;
})

$('#username,#password').on('focus', function() {
    $(errInfo).css('display', 'none');
})
