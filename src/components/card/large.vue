<template>
	<li class="large clear">
		<div class="global-padding">
			<a :href="`/mb/article/article/${item.blogid}.html`">
			<div class="stream-title ft16 mgb5">{{ item.title }}</div>
			<div class="stream-box">
				<span v-if="item.type==1" class="event-tag qingdan">清单</span>
				<span v-else-if="item.type==2" class="event-tag xinping">新品</span>
				<span v-else-if="item.type==4" class="event-tag tiyan">体验</span>
				<div class="stream-img">
					<load-img
						:big-img="`http://s1.jiguo.com/${item.cover}/640?imageView2/1/w/640/h/320/q/100`"
						:src="`http://s1.jiguo.com/${item.cover}/640?imageView2/1/w/60/h/30/q/30`"
					/>
					<div class="mask-cover"></div>
				</div>

				<div class="stream-bottom">
					<div class="stream-bottom-inner">
						<div v-if="item.video==1" class="video">
							<i class="icon icon-video"></i>
						</div>

						<div class="stream-text">
							<template v-if="item.type==1">
								<span class="ft12" v-if="item.format.list_bottom_left && item.format.list_bottom_left!=''">
									{{ item.addtime }} · {{ item.format.list_bottom_left }}
								</span>
								<span v-else class="ft12">{{ item.addtime }}</span>
							</template>
							<template v-if="item.type==2||item.type==3">
								<span class="ft12">{{ item.addtime }}</span>
							</template>
							<span v-else-if="item.type==4" class="ft12 user-face-warp">
							  <span class="ft12">{{ item.author }} · {{ item.addtime }}</span>
							</span>

							<div class="ft12 praise-replay">
								<span class="pos-rel"><i class="icon icon-praise"></i>{{ item.praise }}</span>
								<span class="pos-rel mgl10"><i class="icon icon-replay"></i>{{ item.reply }}</span>
							</div>
						</div>
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
