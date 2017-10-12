<template>
	<li class="large topic clear">
		<div class="global-padding">
			<a :href="`/mb/article/article/${item.blogid}.html`">
			<div class="stream-box">
				<span v-if="item.type==6" class="event-tag huati">话题</span>
				<div class="stream-img">
					<load-img
							:big-img="`http://s1.jiguo.com/${item.cover}/640?imageView2/1/w/640/h/320/q/100`"
							:src="`http://s1.jiguo.com/${item.cover}/640?imageView2/1/w/60/h/30/q/30`"
					/>
					<div class="mask-cover"></div>
				</div>
				<div class="stream-topic flex">
					<div class="stream-topic-center">
						<div class="stream-topic-title">{{ item.title }}</div>
						<div class="stream-topic-info">
							<span><i class="icon icon-topic-join"></i>{{ item.reply }}</span>
							<span class="line"></span>
							<span><i class="icon icon-topic-star"></i>{{ item.stow }}</span>
						</div>
						<div v-if="item.endtime" class="stream-status">{{ item.endtime }}</div>
					</div>
				</div>
			</div>
		</a>
		</div>
	</li>
</template>

<script>
  import loadImg from '../loadimg.vue';
  import { rippleButton } from '../button/index';
	export default{
      props:{
        item:{
          type:Object
        }
      },
      components:{
        loadImg,
        rippleButton
      },
      data:function () {
        return {}
      },
	}
</script>
