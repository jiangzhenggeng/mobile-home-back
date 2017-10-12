<template>
  <div>
    <home-banner />
    <home-announcement />
    <div class="mian-stream">
      <load-data-limit url="/api/article/GetArticleList">
        <template slot="item" scope="props">
          <!--一般大卡片-->
          <item-large v-if="props.item.type==1||props.item.type==2||props.item.type==3||props.item.type==4" :item="props.item"/>
          <!--话题-->
          <item-topic v-else-if="props.item.type==6" :item="props.item" />
          <!--一般小卡片-->
          <item-card v-else :item="props.item" />
        </template>
      </load-data-limit>
    </div>
  </div>
</template>

<script>
  import homeBanner from '../../components/homeBanner.vue';
  import homeAnnouncement from '../../components/homeAnnouncement.vue';
  import loadDataLimit from '../../components/loadDataLimit.vue';
  import itemCard from '../../components/card/card.vue';
  import itemLarge from '../../components/card/large.vue';
  import itemTopic from '../../components/card/topic.vue';

  export default{
    data:function () {
      return {}
    },
    components:{
      'home-banner':homeBanner,
      'home-announcement':homeAnnouncement,
      'load-data-limit':loadDataLimit,
      'item-card':itemCard,
      'item-large':itemLarge,
      'item-topic':itemTopic
    },

    methods:{

    }
  }
</script>

