/**
 * Created by wb-gaoyu.b on 2016/8/9.
 */
var index={
    get_param:function(){
        var str='', a, b,c;
        var a=window.location.href.split('?');
             //    a 为数组iP和路径
        if(a[1] && a[1] !=''){
            b=a[1].replace(/#/g,'').split('&');
            for(var i=0;i< b.length;i++){
                c=b[i].split('=');
                str+=",\""+decodeURI(c[0])+"\":\""+decodeURI(c[1])+'\"';

            }
        }
            return str=="" ? {"act":''}:eval("({"+str.substr(1)+"})");

    }
};
index.get_param();
