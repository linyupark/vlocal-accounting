<template>
  <div>
    <Table height="500" :columns="$cf.summaryCols" :data="tradeKeep"></Table>
  </div>
</template>

<script>
export default {
  name: 'TradeSummary',
  mixins: [],
  props: {},
  data() {
    return {
      // 列表数据
      tradeInData: this.$store.get(this.$cf.store.tradeIn) || [],
      tradeOutData: this.$store.get(this.$cf.store.tradeOut) || []
    };
  },
  methods: {
    refreshData() {
      this.tradeInData = this.$store.get(this.$cf.store.tradeIn) || [];
      this.tradeOutData = this.$store.get(this.$cf.store.tradeOut) || [];
    }
  },
  computed: {
    // 进货累计
    tradeInMerge() {
      let tradeInMerge = {};
      this.tradeInData.forEach(item => {
        if (tradeInMerge[item.iid]) {
          tradeInMerge[item.iid].amount += Number(item.amount);
          tradeInMerge[item.iid].total += Number(item.total);
        } else {
          tradeInMerge[item.iid] = {
            iid: item.iid,
            name: item.name,
            amount: Number(item.amount),
            total: Number(item.total)
          };
        }
      });
      return tradeInMerge;
    },
    tradeInMergeArray() {
      return Object.keys(this.tradeInMerge).map(i => {
        return this.tradeInMerge[i];
      });
    },
    // 出货累计
    tradeOutMerge() {
      let tradeOutMerge = {};
      this.tradeOutData.forEach(item => {
        if (tradeOutMerge[item.iid]) {
          tradeOutMerge[item.iid].amount += Number(item.amount);
          tradeOutMerge[item.iid].total += Number(item.total);
        } else {
          tradeOutMerge[item.iid] = {
            iid: item.iid,
            name: item.name,
            amount: Number(item.amount),
            total: Number(item.total)
          };
        }
      });
      return tradeOutMerge;
    },
    tradeOutMergeArray() {
      return Object.keys(this.tradeOutMerge).map(i => {
        return this.tradeOutMerge[i];
      });
    },
    // 剩余库存
    tradeKeep() {
      let tradeKeep = {};
      return Object.keys(this.tradeInMerge).map(i => {
        tradeKeep[i] = this.tradeInMerge[i];
        // 进货平均成本
        tradeKeep[i].inAvg = Number(tradeKeep[i].total / tradeKeep[i].amount).toFixed(2);
        // 总数量
        tradeKeep[i].inAmount = tradeKeep[i].amount;
        // 进货总金额
        tradeKeep[i].inTotal = Number(tradeKeep[i].total).toFixed(2);
        // 出货相关
        console.log(this.tradeOutMerge, i);
        if (this.tradeOutMerge[i]) {
          // 均价
          tradeKeep[i].outAvg = Number(
            this.tradeOutMerge[i].total / this.tradeOutMerge[i].amount
          ).toFixed(2);
          // 总数量
          tradeKeep[i].outAmount = this.tradeOutMerge[i].amount;
          // 总金额
          tradeKeep[i].outTotal = Number(this.tradeOutMerge[i].amount).toFixed(2);
          // 库存数
          tradeKeep[i].keepAmount = tradeKeep[i].amount - this.tradeOutMerge[i].amount;
          // 利润
          tradeKeep[i].income = Number(this.tradeOutMerge[i].total - tradeKeep[i].total).toFixed(2);
        } else {
          tradeKeep[i].outAvg = '--';
          tradeKeep[i].outTotal = '--';
          tradeKeep[i].outAmount = '--';
          tradeKeep[i].keepAmount = tradeKeep[i].amount;
          tradeKeep[i].income = Number(- tradeKeep[i].total).toFixed(2);
        }
        return tradeKeep[i];
      });
    }
  },
  components: {},
  watch: {},
  filters: {},
  directives: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    // 改变tab的时候也触发一次获取商品id
    this.$bus.$on(this.$cf.evt.tabChanged, name => {
      this.refreshData();
    });
    // 外部调用库存量
    this.$bus.$on(this.$cf.evt.getKeepAmount, iid => {
      let amount = 0;
      this.refreshData();
      this.tradeKeep.forEach(item => {
        if (item.iid === iid) {
          amount = item.keepAmount;
        }
      });
      this.$bus.$emit(this.$cf.evt.putKeepAmount, amount);
    });
  },
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  errorCaptured: ({ err, vm, info }) => {}
};
</script>