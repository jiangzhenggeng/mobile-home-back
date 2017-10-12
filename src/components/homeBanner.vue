<template>
	<div class="banner" v-if="event_hot.length">
		<section class="banner-inner" id="banner-inner">
			<div class="bd">
				<ul class="banner-topic-swipe">
					<template v-for="v in event_hot">
						<li v-if="v.type==1">
							<a :href="`/mb/event/index/${v.eventid}.html`">
								<div class="banner-img-box">
									<span v-if="v.isshoufa==1" class="event-tag shoufa">首发</span>
									<span v-else-if="v.isshoufa==2" class="event-tag tiyanshi">体验师专享</span>
									<span v-else-if="v.isshoufa==3" class="event-tag ev-zhekou">折扣</span>
									<span v-else-if="v.isshoufa==5" class="event-tag tiyanshi">App专享</span>
									<img :src="`http://s1.jiguo.com/${v.fileid}/640?imageView2/1/w/640/h/320/q/100`">
								</div>
								<div class="banner-desc">
									<div class="banner-title">{{ v.name }} {{ v.isshoufa==2?'(体验师专享)':'' }}</div>
									<div class="banner-tips pos-rel">
										<span class="ft16 colfff">{{ v.follownum }} <font class="ft12 gray">人申请</font></span>
										<template v-if="v.is_pay_event">
											<span class="ft12 gray">免费试用 + {{ v.meta[0].status==2?v.meta[0].buying_name:v.meta[1].buying_name }}</span>
										</template>
										<template v-else>
											<span class="ft12 gray">{{ v.isshoufa==2?'体验师试用':'免费试用' }}</span>
										</template>

										<template v-if="v.deadline > now">
											<span class="ft12 colfff pos-abs r0 b0">{{ v.deadline_time }} <font class="gray">截止</font></span>
										</template>
										<span class="ft12 colfff pos-abs r0 b0" v-else >
											<font class="gray">已截止</font>
										</span>
									</div>
								</div>
								<img src="../style/images/large-card-cover.png" class="mask-cover" />
							</a>
						</li>
						<li v-else-if="v.type==2">
							<a :href="`/mb/article/article/${v.blogid}.html`">
								<div class="banner-img-box">
									<img :src="`http://s1.jiguo.com/${v.fileid}/640?imageView2/1/w/640/h/320/q/100`">
								</div>
							</a>
						</li>
						<li v-else-if="v.type==3">
							<a :href="`/mb/live/LiveList${v.blogid}.html`">
								<div class="banner-img-box">
									<img :src="`http://s1.jiguo.com/${v.fileid}/640?imageView2/1/w/640/h/320/q/100`">
								</div>
								<div class="banner-desc new_banner">
									<div class="new_main">
										<div class="new_title">{{ v.title }}</div>
										<div class="news">
											<span v-if="v.status==0">未开启</span>
											<span v-else-if="v.status==2">直播进行中</span>
											<span v-else-if="v.status==-1">已结束</span>
											<span class="line"></span>
											<span>{{ v.member?v.member:0 }}人参加</span>
										</div>
									</div>
								</div>
							</a>
						</li>
						<li v-else-if="v.type==4">
							<a :href="v.url">
								<div class="banner-img-box">
									<img :src="`http://s1.jiguo.com/${v.fileid}/640?imageView2/1/w/640/h/320/q/100`">
								</div>
							</a>
						</li>
						<li v-else-if="v.type==5">
							<a :href="`/mb/topic/index/${v.blogid}.html`">
								<div class="banner-img-box">
									<img :src="`http://s1.jiguo.com/${v.fileid}/640?imageView2/1/w/640/h/320/q/100`">
								</div>
								<div class="banner-desc new_banner">
									<div class="new_main">
										<div class="new_title">{{ v.title }}</div>
										<div class="news">
											<span><i class="icon icon-topic-join"></i>{{ v.reply }}</span>
											<span class="line"></span>
											<span><i class="icon icon-topic-star"></i>{{ v.stow }}</span>
										</div>
									</div>
								</div>
							</a>
						</li>
					</template>
				</ul>
			</div>
			<div class="hd"><ul></ul></div>
		</section>
	</div>
</template>

<script>

  	import * as types from '../store/types';
    import TouchSlide from '../tool/TouchSlide';
    import jQuery from 'jquery';
    import loadImg from './loadimg.vue';

	export default{
	  data:function () {
		return {
          event_hot:[],
          now: (new Date()).getTime() / 1000
		}
      },
      components:{
        'load-img':loadImg
      },
	  created:function () {
	    this.getBannerData();
      },
      methods:{
	    getBannerData(){
	      jQuery.get('/api/event/GetMbBannerList',replayData => {
	        this.event_hot = replayData.result;
            this.init();
          },'json');
		},
	    init(){
	      if(this.event_hot.length<=0) return;

          var _o = jQuery.extend(true,{
            slideCell:"#banner-inner",
            titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
            mainCell:".bd ul",
            effect:"leftLoop",
            interTime:"400000",
            autoPlay:true,//自动播放
            autoPage:true //自动分页
          });
          setTimeout(()=>{
            TouchSlide(_o);
            this.$store.commit(types.PAGE_LOADING_QUERY,{
              show:false
            });
		  });
		}

	  }
	}
</script>

<style lang="less" rel="stylesheet/less">
	@import "../style/less/_mixs.less";

	.banner-topic-swipe {
		overflow: hidden;
		li {
			overflow: hidden;
			position: relative;
			height: 375px;
			overflow: hidden;
			a {
				overflow: hidden
			}
			img {
				width: 100%;
			}
		}

		.banner-img-box {
			position: relative;
		}

		.banner-desc {
			position: absolute;
			bottom: 60px;
			width: 100%;
			left: 0;
			z-index: 1;

			.banner-title, .banner-tips {
				margin: 0 48px;
			}
			.banner-title {
				line-height: 60px;
				font-size: 32px;
				color: #fff;
				border-bottom: 1px solid rgba(255, 255, 255, 0.3);
			}
			.banner-tips {
				margin-top: 6px;
			}
		}
	}

	.banner-inner {
		position: relative;
		.hd {
			position: absolute;
			bottom: 16px;
			width: 100%;
			left: 0;
			text-align: center;
			li {
				display: inline-block;
				border-radius: 50%;
				height: 10px;
				width: 10px;
				background-color: #fff;
				text-indent: -99999px;
				overflow: hidden;
				margin: 0 4px;
				&.on {
					background-color: #fe584d;
				}
			}
		}
	}

	.banner-topic-swipe li a .mask-cover {
		border-radius: 0;
	}

	//焦点图 2016-11-15
	.new_banner {
		width: 100% !important;
		height: 100% !important;
		margin-bottom: -70px;
		display: -webkit-flex;
		display: flex;
		-webkit-align-items: center;
		align-items: center;
		-webkit-justify-content: center;
		justify-content: center;
		text-align: center;
		color: #fff;
		top:0 !important;

		.new_title {
			margin-bottom: 8px;
			font-size: 44px;
			text-shadow: 0px 24px 48px rgba(0, 0, 0, 0.3);
		}

		.news {
			height: 44px;
			padding: 0 30px;
			border-radius: 50px;
			line-height: 44px;
			background-color: rgba(255, 255, 255, 0.4);
			font-size: 28px;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			span {
				margin: 0 10px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.line {
				width: 2px;
				height: 20px;
				margin: 0;
				background-color: rgba(255,255,255,.5);
			}
		}

		.status{
			margin-top: 16px;
			font-wight:100;
		}

	}
</style>