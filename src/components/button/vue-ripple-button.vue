<template>

    <div ref="button" class="__Ripple-parent" @click="handleClick"
         v-if="android">
        <slot></slot>
        <ripple v-bind:cursor-pos="cursorPos"></ripple>
    </div>
    <div v-else>
        <slot></slot>
    </div>
</template>


<script>

/*! Copyright (c) 2016 Naufal Rabbani (http://github.com/BosNaufal)
  * Licensed Under MIT (http://opensource.org/licenses/MIT)
  *
  * Vue Ripple - Version 1.0.0
  *
  * Adopted from : https://github.com/nelsoncash/angular-ripple
  *
  */

  import ripple from './vue-ripple.vue';

  export default {

    data(){
      return{
        cursorPos: {},
        android:window.navigator.userAgent.indexOf('android') > -1
      }
    },

    components: { ripple },

    methods: {
      handleClick(e){
        // Get Cursor Position
        this.cursorPos = {
          top: e.clientY,
          left: e.clientX
        }
      }
    }

  };

</script>
