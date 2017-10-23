!function () {
    function crNew(el, opt) {
        this.el = $(el), this.canvas = $(el)[0], this.opt = $.extend(!0, defalutOpt, opt || {}), this.instance = {}, this.nodes = [], this.optConnect = [],this.node_active, this.node_active_id,this.conn_active, this.connect_drag;
        var self = this, ins = this.instance, c = this.optConnect, o = this.opt, d = o.processData;
        this.contextmenu = {
            bindings: o.canvasMenus,
            menuStyle: o.menuStyle,
            itemStyle: o.itemStyle,
            itemHoverStyle: o.itemHoverStyle
        }
        this.drawerFn = {
            canvas: self.findCancas()
            , max: function (array, f) {
                var i = -1,n = array.length,a,b;
                if (f == null) {
                    while (++i < n) if ((b = array[i]) != null && b >= b) { a = b;break; }
                    while (++i < n) if ((b = array[i]) != null && b > a) a = b;
                } else {
                    while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) { a = b; break; }
                    while (++i < n) if ((b = f(array[i], i, array)) != null && b > a) a = b;
                }
                return a;
            }
            , crNewNode: function (row, _index) {
                var nodeDiv = document.createElement('div')
                    , nodeId = "window" + row.id, badge = 'badge-inverse', icon = row.icon ? row.icon : 'list'
                    ,_h = '<span class="filter-icon glyphicon glyphicon-'+ icon +'" aria-hidden="true"></span>' +
                    '&nbsp;' + row.process_name;
                // var maxFlowId = this.max(this.nodes,function(n){return $(n).attr('flow_id')})
                // row.flow_id = row.flow_id?row.flow_id:(maxFlowId?(parseInt(maxFlowId)+1):0)
                $(nodeDiv).attr("id", nodeId)
                    .attr("style", row.style)
                    .attr("process_id", row.id)
                    // .attr("flow_id",row.flow_id)
                    .addClass("process-step btn btn-default node-"+ (row.type?row.type:'table'))
                    .data("info", row)
                    .html(_h);

                return $(nodeDiv);
            }
            , initNode: function (el) {
                var ins = self.instance, o = self.opt, contextmenu = self.contextmenu, el = $(el);
                if (!ins) {ins = $.extend(self.instance, jsPlumb.getInstance(o))}
                ins.draggable(el);

                // 样式
                var connectorPaintStyle = {
                        strokeWidth: 2,
                        stroke: "#41adcf",
                        joinstyle: "round"
                    },
                    connectorHoverStyle = {
                        strokeWidth: 2,
                        stroke: "#2dc179",
                    },
                    sourceEndpoint = {
                        endpoint: "Dot",
                        paintStyle: {
                            stroke: "#61B7CF",
                            fill: "transparent",
                            radius: 5,
                            strokeWidth: 1
                        },
                        connectorStyle: connectorPaintStyle,
                        connectorHoverStyle: connectorHoverStyle,
                        isSource: true
                        ,isVisible:true
                    },
                    targetEndpoint = {
                        endpoint: "Dot",
                        paintStyle: {fill: "#41adcf", radius: 5},
                        maxConnections: -1,
                        dropOptions: {hoverClass: "hover", activeClass: "active"},
                        isTarget: true
                    };
                ins.makeSource(el, sourceEndpoint, {
                    filter: ".filter-icon",
                    anchor: "Continuous",
                    connectionType: "basic",
                    extract: {
                        "action": "the-action"
                    }
                });
                ins.makeTarget(el, targetEndpoint, {
                    dropOptions: {hoverClass: "dragHover"},
                    anchor: "Continuous",
                    allowLoopback: true,
                    beforeDrop: function (params) {
                        if (params.sourceId == params.targetId) return false;
                        /*不能链接自己*/
                        var cs = this.instance.getConnections({source: params.sourceId});
                        var newCs = $.map(cs, function (k, v) { return k.targetId })
                        if ($.inArray(params.targetId, newCs) >= 0) { opt.fnRepeat()/*不能重复连接*/; return false; }
                        else { return true; }
                    }
                });

                // 节点右键绑定
                el.mousedown(function (e) {
                    if (e.which == 3) { //右键绑定
                        self.node_active = $(this);
                        self.node_active_id = $(this).attr('process_id');
                        contextmenu.bindings = o.processMenus;
                        $(this).contextMenu('processMenu', contextmenu);
                    }
                })

                //连接关联的步骤
                var elDataInfo = el.data('info');
                var sourceId = elDataInfo.sourceId;
                var sourceConnArray = elDataInfo.conn;
                var processData = self.opt.processData;
                if (sourceConnArray) {
                    $.each(sourceConnArray, function (j, connObj) {
                        var targetId = connObj.targetId;
                        if (targetId != '' && targetId != 0) {
                            //检查 source 和 target是否存在
                            var is_source = false, is_target = false;
                            $.each(processData.list, function (i, row) {
                                if (row.sourceId == sourceId) {
                                    is_source = true;
                                } else if (row.sourceId == targetId) {
                                    is_target = true;
                                }
                                if (is_source && is_target)
                                    return true;
                            });
                            if (is_source && is_target) {
                                self.optConnect.push({
                                    source: sourceId,
                                    target: targetId,
                                    mapping:connObj,
                                    type: "basic"
                                })
                                return;
                            }
                        }
                    })
                }
            }
            , initConnect: function () {
                ins.batch(function () {
                    $.each(c, function () {
                        ins.connect(this).mapping = this.mapping;
                    })
                });
            }
            , initNodeAll: function () {
                var _self = this;
                $.each(self.nodes, function () {
                    _self.initNode(this, true);
                }),
                    this.initConnect();

                ins.bind("beforeDetach", function (conn) {
                    if (conn.delAll) {return true}
                    else {
                        if (confirm("你确定修改此关系吗？") == true) {
                            if (conn[conn.suspendedElementType + 'Id'] != conn.suspendedElementId) {
                                console.log('关系节点信息变化 清空之前的表关联关系')
                            } return true
                        } else {
                            return false
                        }
                    }
                });
                return ins
            }
        }
        this.init()
    }

    // 模型器默认属性
    var defalutOpt = {
        Endpoint: ["Dot", {radius: 5}],
        // Connector: "StateMachine",
        Connector: ["Flowchart", {stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true}],
        ConnectionOverlays: [
            ["Arrow", {
                location: 1,
                id: "arrow",
                width: 10,
                length: 10,
                foldback: 0.8
            }]
        ],
        canvasMenus: {
            "one": function (t) {
                alert('画面右键')
            }
        },
        processMenus: {
            "one": function (t) {
                alert('步骤右键')
            }
        },
        /*右键菜单样式*/
        menuStyle: {
            border: '1px solid #5a6377',
            minWidth: '150px',
            padding: '5px 0'
        },
        itemStyle: {
            fontFamily: 'verdana',
            color: '#333',
            border: '0',
            /*borderLeft:'5px solid #fff',*/
            padding: '5px 40px 5px 20px'
        },
        itemHoverStyle: {
            border: '0',
            /*borderLeft:'5px solid #49afcd',*/
            color: '#fff',
            backgroundColor: '#5a6377'
        },
        Container: "canvas"
    };

    return $.extend(crNew.prototype, {
        init: function () {
            var t = this, el = this.el, o = this.opt, canvas = this.canvas, optConnect = this.optConnect,
                f = this.drawerFn, contextmenu = this.contextmenu
                , ins = $.extend(this.instance, jsPlumb.getInstance(o))
                , nodes = [];
            /*画布右键绑定*/
            el.contextMenu('canvasMenu', contextmenu);

            ins.registerConnectionType("basic", {
                anchor: "Continuous",
                connector: "StateMachine"
            });

            /*关系连线点击事件*/
            ins.bind("click", function (conn, originalEvent) {
                console.log(conn + '关系点击')
                var sourceInfo = $(conn.source).data('info'), targetInfo = $(conn.target).data('info');
                $.extend(t,{conn_active:conn});
                var url = 'column_mapping_new.html?sId=' + sourceInfo.id+'&tId='+targetInfo.id;
                ajaxModal(url, function () {
                    alert('加载完成执行')
                });
            });

            //初始化原步骤
            var processData = o.processData;
            if (processData.list) {
                $.each(processData.list, function (i, row) {
                    nodes.push(f.crNewNode(row, i).appendTo(canvas)[0]);
                });
            }
            this.nodes = nodes.concat(this.nodes), this.drawerFn.initNodeAll();
        }
        , crNewNode: function (row, _index) {
            return this.drawerFn.crNewNode(row, _index);
        }
        , addProcess: function (row) {
            var canvas = this.canvas, f = this.drawerFn, nodes = this.nodes;
            var newNode = f.crNewNode(row).appendTo(canvas)[0];
            nodes.push(newNode),f.initNode(newNode)
            return true;
        }
        , delProcess: function (rowId) {
            var _id = rowId ? rowId : this.node_active_id;
            _id && this.instance.remove($('#window' + _id));
            this.nodes = this.el.find('.process-step');
        }
        , findCancas :function () {
            return this.canvas
        }
        , findOption :function () {
            return this.opt
        }
        , findNodes : function () {
            return this.nodes
        }
        , findInstance: function () {
            if (this.instance) { return this.instance; }
            else { mAlert('画布为空！'); return false }
        }
        , getCondition : function () {
            return this.instance.getConnections()
        }
        , refreshInstance: function () {
            this.instance.repaintEverything(true);
            return this
        }
        , save: function () {
            var nodes = this.nodes, info = {'total': nodes.length, list: []};
            nodes.forEach(function (t) {
                var el = $(t), i = el.data('info') ? el.data('info') : {}, connections = newJsPlumb.instance.getConnections({source: t});
                i.conn = [];
                connections.forEach(function (c) {
                    i.conn.push(c.mapping?c.mapping:0);
                });
                delete i.field_data;
                i.style = el.attr('style');
                info.list.push(i)
            })
            this.opt.processData = info;
            return info;
        }
        , refresh: function () {
            if (this.instance) this.clearNewJsP();
            return new crNew(this.el, this.opt);
        }
        , clearConnections: function () {
            $.each(this.instance.getConnections(),function(){this.delAll  = true});
            this.instance.deleteEveryConnection();
        }
        , clearNewJsP: function () {
            for (var i = 0, len = this.nodes.length; i < len; i++) { $(this.nodes[i]).remove() };
            this.instance.clear(),this.nodes=[],this.instance = {};
            this.instance = $.extend(this.instance, jsPlumb.getInstance(this.opt));
        }
    }),
        $.createJsPlumb = function (el, opt) {
            return new crNew(el, opt);
        },
        $.fn.createJsPlumb = function (opt) {
            return this.each(function () {
                $(this).data("jsPlumb") || $(this).data("jsPlumb", $.createJsPlumb(this, opt))
            })
        }
}(jQuery)
