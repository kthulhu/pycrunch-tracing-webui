<template>
  <div class="slider-dock mx-4">
    <el-slider v-if="total_events > 0" v-model="slider_position" :show-tooltip="false" :debounce="600" :max="total_events - 1"></el-slider>
  </div>
</template>
<script>
  import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

  export default {
    name: 'pc-time-slider',
    data () {
      return {
        // slider_position: 1
      }
    },
    computed: {
      // ...mapState(['slider_position']),
      ...mapState(['total_events', 'selected_index']),
      slider_position: {
        get () {
          return this.selected_index
        },
        set (value) {
          this.selected_index_will_change(value)
        },
      }
    },
    methods: {
      ...mapMutations(['selected_index_will_change']),
      // set_selection (e) {
      //   this.selected_index_will_change(e)
      // }
    },
  }
</script>
<style scoped>
  .slider-dock {
    display: inline-block;
    width: 100%;
  }
</style>
