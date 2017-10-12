<template>
	<div ref="announcement-main" class="main announcement-main none">
		<div class="announcement-wrap">
			<ul ref="announcement" id="ajax-loading-announcement-box">
				<li v-for="v in data" v-bind:key="v.eventid">
					<a :href="`/mb/event/index/${v.eventid}.html`" class="announcement-item">
						<span class="announcement-event-name">{{ v.play_name }}</span>
						<span class="username">{{ v.username | filterUsername }}</span>
						{{ v.content }}
					</a>
				</li>
				<li v-for="v in data" v-bind:key="v.eventid">
					<a :href="`/mb/event/index/${v.eventid}.html`" class="announcement-item">
						<span class="announcement-event-name">{{ v.play_name }}</span>
						<span class="username">{{ v.username }}</span>
						{{ v.content }}
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
    import jQuery from 'jquery';
	export default{
	  data:function () {
		return {
          data:[]
		}
      },
      components:{},
	  created:function () {
	    this.getAnnounceData();
      },
      methods:{
        getAnnounceData(){
	      jQuery.get('/api/event/getBulletins',replayData => {

            var htmlBox = jQuery(this.$refs['announcement']);
            var wrapMain = jQuery(this.$refs['announcement-main']);

            if(replayData.resultCode==0){
              wrapMain.show();
              this.data = replayData.result;

              setTimeout(()=>{
                var cellLi = htmlBox.find('li');
                var cellLen = cellLi.length / 2;
                var cellHei = cellLi.first().height();
                var scorllNum = 0;

                var setTimeFn = function () {
                  cellLi.removeClass('on').eq(scorllNum).addClass('on');
                  htmlBox.animate({
                    marginTop:- scorllNum * cellHei
                  },function () {
                    if( scorllNum >= cellLen ){
                      scorllNum = 0;
                      htmlBox.css('margin-top',0);
                    }
                    scorllNum ++ ;
                  });
                  setTimeout(function () {
                    setTimeFn();
                  },4000);
                };
                setTimeFn();
			  });
            }
          },'json');
		},
	  },
	  filters:{
        filterUsername(username){
          username = username ||'';
          if( username.length>7 ){
            return username.substr(0,6)+'…';
		  }
          return username;
		}
	  }
	}
</script>

<style lang="less" rel="stylesheet/less">
	@import "../style/less/_mixs.less";

	//首页公告
	.announcement-main{
		.announcement-wrap{
			position: relative;
			padding: 0 24px;
			color: #666666;
			font-size: 26px;
			height: 92px;
			overflow: hidden;
			background: #f7f7f7;
			padding-left: 100px;
			z-index: 2;
			&:after{
				position: absolute;
				left: 24px;
				top:50%;
				margin-top: -28px;
				content: '';
				display: block;
				width: 52px;
				height: 52px;
				background-image: url(../style/images/announcement.png);
				background-size: 24px auto;
				background-clip: content-box;
				background-repeat: no-repeat;
				background-position: left center;
			}
			&:before{
				position: absolute;
				content: '';
				display: block;
				left: 74px;
				top: 50%;
				margin-top: -24px;
				width: 2px;
				height: 48px;
				background-color: #D1D1D1;
			}
		}
		li{
			height: 92px;
			display: -ms-flexbox;
			display: -webkit-flex;
			display: flex;
			-webkit-align-items: center;
			align-items: center;
			a{
				word-wrap: break-word;
				word-break: break-all;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				overflow: hidden;
				line-height: 36px;
				max-height: 72px;
				position: relative;
				top:2px;
			}
		}
		.announcement-item{
			color: #999999;
		}
		.announcement-event-name{
			color: #666666;
			margin-right: 16px;
		}
	}
</style>