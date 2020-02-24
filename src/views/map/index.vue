<template>
  <baidu-map
    class="map"
    :center="center"
    :zoom="zoom"
    :scroll-wheel-zoom="true"
    @ready="handler"
    ak="9zm9w9wbRArpc1hMQeH4eEsG7G6GPeTU"
  >
    <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
      <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
    </bm-marker>
  </baidu-map>
</template>
<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
export default {
  components: {
    BaiduMap
  },
  data() {
    return {
      center: { lgn: 0, lat: 0 },
      zoom: 3,
      show:false
    };
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    }
  }
};
</script>
<style>
.map {
  width: 100%;
  height: 800px;
}
</style>