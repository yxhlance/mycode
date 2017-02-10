/**
 * Created by aoyolo on 17/1/13.
 */

angular.module('myapp.services',['ngResource'])
.factory('HotsFactory',function(G,$resource,$rootScope){

   var resource= $resource(G.api,{},{
        query:{
            method:'get',
            timeout:2000
        }
    })

    var hotsData = {};

    //上拉 就是每拉一次 就是刷新一次，内容会产出覆盖情况
    //下拉情况 就是在page:1 的基础上加 1 每下拉一次就加 1；就是增加了一页的内容，但是之前的内容不能被覆盖，下拉内容是会一直累加的

    return {
        //异步请求
        getHots:function(catid){
            resource.query({
                a:'getPortalList',
            catid:catid,
            page:1
            },function(r){
               // console.log(r);
                hotsData.data = r.result;

                //请求完成后通知 controller来取数据
                $rootScope.$broadcast('hotsUpdate');
            })
        },
        getHotsData:function(){
            return hotsData.data;
        }
    }
})
    //在一个服务里也可以写多个函数
//创建多个服务的好处： 当不要某个页面时，直接删除服务就可以了
.factory('HotsDetailFactory',function(G,$resource,$rootScope){

    var resource= $resource(G.api,{},{
        query:{
            method:'get',
            timeout:2000
        }
    })
    var hotsDetailData={};
    return {
        getHotsDetail:function(aid){
            resource.query({
                a:'getPortalArticle',
                aid:aid
            },function(r){
                //console.log(r);
                //获取到数组result的第一项的content内容
                hotsDetailData.data = r.result[0].content;
                $rootScope.$broadcast('hotsDetailUpdate');


            })
        },
        getHotsDetailData:function(){
            return hotsDetailData.data;
        }
    }
})

.factory('LoginFactory',function(G,$resource,Storage,$rootScope){
    // post请求 登录  登录接口
    var resource= $resource(G.api+'?a=login2');

    return {
        login:function(username,password){
            // 没网络的时 登录不了， 先保存登录数据
            Storage.set('username',username);
            Storage.set('password',password);


            // save 就是post 请求
            return resource.save({
                username:username,
                password:password

            },function(r){
                //通过 r 返回结果
                console.log(r);
                //结果中 result 存有登录的所有信息
                user = r.result;
                $rootScope.$broadcast('loginUpdate');
            })
        },
        getCurrentUser:function(){
            return user;
        }
    }
})
// Storage 是本地服务存储 登录成功后数据会保存在本地服务中，下次登录时就直接读取
.factory('Storage',function(){
    return {
        set:function(key,data){
            // 保存时数据存到 key中，key是唯一的，当再次输入的账号密码不同第一次的数据时，会把第一次的数据给覆盖了
            return window.localStorage.setItem(key,window.JSON.stringify)
        },
        get:function(key){
            return window.JSON.parse(window.localStorage.getItem(key))
        },
        //当退出账号或注销时调用 remove 将信息删除
        remove:function(key){
            return window.localStorage.removeItem(key);
        }
    }

})
