
var index={
    /**
     * Created by wb-gaoyu.b on 2016/8/9.
     * url 请求地址
     * param ：请求参数
     * target ：分页父元素，如果没有就为.createPage
     * isOne 当分页不需要传惨的时候。
     * .dis-none{display:none}
     */
    creatPage2:function(url,param,callback,target,isOne){
        var tmp='<ul class="pagination" page="1" totalPage="">' +
            '<li><a href="javascript:;" class="first_page dis-none">首页</a></li>' +
            '<li><a href="javascript:;" class="prev_page dis-none">上一页</a></li>' +
            '<li><a href="javascript:;" class="next_page">下一页</a></li>' +
            '<li><a href="javascript:;" class="last_page">末页</a></li>' +
            '<li><a href="javascript:;" class="locPage">当前页：1</a></li>' +
            '</ul>';
        var con_tmp,total_page,bparam,totalpage,tpage;
        if(target!="" && typeof(target)=='string'){
            con_tmp=$(target);
        //    放分页的父元素

        }else{
            con_tmp=$('.creatPage');
        }
        con_tmp.html(tmp);

        var target = con_tmp.find("ul.pagination");
        var page = parseInt(target.attr("page"));
        var getData= function (cpage) {
            total_page=parseInt(target.attr('totalPage'));
            if(param==""||typeof (param)=="string"){
                param={};
                param['currentPage']=cpage;
            }else{
                for(var key in param){
                    if(isOne==true){
                        param['currentPage']=cpage;
                    }else{
                        bparam=JSON.parse(page[key]);
                        bparam['currentPage']=cpage;
                        param[key]=JSON.stringify(bparam);
                    }
                }
            }
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: param,
                success: function (data) {
                    if (data && data.webResult) {
                        target.attr("page", cpage);
                        target.attr("totalPage", data.totalPages);
                        totalpage = parseInt(data.totalPages);
                        if (isNaN(totalpage) || totalpage == undefined || totalpage == null || totalpage == 0) {
                            target.find('li>a').addClass('dis-none');
                        } else {
                            target.find('.locPage').html("当前页:" + cpage + "/共" + totalpage + "页");
                            setBtn(totalpage);
                        }
                        callback(data);
                    } else {
                        target.find('li>a').addClass('dis-none');
                        callback(data);
                    }
                },
                error: function (data) {
                    target.find('li>a').addClass('dis-none');
                    callback(data);
                }

            });
            return total_page;


        };
        getData(1);
        var setBtn = function (total) {

            if (total == 0) {
                target.find('li>a').addClass('dis-none');
            } else {
                if (page == total) {
                    target.find('li .next_page').addClass('dis-none');
                    target.find('li .last_page').addClass('dis-none');
                } else {
                    target.find('li .next_page').removeClass('dis-none');
                    target.find('>li .last_page').removeClass('dis-none');

                }
                if (page == 1) {
                    target.find('li .prev_page').addClass('dis-none');
                    target.find('li .first_page').addClass('dis-none');
                } else {
                    target.find('li .prev_page').removeClass('dis-none');
                    target.find('li .first_page').removeClass('dis-none');
                }
            }
        };
        target.find('.next_page').click(function (event) {
            tpage = parseInt(target.attr("totalPage"));
            if (page != tpage) {
                page++;
                getData(page);
                //setBtn();
            }
        });
        target.find('.prev_page').click(function (event) {
            if (page > 1) {
                page--;
                getData(page);
                //setBtn();
            }
        });
        target.find('.first_page').click(function (event) {
            page = 1;
            getData(1);
        });
        target.find('.last_page').click(function (event) {
            tpage = parseInt(target.attr("totalPage"));
            page = tpage;
            getData(page);

        });



    }
};
index.creatPage();