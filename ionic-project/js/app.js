/**
 * Created by aoyolo on 17/1/13.
 */

// 写路由
// 第一个homepage 是状态 第二个是URL
// templateUrl 还可以用 views 代替                   templateUrl:'templates/homepage.html'

// 父子关系嵌套 .state('homepage',{
            //   parent:'tab',
           //     url:'/homepage',
           //     templateUrl:'templates/homepage.html'
           //     })



angular.module('myapp',['ionic','myapp.controllers','myapp.services','myapp.config'])
    .config(function($stateProvider,$urlRouterProvider){

        $stateProvider
            .state('tabs',{
                url:'/tabs',
                templateUrl:'template/tabs.html'
            })
            .state('tabs.homepage',{
                url:'/homepage',
                views:{
                    'tab-homepage':{
                        templateUrl:'template/homepage.html',
                        controller:'HomeController'
                    }
                }
            })

            // .state('tabs.homeDetail',{
            //     url:'/homeDetail/:param',
            //     views:{
            //         'tab-homepage':{
            //             templateUrl:'template/homeDetail.html',
            //             controller:'HomeDetailController'
            //         }
            //     }
            // })

            .state('tabs.hots',{
                url:'/hots',
                views:{
                    'tab-hots':{
                        templateUrl:'template/hots.html',
                        controller:'HotsController'
                    }
                }
            })

            .state('tabs.hotsDetail',{
                url:'/hotsDetail/:aid',
                views:{
                    'tab-hots':{
                        templateUrl:'template/hotsDetail.html',
                        controller:'HotsDetailController'
                    }
                }
            })

            .state('tabs.ariticle',{
                url:'/ariticle',
                views:{
                    'tab-ariticle':{
                        templateUrl:'template/ariticle.html'
                    }
                }
            })

            .state('tabs.mine',{
                url:'/mine',
                views:{
                    'tab-mine':{
                        templateUrl:'template/mine.html',
                        controller:'MineController'
                    }
                }
            })

            .state('tabs.login',{
                url:'/login',
                views:{
                    'tab-mine':{
                        templateUrl:'template/login.html',
                        controller:'onLoginController'
                    }
                }
            })

        $urlRouterProvider.otherwise('/tabs/homepage');
    })
