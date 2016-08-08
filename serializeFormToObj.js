    // 序列化方法3 START
        // 完美序列化方法根据data-name取值,data-name值的第一段是namespace
        // 支持对象的多层嵌套以及list列表类型
        //比如：{"m.n.o.p.q":"5", "a.c[0]":"1","a.c[1]":"22",  "b.d":"3", "e[0].a":"4", "e[1].b":"7","f[0].g[0].h[0]":"8", "f[0].g[1].h[0]":"9"};
       var index={
        serializeFormToObj: function(form){
            var formElements={};
            var n ='*[data-name]';
            $(form).find(n).each(function(i,v){
                if($(v).attr("type") == 'checkbox' || $(v).attr("type") == 'radio'){
                    if(!$(v).is(':checked')){
                        return;
                    }
                }
                    var  name = $(v).attr('data-name'),
                    val = $(v).val();
                    formElements[name] = val;
            })
            //
            var rootObj = {};

            for(var attr in formElements){
                var attrValue = formElements[attr];
                var attrItems = attr.split('.');
                //通过namespace一次提交多个参数至后端
                //namespace作为参数名字
                var namespaceName = attrItems[0];
                if(rootObj[namespaceName] == null){
                    rootObj[namespaceName] = {};
                }
                var oneNamespaceResult = rootObj[namespaceName];
                var itemLength = attrItems.length;

                for(var i = 1; i < itemLength; i++){
                    var item = attrItems[i];
                    var targetObj = Util.findTargetObj(oneNamespaceResult, attrItems, i);
                    if(Util.isList(item)){
                        var arrayName = Util.getArrayName(item);
                        var index = Util.getArrayIndex(item);
                        if(targetObj[arrayName] == null){
                            targetObj[arrayName] = [];
                        }
                        if(i == (itemLength - 1)){
                            //是数组，是最后一个
                            if(targetObj[arrayName][index] != null){
                                Util.showDialog4('Form中有重复的data-name命名，请检查');
                            }
                            targetObj[arrayName][index] = attrValue;
                        }else{
                            //是数组，不是最后一个
                            if(targetObj[arrayName][index] == null){
                                targetObj[arrayName][index] = {};
                            }
                        }
                    }else{
                        //不是数组，是最后一个
                        if(i == (itemLength - 1)){
                            targetObj[item] = attrValue;
                        }else{
                            //不是数组，不是最后一个
                            if(targetObj[item] == null){
                                targetObj[item] = {};
                            }
                        }
                    }
                }
            }
            //对每一个属性值序列化
            var result = {};
            for(var attr in rootObj){
                result[attr] = JSON.stringify(rootObj[attr]);
            }
            //添加form-token值到数组里面
            //result['_form_token'] = $("input[name='_form_token']").val();
            return result;
        },

        //attrItems为格式是a.b.c.d的字符串按照.split出来的数组，本函数
        //以跟对象rootObj为出发点，找到a.b.c.d中以endIndex为结束的对象（不包含endIndex）
        //比如a.b.c.d，如果endIndex = 2，找到的对象为a.b
        findTargetObj:function(rootObj, attrItems, endIndex){
            var target = rootObj;
            for(var k = 1; k < endIndex; k++){
                var currentItem = attrItems[k];
                if(Util.isList(currentItem)){
                    var arrayName = Util.getArrayName(currentItem);
                    var index = Util.getArrayIndex(currentItem);
                    target = target[arrayName][index];
                }else{
                    target = target[currentItem];
                }
            }

            return target;
        },

        //判断是不是数组
        isList:function (currentItem){
            return currentItem.indexOf('[') >=0 && currentItem.indexOf(']')>=0
        },
        //从a[0]格式的字符串中解析出数组名，这里是a
        getArrayName:function (currentItem){
            return currentItem.split("[")[0];
        },
        //从a[0]格式的字符串中解析出数组index，这里是0
        getArrayIndex:function (currentItem){
            return currentItem.substring(currentItem.indexOf("[")+1,currentItem.indexOf("]"));
        },

        //序列化方法3 END
       }
