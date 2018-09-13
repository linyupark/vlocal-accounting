<template>
  <div>
    <Poptip
      placement="top-end"
      confirm
      title="危险：你确定要删除该记录吗?"
      @on-ok="ok"
      @on-cancel="cancel">
      <Button icon="md-trash" type="error">删除</Button>
    </Poptip>
  </div>
</template>

<script>
export default {
  name: 'TradeOutAction',
  mixins: [],
  props: {
    params: {
      type: Object
    }
  },
  data() {
    return {}
  },
  methods: {
    ok() {
      this.$bus.$emit(this.$cf.evt.tradeOutDelete, this.params.row.id);
    },
    cancel() {

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
