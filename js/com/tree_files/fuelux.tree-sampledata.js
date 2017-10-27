var DataSourceTree = function(options) {
	this._data 	= options.data;
	this._delay = options.delay;
}

DataSourceTree.prototype.data = function(options, callback) {
	var self = this;
	var $data = null;

	if(!("name" in options) && !("type" in options)){
		$data = this._data;//the root tree
		callback({ data: $data });
		return;
	}
	else if("type" in options && options.type == "folder") {
		if("additionalParameters" in options && "children" in options.additionalParameters)
			$data = options.additionalParameters.children;
		else $data = {}//no data
	}
	
	if($data != null)//this setTimeout is only for mimicking some random delay
		setTimeout(function(){callback({ data: $data });} , parseInt(Math.random() * 500) + 200);

	//we have used static data here
	//but you can retrieve your data dynamically from a server using ajax call
	//checkout examples/treeview.html and examples/treeview.js for more info
};

//一级菜单
var tree_data = {
	'a' : {name: '2016', type: 'folder'}	,
	'b' : {name: '2017', type: 'folder'}
	// 'rentals' : {name: '3.0', type: 'folder'}	,
	// 'real-estate' : {name: '4.0', type: 'folder'},
	// 'pets' : {name: '5.0', type: 'folder'}
}
//二级菜单
tree_data['a']['additionalParameters'] = {
	'children' : {
		'aa' : {name: '一季度', type: 'folder'},
		'bb' : {name: '二季度', type: 'folder'},
		'cc' : {name: '三季度', type: 'folder'},
		'dd' : {name: '四季度', type: 'folder'}
	}
}
tree_data['b']['additionalParameters'] = {
	'children' : {
		'aa' : {name: '一季度', type: 'folder'}, 
		'bb' : {name: '二季度', type: 'folder'},
		'cc' : {name: '三季度', type: 'folder'},
		'dd' : {name: '四季度', type: 'folder'}
	}
}
//三级菜单
tree_data['a']['additionalParameters']['children']['aa']['additionalParameters'] = {
	'children' : {
		'aaa' : {name: '1月份', type: 'item'},
		'bbb' : {name: '2月份', type: 'item'},
		'ccc' : {name: '3月份', type: 'item'}
	}
}

tree_data['a']['additionalParameters']['children']['bb']['additionalParameters'] = {
	'children' : {
		'aaa' : {name: '4月份', type: 'item'},
		'bbb' : {name: '5月份', type: 'item'},
		'ccc' : {name: '6月份', type: 'item'}
	}
}

tree_data['a']['additionalParameters']['children']['cc']['additionalParameters'] = {
	'children' : {
		'aaa' : {name: '7月份', type: 'item'},
		'bbb' : {name: '8月份', type: 'item'},
		'ccc' : {name: '9月份', type: 'item'}
	}
}
tree_data['a']['additionalParameters']['children']['dd']['additionalParameters'] = {
	'children' : {
		'aaa' : {name: '10月份', type: 'item'},
		'bbb' : {name: '11月份', type: 'item'},
		'ccc' : {name: '12月份', type: 'item'}
	}
}

tree_data['b']['additionalParameters']['children']['aa']['additionalParameters'] = {
	'children' : {
		'aaa' : {name: '1月份', type: 'item'},
		'bbb' : {name: '2月份', type: 'item'},
		'ccc' : {name: '3月份', type: 'item'}
	}
}

tree_data['b']['additionalParameters']['children']['bb']['additionalParameters'] = {
	'children' : {
		'aaa' : {name: '4月份', type: 'item'},
		'bbb' : {name: '5月份', type: 'item'},
		'ccc' : {name: '6月份', type: 'item'}
	}
}

tree_data['b']['additionalParameters']['children']['cc']['additionalParameters'] = {
	'children' : {
		'aaa' : {name: '7月份', type: 'item'},
		'bbb' : {name: '8月份', type: 'item'},
		'ccc' : {name: '9月份', type: 'item'}
	}
}
tree_data['b']['additionalParameters']['children']['dd']['additionalParameters'] = {
	'children' : {
		'aaa' : {name: '10月份', type: 'item'},
	}
}


