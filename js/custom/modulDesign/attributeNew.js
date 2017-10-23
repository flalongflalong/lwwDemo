
var o = newJsPlumb.findOption();
var contextmenu = {
    bindings: o.trMenus,
    menuStyle: o.menuStyle,
    itemStyle: o.itemStyle,
    itemHoverStyle: o.itemHoverStyle
}

/*增加条件 复制tr*/
function cloneNodeFilterTr(el){
    var tableP = $(el).parents('div.tab-pane').find('table');
    var trFirst = tableP.find('.tr_filter_clone:first'),trLast = tableP.find('.tr_filter_clone:last');
    return trFirst.clone().contextMenu('fieldTrMenu', contextmenu).show().insertAfter(trLast);
}

/*检验TR数据是否正确*/
function checkTr(tr) {
    var tdArray = tr.find('td'),errL = tr.find('err-notice').length;
    if (errL>0) return false;
    for (var i = 0,l= tdArray.length;i<l;i++) {
        var td = tdArray[i],tdChildren = td.children;
        for(var ii=0,ll=tdChildren.length;ii<ll;ii++) {
            var c = tdChildren[ii], cTag = c.tagName;
            if (cTag == 'SELECT') {
                if (!$(c).val() || $(c).val()=='null') {return false}
            } else if (cTag == 'INPUT') {
                if ($(c).val().length == 0) {return false}
            }
        }
    }
    return true
}

var getNodeFieldArray = function () {
    var tabelP = $('#tabField').find('table');
    var selArray = $(tabelP).find('input[name="checkOne"]');
    var fieldArray = [];
    for (var i = 0,l = selArray.length;i<l;i++) {
        if (selArray[i].checked) {
            var f = $(selArray[i]).parents('tr').find('td:eq(1)').text();
            fieldArray.push(f)
        }
    }
    return fieldArray
}
var getCondition = function (tableEl,trClass) {
    var tabelP = tableEl.find('table');
    var trArray = $(tabelP).find('tr'+trClass);
    var ConArray = [];
    for (var i = 0,l = trArray.length;i<l;i++) {
        var tEl = $(trArray[i]);
        if (checkTr(tEl)) {
            var o = {},tdArray = tEl.find('td');
            $.each(tdArray,function () {
                var p = $(this).data('type'),v1 = $(this).find('select').val(),v2 = $(this).find('input').val();
                o[p] = v1?v1:v2;
            })
            ConArray.push(o)
        }
    }

    console.log('ConArray！！！' + ConArray)
    return ConArray
}

/*发送后台校验筛选条件  返回校验结果、预览SQL语句*/
function sqlCheck() {
    var dataInfo = newJsPlumb.node_active.data('info'),el = $('#tabFilter'),c = '.tr_filter_clone';
    var filter = {
        'tableId':dataInfo.id,
        'tableName':dataInfo.process_name,
        'fieldArray' : getNodeFieldArray(),
        'filterCondition' : getCondition(el,c),
        'filterSql':''
    }

    alert (JSON.stringify(filter));

    var ret = 'success',retSql = 'select * from table where 1=1';
    filter.ret = ret;
    filter.filterSql = retSql;
    return filter;
}
/*发送后台校验映射条件  返回校验结果、预览SQL语句*/
function mappingCheck() {
    var connInfo = newJsPlumb.conn_active,el = $('#mapingTableTab'),c = '.tr_mapping_clone';
    var filter = {
        'sourceId':connInfo.sourceId,
        'targetId':connInfo.targetId,
        'mappingCondition' : getCondition(el,c),
        'mappingSql':''
    }

    alert (JSON.stringify(filter));

    var ret = 'success',retSql = 'select a.*,b.* from table1 a,table2 b where a.id = b.id';
    filter.ret = ret;
    filter.mappingSql = retSql;
    return filter;
}

/*保存筛选条件*/
function saveFilter(e) {
    console.log('保存成功！！！');

    var el = window.event.srcElement?window.event.srcElement:event.target;
    var modelInfo = $(el).parents('#attributeModal').data('info'),
        modelType = modelInfo.scope?'mapping':'filter';
    if (modelType == 'mapping') {
        var conn = newJsPlumb.findInstance().getConnections({source:modelInfo.sourceId,target:modelInfo.targetId});
        var mapping = mappingCheck();
        if (mapping.ret == 'success' && conn.length>0) {
            conn[0].mapping = mapping;
            hideModal($('#attributeModal'))
            return true
        } else {
            mAlert('err sql!!!')
            return false
        }
    }
    else if (modelType == 'filter') {
        var dataInfo = newJsPlumb.node_active.data('info');
        var filter = sqlCheck();
        if (filter.ret == 'success') {
            dataInfo.filter = filter;
            hideModal($('#attributeModal'))
            return true
        } else {
            mAlert('err sql!!!')
            return false
        }
    }
}

