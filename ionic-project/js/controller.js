/**
 * Created by aoyolo on 17/1/13.
 */

angular.module('myapp.controllers',[])
    .controller('HomeController',function($scope){
        $scope.items=['java','c++','cocos2d','swift'];
    })

    //$stateParams 获取参数
    .controller('HotsController',function($scope,G,HotsFactory){
        $scope.imgurl = G.imgUrl;

        HotsFactory.getHots(20);

        $scope.$on('hotsUpdate',function(){
            $scope.hotsData = HotsFactory.getHotsData();
            console.log($scope.hotsData);

            //停止刷新状态
            $scope.$broadcast('scroll.refreshComplete');
        });

       // 切换副标题的选中项
        $scope.selectItem= function(pageIndex,catid){
            var btns= $('.hots-buttonbar a');
            console.log(bnts);
            $.each(btns,function(index,ele){
                ele.className = 'button button-clear';
            });
            btns[pageIndex].className = 'button button-clear button-select';

            //请求对应页面的数据
            HotsFactory.getHots(catid);

        }
        //下拉刷新 从新发送请求 请求文件
        //使用刷新 还有让它停止刷新 不然刷新状态会一直持续下去

        $scope.onHotsRefresh = function(){
            //获取到 catid
            HotsFactory.getHots(29);

        }

    })

.controller('HotsDetailController',function($scope,$rootScope,G,HotsDetailFactory,$stateParam){

    var aid= $stateParams.adi;
   // console.log(aid);
    $scope.showLoading = true;//显示加载指示器 优化
    $rootScope.hideTab = 'tabs-item-hide';

    HotsDetailFactory.getHotsDetail(aid);

    $scope.$on('hotsDetailUpdate',function(){
        $scope.showLoading = false;//隐藏加载指示器

        $scope.hotsDetailData= HotsDetailFactory.getHotsDetailData();
    })

    //监听销毁事件 当退出标题里的某个内容的时候，那个内容就会被销毁，这样就可以在退出内容的时候 ，tab显示
    $scope.$on('$destroy',function(){
        $rootScope.hideTab='';
    })
})
    .controller('MineController',function($scope,Storage,$rootScope,G){
        console.log(mine controller);
        //注入 $storage 要获取用户信息
        var userInfo = $storage.get('user');//get() 出来的是一个对象
    })
.controller('LoginController',function($scope,$state,Storage,$ionicLoading,$rootScope,G){

    $scope.user={
        username:'',
        password:''
    }

    // 登录时会用到 $socope $on 会出现一个提示框 显示是否登录成功
    $scope.onlogin= function(){
        console.log($scope.user);
        LoginFactory.login($scope.user.username,$scope.user.password);
        $scope.$on('loginUpdate',function(){
            var user = LoginFactory.getCurrentUser();
            if(user.success){
                //登录成功之后将用户信息存储在本地
                Storage.set('user',$scope.user);

                //登录成功就弹回去 注入 $state go()参数是一个状态，方法，会遍历，这是跳转的其中一种方式
                //还有 ui-sref 可以跳转
                $state.go('tabs.mine',{},{reload:true});
                // 跳转到tabs.mine所表示的页面 reload:true 是跳转之后刷新该页面
            }else{
                //$ionicLoading是一个加载指示器 duration是时间 是以模态的形式提示
                //苹果电脑翻墙用 star VPN  跨域插件：Allow-Control-Allow 跨域要本身客户端和服务器同时支持
                $ionicLoading.show({
                    template:user.message,
                    duration:1500
                })

            }
        })
    }

})