// tree_data['rentals']['additionalParameters'] = {
// 	'children' : {
// 		'apartments-rentals' : {name: '3.1', type: 'item'},
// 		'office-space-rentals' : {name: '3.2', type: 'item'},
// 		'vacation-rentals' : {name: '3.3', type: 'item'}
// 	}
// }
// tree_data['real-estate']['additionalParameters'] = {
// 	'children' : {
// 		'apartments' : {name: '4.1', type: 'item'},
// 		'villas' : {name: '4.2', type: 'item'},
// 		'plots' : {name: '4.3', type: 'item'}
// 	}
// }
// tree_data['pets']['additionalParameters'] = {
// 	'children' : {
// 		'cats' : {name: '5.1', type: 'item'},
// 		'dogs' : {name: '5.2', type: 'item'},
// 		'horses' : {name: '5.3', type: 'item'},
// 		'reptiles' : {name: '5.4', type: 'item'}
// 	}
// }

var treeDataSource = new DataSourceTree({data: tree_data});











var tree_data_2 = {
	'pictures'  : {name: 'Pictures',      type: 'folder',    'icon-class':'red'     }	,
	'music'     : {name: 'Music',         type: 'folder',    'icon-class':'orange'  }	,
	'video'     : {name: 'Video',         type: 'folder',    'icon-class':'blue'    }	,
	'documents' : {name: 'Documents',     type: 'folder',    'icon-class':'green'   }	,
	'backup'    : {name: 'Backup',        type: 'folder'}	,
	'readme'    : {name: '<i class="icon-file-text grey"></i> ReadMe.txt', type: 'item'},
	'manual'    : {name: '<i class="icon-book blue"></i> Manual.html', type: 'item'}
}
tree_data_2['music']['additionalParameters'] = {
	'children' : [
		{name: '<i class="icon-file-text   brown"></i> song1.ogg', type: 'item'},
		{name: '<i class="icon-file-text   brown"></i> song2.ogg', type: 'item'},
		{name: '<i class="icon-file-text   brown"></i> song3.ogg', type: 'item'},
		{name: '<i class="icon-file-text   brown"></i> song4.ogg', type: 'item'},
		{name: '<i class="icon-file-text   brown"></i> song5.ogg', type: 'item'}
	]
}
tree_data_2['video']['additionalParameters'] = {
	'children' : [
		{name: '<i class="icon-file-text  brown"></i> movie1.avi', type: 'item'},
		{name: '<i class="icon-file-text  brown"></i> movie2.avi', type: 'item'},
		{name: '<i class="icon-file-text  brown"></i> movie3.avi', type: 'item'},
		{name: '<i class="icon-file-text  brown"></i> movie4.avi', type: 'item'},
		{name: '<i class="icon-file-text  brown"></i> movie5.avi', type: 'item'}
	]
}
tree_data_2['pictures']['additionalParameters'] = {
	'children' : {
		'wallpapers' : {name: 'Wallpapers', type: 'folder', 'icon-class':'pink'},
		'camera' : {name: 'Camera', type: 'folder', 'icon-class':'pink'}
	}
}
tree_data_2['pictures']['additionalParameters']['children']['wallpapers']['additionalParameters'] = {
	'children' : [
		{name: '<i class="icon-file-text brown"></i> wallpaper1.jpg', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> wallpaper2.jpg', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> wallpaper3.jpg', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> wallpaper4.jpg', type: 'item'}
	]
}
tree_data_2['pictures']['additionalParameters']['children']['camera']['additionalParameters'] = {
	'children' : [
		{name: '<i class="icon-file-text brown"></i> photo1.jpg', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> photo2.jpg', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> photo3.jpg', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> photo4.jpg', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> photo5.jpg', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> photo6.jpg', type: 'item'}
	]
}


tree_data_2['documents']['additionalParameters'] = {
	'children' : [
		{name: '<i class="icon-file-text brown"></i> document1.pdf', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> document2.doc', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> document3.doc', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> document4.pdf', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> document5.doc', type: 'item'}
	]
}

tree_data_2['backup']['additionalParameters'] = {
	'children' : [
		{name: '<i class="icon-file-text brown"></i> backup1.zip', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> backup2.zip', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> backup3.zip', type: 'item'},
		{name: '<i class="icon-file-text brown"></i> backup4.zip', type: 'item'}
	]
}
var treeDataSource2 = new DataSourceTree({data: tree_data_2});