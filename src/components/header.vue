<template>
	<header class="header header-wrap">
		<div class="header header-inner">
			<div class="menu">
				<a @click="openMenu" class="icon icon-menu" href="javascript:;"></a>
				<left-menu ref="menu" :show="show" @closeMenu="closeMenu" />
			</div>
			<div class="logo">
				<a @click="clearCacheData" href="/">
					<img src="../style/images/logo.png" />
				</a>
			</div>
			<div class="header-right">
				<a @click="searchRecodCurrUrl" class="search icon icon-search" href="/mb/search/list.html"></a>
				<a v-if="window.URL && window.URL['login']" class="user has-login" href="/mb/user/index.html">
					<div class="header-right-badge-wrap">
						<div class="user-innner">
							<img :src="window.URL['user-face']">
						</div>
						<em v-if="hasMessage" class="badge" :class="{'number':ioMessageNumber}">{{ ioMessageNumber?ioMessageNumber:'' }}</em>
					</div>
				</a>
				<a class="user fl pos-rel" href="/mb/user/index.html" v-else>
					<i class="icon icon-user"></i>
				</a>
			</div>
		</div>
	</header>
</template>

<script>
	import leftMenu from './leftMenu.vue';
    import sessionStorage from './../tool/sessionStorage';
    import Cookie from 'js-cookie';
    import io from 'socket.io-client';
    import $ from 'jquery';

	export default{
	  data:function () {
		return {
          show:false,
          window:window,
          hasMessage:false,
          ioMessageNumber:0
		}
      },
      components:{
		'left-menu':leftMenu
	  },
      mounted:function () {
        if( !('messageIo' in window) && window.URL && window.URL['uid'] && window.URL['ioid'] ) {
          window.messageIo = true;
          setTimeout(()=>{
            this.pushNotification( window.URL['ioid'] );
		  });
        }
      },
      methods:{
        openMenu:function () {
          var _this = this;
          _this.$refs['menu'].$el.style.display = 'block';
          setTimeout(function () {
            _this.show = true;
          },0);
        },
        closeMenu:function () {
          var _this = this;
          _this.show = false;
          setTimeout(function () {
            _this.$refs['menu'].$el.style.display = 'none';
          },320);
        },
        clearCacheData(){
          sessionStorage.clear();
		},
		searchRecodCurrUrl(){
          Cookie.set('isSearchCurrUrl',window.location.href,{path:'/'});
		},
        pushNotification(userssid) {
          var socket;
          // 连接服务端
		  if( process.env.NODE_ENV == 'production' ){
            socket = io('http://io.jiguo.com:2126');
		  }else{
            socket = io('http://msg.jiguo.com:2126');
		  }
          // 连接后登录
          socket.on('connect', function () {
            socket.emit('login', userssid);
          });
          // 后端推送来消息时
          socket.on('h5-news',  msg => {
            eval('msg = ' + msg);

            if ( msg != null ) {
              if (msg.type == 'news') {
                //消息
                if ( typeof(msg.num) != 'undefined' && parseInt(msg.num) > 0) {
                  // 显示数字
                  this.hasMessage = true;
                  this.ioMessageNumber = msg.num;
                } else if (parseInt(msg.num) == 0 && typeof (msg.tips) != 'undefined' && parseInt(msg.tips) > 0) {
                  // 显示点
                  this.hasMessage = true;
                  this.ioMessageNumber = 0;
                }else{
                  this.hasMessage = false;
                  this.ioMessageNumber = 0;
				}
              } else if (msg.type == 'broadcast') {

                this.hasMessage = !!msg.tips;
                this.ioMessageNumber = msg.tips||0;

              }
            }
          });
        }
	  }
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	@import "../style/less/_mixs.less";
	@height : 104;
	.header{
		background: #fff;
		position: relative;
		height: unit(@height,px);
		z-index: 5;
	}
	.header-inner{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: stretch;
		position: fixed;
		border-bottom: 1px solid #ececec;
		box-sizing: border-box;
		width: 100%;
		top: 0;
		left: 0;
	}
	.logo{
		flex: 1;
		text-align: center;
		a{
			display: block;
			line-height:unit(@height,px);
		}
		img{
			display: inline-block;
			vertical-align: middle;
			height: 70px;
		}
	}
	.menu{
		height:unit(@height,px);
		width:190px;
		display: flex;
		justify-content: flex-start;
		align-items: stretch;
		.icon-menu{
			width:unit(@height,px);
		}
	}
	.header-right{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: stretch;
		>a{
			display: flex;
			justify-content: center;
			align-items: center;
			width:unit(@height,px);
		}
		.user-innner{
			border-radius: 50%;
			overflow: hidden;
			width:unit(64,px);
			height:unit(64,px);
		}
		img{
			width: 100%;
		}
	}
	.header-right-badge-wrap{
		position: relative;
		margin-right: 15px;
	}
</style>