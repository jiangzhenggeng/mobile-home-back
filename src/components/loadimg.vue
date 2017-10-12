<template>
	<div class="progressive">
		<img ref="load-img" class="preview" :data-source="bigImg" :src="src" />
	</div>
</template>

<script>
  import jQuery from 'jquery';
  import throttle from '../tool/throttle';

  var scrollTop = jQuery(window).scrollTop();
  export default{
      props:{
        bigImg:String,
        src:String
	  },
	mounted:function () {
        setTimeout(()=>{
          this.loadInit();
		})
    },
	methods:{
        loadInit(){
          var loadImg = jQuery(this.$refs['load-img']);
          var $ = jQuery;
          var scrollTop = scrollTop || $(window).scrollTop();
          var offsetTop = loadImg.offset().top;
          var selfHeight = loadImg.height();
          if( offsetTop - scrollTop <= window.$WIN_HEIGHT && scrollTop <= offsetTop + selfHeight ){
            var Img = new Image();
            jQuery(Img).on('load',function () {
              loadImg.attr('src',this.src).removeClass('preview');
              jQuery(Img).off('load');
              Img = null;
            });
            Img.src = loadImg.attr('data-source');
          }else{
            if(!window._lay_img_) window._lay_img_ = [];
            window._lay_img_.push({
              obj:loadImg,
              offsetTop:0,
              selfHeight:0
            });
          }

          let throttleDeFn = throttle.debounce( ()=>{
            var scrollTop = $(window).scrollTop();
            window._lay_img_.forEach((item,index)=>{

              if( item.selfHeight<=0 || item.offsetTop<=0 ){
                window._lay_img_[index].offsetTop = $(item.obj).offset().top;
                window._lay_img_[index].selfHeight = $(item.obj).height();
              }

              if( item.offsetTop - scrollTop <= window.$WIN_HEIGHT && scrollTop <= item.offsetTop + item.selfHeight ){

                var Img = new Image();
                (function (Img) {
                  jQuery(Img).on('load',function () {
                    item.obj.attr('src',this.src).removeClass('preview');
                    jQuery(Img).off('load');
                    Img = null;
                  });
                })(Img);
                Img.src = item.obj.attr('data-source');
                window._lay_img_.splice(index,1);
              }
            });

          },10, 500 );

          var objEvt = jQuery._data( jQuery(window)[0] , 'events');
          var no_scroll_lay_img = true;
          objEvt['scroll'].forEach((item)=>{
            if(item.namespace=='img.lay'){
              no_scroll_lay_img = false;
              return true;
            }
          });
          if(no_scroll_lay_img){
            jQuery(window).on('scroll.lay.img',()=>{
              throttleDeFn();
            });
          }
		}
	}
  }
</script>

<style lang="less" rel="stylesheet/less">
	.progressive{
		.preview {
			//filter: blur(10px);
		}
	}
</style>



