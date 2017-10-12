<template>
	<aside class="side-menu" v-bind:class="{show}" id="side-menu">
		<div class="mask" @click="closeMenu"></div>
		<menu ref="menu" class="menu-inner">
			<div class="menu-app-download clear">
				<a href="/mb/app/index.html" class="block">
					<div class="app-download-logo fl">
						<img src="http://cdn.jiguo.com/static/Mb/develope/style/images/app-menue-icon.png">
					</div>
					<div class="app-download-desc">
						<div class="ft14">下载</div>
						<div class="ft16 red">极果APP</div>
					</div>
					<div class="icon icon-app-down-arrow"></div>
				</a>
			</div>
			<div class="swipe">
				<ul>
					<li class="on"><a href="/mb/index/index.html"><i class="icon icon-home"></i>首页</a></li>
					<li class=""><a href="/mb/event/index.html"><i class="icon icon-menu-event"></i>试用</a></li>
					<li class=""><a href="/mb/product/index.html"><i class="icon icon-xinping"></i>新品</a></li>
					<li class=""><a href="/mb/rebate/index.html"><i class="icon icon-discount"></i>折扣</a></li>
					<li class=""><a href="/mb/list/index.html"><i class="icon icon-list"></i>清单</a></li>
					<li class=""><a href="/mb/article/index.html"><i class="icon icon-experience"></i>体验</a></li>
					<li class=""><a href="/mb/vip/index.html"><i class="icon icon-uee"></i>体验师</a></li>
					<li class=""><a href="/mb/mall/index.html"><i class="icon icon-mall"></i>商城</a></li>
					<li class=""><a href="/mb/html/list.html"><i class="icon icon-contact"></i>联系</a></li>
				</ul>
			</div>
		</menu>
	</aside>
</template>

<script>
	import $ from 'jquery';

	export default {
      props:{
	    show:{
	      type:Boolean,
          default:false
		}
	  },
	  data(){
        return {
          startX:0,
		  endX:0,
		  move: '100%',
		};
	  },
	  methods: {
        closeMenu () {
		  this.$emit('closeMenu');
        }
	  }
	}
</script>

<style lang="less" rel="stylesheet/less">
	@import "../style/less/_mixs.less";
	.side-menu{
		z-index: -1;
		font-size: 32px;
		display: none;

		&, .mask{
			transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);
			transition-duration: 0.3s;
			transition-property: opacity;
			opacity: 0;
			position: fixed;
			top:0;
			left: 0;
			width: 100%;
			height: 100%;
		}
		.mask{
			position: absolute;
		}

		.menu-inner{
			width: 50%;
			left: -50%;
			height: 100%;
			position: absolute;
			z-index: 100;
			background-color: #fff;

			transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);
			transform: translate3d(0, 0, 0);
			transition-duration: 0.3s;
			transition-property: transform;
		}

		&.show{
			z-index: 99;
			opacity: 1;
			.menu-inner{
				transform: translate3d(100%, 0, 0);
			}
			.mask{
				opacity: 1;
				background-color: rgba(0,0,0,0.7);
			}
		}

		li{
			line-height: 100px;
			border-bottom: 1px solid #f0f0f0;
			padding-left: 42%;
			position: relative;
			.icon{
				position: absolute;
				left: -60px;
				top: 50%;
				margin-top: -26px;
			}
			&.on a{
				color: #fb3f3d;
			}
			&.on{
				.icon-home:before{
					background-position: 7px*2 -55px*2;
				}
				.icon-menu-event:before{
					background-position: -23px*2 -55px*2;
				}
				.icon-xinping:before{
					background-position: -55px*2 -55px*2;
				}
				.icon-discount:before{
					background-position: -85px*2 -55px*2;
				}
				.icon-list:before{
					background-position: -114px*2 -55px*2;
				}
				.icon-experience:before{
					background-position: -143px*2 -55px*2;
				}
				.icon-uee:before{
					background-position: -54px*2 -272px*2;
				}
				.icon-mall:before{
					background-position: -174px*2 -55px*2;
				}
				.icon-contact:before{
					background-position: -205px*2 -55px*2;
				}
				.icon-app-download:before{
					background-position: -202px*2 -205px*2;
				}
			}
		}
		a{
			color: #cfcfcf;
			display: block;
			position: relative;
		}
	}
	.icon-app-down-arrow{
		position: absolute;
		right:10px;
		top:50%;
		margin-top: -26px;
	}
	.menu-app-download{
		padding: 30px;
		position: relative;

		.app-download-logo{
			width:  84px;
		}
		.app-download-desc{
			margin-left: 100px;
		}
		.app-download-logo img{
			width: 100%;
		}
		& + ul{
			border-top: 1px solid #f0f0f0;
		}
	}
</style>
