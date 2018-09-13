<style lang="stylus">
@import '../main.styl'
</style>


<template>
  <div id="main">
    <Tabs>
      <template slot="tradeIn">
        <TradeInTable></TradeInTable>
      </template>
      <template slot="tradeOut">
        <TradeOutTable></TradeOutTable>
      </template>
      <template slot="summary">
        <Summary></Summary>
      </template>
      <template slot="backup">
        <Backup></Backup>
      </template>
    </Tabs>
  </div>
</template>

<script>
export default {
  name: 'AccountingApp',
  mixins: [],
  props: {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    Tabs: () => import('./Tabs'),
    TradeInTable: () => import('./TradeIn'),
    TradeOutTable: () => import('./TradeOut'),
    Summary: () => import('./Summary'),
    Backup: () => import('./Backup'),
  },
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
  errorCaptured: ({ err, vm, info }) => {}
};
</script>