/*检测时候有表结构信息 如果没有 则发送后台获取*/
function checkTableFieldInfo (dataInfo) {
    var tableId = dataInfo.id;
    if (!dataInfo.field_data) {
        /*后台 获取表结构信息*/
        console.log('获取表结构信息')

        var treeNode = $.fn.zTree.getZTreeObj("zTree").getNodeByParam("id", tableId, null);
        dataInfo.field_data = treeNode.data;
        return dataInfo
    } else {
        return dataInfo
    }
}

//根据基本信息的下一步骤，设置《条件设置》tab的条件列表
function fnSetCondition(){

    /*检查是否全选*/
    var checkAll = function (e) {
        var el;
        if (e.tagName == 'INPUT') {
            el = $(e)
        } else {
            el = $(e.target);
        }
        var elType = el.attr('name');
        var tabelP = el.parents('table');
        var selAll = $(tabelP).find('input[name="checkAll"]');
        var selArray = $(tabelP).find('input[name="checkOne"]');

        if (elType == 'checkAll') {
            var checkState = $(el)[0].checked;
            for (var i = 0,l = selArray.length;i<l;i++) {
                $(selArray[i]).prop('checked', checkState);
            }
            return checkState;
        } else {
            for (var i = 0,l = selArray.length;i<l;i++) {
                if (!selArray[i].checked) {
                    selAll.prop('checked', false);
                    return false
                }
            }
            selAll.prop('checked', true);
            return true
        }
    }

    /*校验字段值是否正确 */
    var checkVal = function (v,t,l) {
        var vl = v.length,errMsg = 'success';
        var validateInt = function (val){//验证整数
            var patten = /^-?\d+$/;
            return patten.test(val);
        }
        var validateNum = function (val){//验证小数，保留一位小数点
            var patten = /^-?\d+\.?\d{0,1}$/;
            return patten.test(val);
        }

        if (vl>l && l>0) { errMsg = '字符最大长度为'+l+'！'}
        else {
            switch (t) {
                case ('INTEGER') :
                    if (!validateInt(v)) errMsg = '请输入正确的数值';
                    break;
                case ('NUMBER','FLOAT ','REAL','DECIMAL') :
                    if (!validateNum(v)) errMsg = '请输入正确的数值';
                    break;
                default:
            }
        }
        return errMsg
    }

    var checkSelCon = function (e) {
        console.log('checkSelCon！！！')
        var el = $(e.target),elType = el.attr('data-type')//sel or value
            ,trP = el.parents('tr'),tableP = trP.parents('table')
            ,elSel = trP.find('select.field-sel'),elVal = trP.find('input.field-value'),fieldType = elSel.find("option:selected").data('field'),valueType = elSel.find("option:selected").data('fieldtype'), fieldV = elVal.val();
        if (!valueType) {
            elSel.addClass('err-notice'); return false;
        } else {
            elSel.removeClass('err-notice');
        }
        var fieldVT = valueType.split('(')[0].toUpperCase(),fieldVL = (valueType.split('(')[1])?(/\(([^()]+)\)/g.exec(valueType)[1]):0;
        elVal.removeClass('err-notice').next().remove();
        if (elType == 'sel') {
            elSel.attr('title','字段ID   :'+fieldType+',\n字段类型:'+ valueType),elVal.val('');
        } else if (elType == 'value') {
            var checkMsg = checkVal(fieldV,fieldVT,fieldVL);
            if (checkMsg != 'success') {
                $('<span class="err-notice">'+checkMsg+'</span>').insertAfter(elVal.addClass('err-notice'))
            }
        }
    }

    var conditionInit = function (el,dataInfo) {
        var tabArray = el.find('.tab-content').find('.tab-pane');
        for (var ti=0,tl=tabArray.length;ti<tl;ti++) {
            var tabEl = $($(tabArray)[ti]), tabType = tabEl.data('type'),tabContent = tabEl.find('.tab-pane-content'),columns;

            if (!dataInfo.field_data) return false;
            columns = dataInfo.field_data;

            if (tabType == 'field') {
                var fieldArray = dataInfo.filter?dataInfo.filter.fieldArray:0,
                    fieldTable = tabContent.DataTable({ language: dataTableLanguage,bPaginate:false,bSort:false}).clear().draw();
                tabContent.find('td').css('position','relative');
                for (var i = 0; i < columns.length; i++) {
                    fieldTable.row.add( ['<input type="checkbox"  name="checkOne" class="group-checkable" '+ ((fieldArray && ($.inArray(columns[i].column,fieldArray) != -1))?"checked":"")+' />',columns[i].column,columns[i].columnType,columns[i].comments] ).draw( false );
                }
                tabContent.find('input').on('change', checkAll);
                tabContent.on('input propertychange','select.field-sel,input.field-value', checkSelCon);
            } else if (tabType == 'condition') {
                var filterCondition = dataInfo.filter?dataInfo.filter.filterCondition:0,selEl = tabContent.find('.field-sel'),selH = '<option data-fieldtype="null" value="null" checked>选择字段</option>';

                for (var i = 0; i < columns.length; i++) {
                    selH += '<option data-field="'+columns[i].column +'" data-fieldType = "'+ columns[i].columnType +'">'+columns[i].comments+'</option>'
                }
                $(selH).appendTo(selEl);

                tabContent.find('tr').contextMenu('fieldTrMenu', contextmenu);
                /*回填筛选条件*/
                if (filterCondition) {
                    for (var j = 0 ; j <filterCondition.length;j++) {
                        console.log(filterCondition[j])
                        var tElFirst =  tabContent.find('tr.tr_filter_clone:eq(0)');
                        var tEl = tabContent.find('tr.tr_filter_clone:eq('+(j+1)+')');
                        if (!tEl[0]) { tEl = cloneNodeFilterTr(tElFirst)}
                        var tdArray = tEl.find('td');
                        $.each(tdArray,function () {
                            var p = $(this).data('type'),v1 = $(this).find('select'),v2 = $(this).find('input'),v = filterCondition[j][p];
                            if (v1[0]) {
                                v1.val(v);
                            } else if (v2[0]) {
                                v2.val(v)
                            }
                        })
                    };
                }
            } else if (tabType == 'sqlPreview') {
                var filterSql = dataInfo.filter?dataInfo.filter.filterSql:0;
                if (filterSql) tabContent.html (filterSql);
            }
        }
    }

    /*表信息筛选*/
    if ($('#field_attribute')[0]) {
        var el = newJsPlumb.node_active,dataInfo = el.data('info'),dataId = dataInfo.id;
        dataInfo = checkTableFieldInfo(dataInfo);

        conditionInit($('#field_attribute'),dataInfo);
        checkAll($('#tabField').find('table').find('input')[1]);
    }
    /*表之间关联关系*/
    else if ($('#column_mapping')[0]) {
        var mappingTable = $('#mapingTableTab'), mappingSqlTable = $('#mappingSqlTab'),
            selResEl = mappingTable.find('.sel-resource-field'),selTarEl = mappingTable.find('.sel-target-field'),
            connInfo = newJsPlumb.conn_active,sourceInfo = $(connInfo.source).data('info'),targetInfo = $(connInfo.target).data('info'),selR = '',selT = '',
            mappingCondition = connInfo.mapping?connInfo.mapping.mappingCondition:0,
            mappingSql = connInfo.mapping?connInfo.mapping.mappingSql:0;

        selR = selT = '<option data-fieldtype="null" value="null" checked>选择字段</option>';
        mappingTable.find('th.th-resource').text(sourceInfo.process_name);
        mappingTable.find('th.th-target').text(targetInfo.process_name);

        /*初始化映射界面*/
        var mappingInit = function (sourceColumns,targetColumns) {
            for (var i = 0; i < sourceColumns.length; i++) {
                selR += '<option data-field="'+sourceColumns[i].column +'" data-fieldType = "'+ sourceColumns[i].columnType +'">'+sourceColumns[i].comments+'</option>';
            }
            for (var i = 0; i < targetColumns.length; i++) {
                selT += '<option data-field="'+targetColumns[i].column +'" data-fieldType = "'+ targetColumns[i].columnType +'">'+targetColumns[i].comments+'</option>';
            }

            mappingTable.find('tr.tr_mapping_clone').contextMenu('fieldTrMenu', contextmenu);
            // mappingTable.on('input propertychange','select.field-sel,input.field-value', checkSelCon);

            $(selR).appendTo(selResEl);
            $(selT).appendTo(selTarEl);

            /*回填筛选条件*/
            if (mappingCondition) for (var j = 0 ; j <mappingCondition.length;j++) {
                console.log(mappingCondition[j])
                var tElFirst =  mappingTable.find('tr.tr_mapping_clone:eq(0)');
                var tEl = mappingTable.find('tr.tr_mapping_clone:eq('+(j+1)+')');
                if (!tEl[0]) { tEl = cloneNodeFilterTr(tElFirst)}
                var tdArray = tEl.find('td');
                $.each(tdArray,function () {
                    var p = $(this).data('type'),v1 = $(this).find('select'),v2 = $(this).find('input'),v = mappingCondition[j][p];
                    if (v1[0]) {
                        v1.val(v);
                    } else if (v2[0]) {
                        v2.val(v)
                    }
                })
            };
            if (mappingSql) mappingSqlTable.find('pre').html (mappingSql);
        }

        sourceInfo = checkTableFieldInfo(sourceInfo);
        targetInfo = checkTableFieldInfo(targetInfo);
        mappingInit(sourceInfo.field_data,targetInfo.field_data)
    }

    var attributeModal = $("#attributeModal");
    var modalBody = attributeModal.find(".modal-body");
    var modalLoading = attributeModal.find(".modal-loading");
    modalLoading.html('').hide();
    modalBody.show();
}

//-----条件设置--end----------------

$(function(){
//TAB
    $('#attributeTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    $('#filterTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    $('#mappingTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    //条件设置
    fnSetCondition();

});