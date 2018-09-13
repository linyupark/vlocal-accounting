<template>
    <Tabs v-model="currentTab" @on-click="onChange">
      <TabPane name="tradeIn" label="入库记录" icon="md-archive">
        <slot name="tradeIn"></slot>
      </TabPane>
      <TabPane name="tradeOut" label="销售记录" icon="ios-cash-outline">
        <slot name="tradeOut"></slot>
      </TabPane>
      <TabPane name="summary" label="数据统计" icon="md-clipboard">
        <slot name="summary"></slot>
      </TabPane>
      <TabPane name="backup" label="备份恢复" icon="ios-download-outline">
        <slot name="backup"></slot>
      </TabPane>
    </Tabs>
</template>
<script>
export default {
  name: 'TradeTabs',
  mixins: [],
  props: {},
  data() {
    return {
      currentTab: sessionStorage.getItem('currentTab') || 'tradeIn'
    }
  },
  methods: {
    onChange(name) {
      sessionStorage.setItem('currentTab', name);
      this.$bus.$emit(this.$cf.evt.tabChanged, name);
    }
  },
  computed: {},
  components: {},
  watch: {},
  filters: {},
  directives: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  errorCaptured: ({err, vm, info}) => {},
}
</script>