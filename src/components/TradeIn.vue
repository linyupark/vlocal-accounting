<template>
  <div>
    <Form 
      ref="formData" 
      :model="formData" 
      :rules="formRules" 
      label-position="right" 
      :label-width="50"
      inline
    >
      <FormItem prop="iid" label="编号">
        <Input style="width: 100px" type="text" v-model="formData.iid" />
      </FormItem>
      <FormItem prop="name" label="名称">
        <Input style="width: 250px" type="text" v-model="formData.name" />
      </FormItem>
      <FormItem  label="单价(元)" :label-width="70">
        <InputNumber 
          style="width: 100px"
          :min="0" 
          v-model="formData.price">
        </InputNumber>
      </FormItem>
      <FormItem label="数量">
        <InputNumber style="width: 80px" v-model="formData.amount" />
      </FormItem>
      <FormItem :label-width="0">
        <Button :loading="loading" type="primary" @click="addTableItem('formData')">添加该笔记录</Button>
      </FormItem>
    </Form>
    <Table height="500" :columns="$cf.tradeInCols" :data="tableData"></Table>
  </div>
</template>

<script>
export default {
  name: 'TradeInTable',
  mixins: [],
  props: {},
  data() {
    return {
      // 列表数据
      tableData: this.$store.get(this.$cf.store.tradeIn) || [],
      // 表单数据
      formData: {
        iid: '',
        name: '',
        time: '',
        price: 0,
        amount: 0
      },
      // 表单规则
      formRules: {
        iid: [{ required: true, message: '必填', trigger: 'blur' }],
        name: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      loading: false
    };
  },
  methods: {
    // 添加
    addTableItem(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          try {
            this.loading = true;
            let newData = {
              ...this.formData,
              id: Date.now(),
              time: this.$dayjs().format('YY-MM-DD HH:mm:ss'),
              total: (Number(this.formData.price) * Number(this.formData.amount)).toFixed(2)
            };
            this.tableData.unshift(newData);
            this.$store.set(this.$cf.store.tradeIn, this.tableData);
            this.$Message.success('添加成功!');
            // this.formData = {
            //   iid: '',
            //   name: '',
            //   price: 0,
            //   time: '',
            //   amount: 0
            // };
          } catch (e) {
            throw e;
          } finally {
            this.loading = false;
          }
        }
      });
    },
    // 删除
    deleteTableItem(id) {
      this.tableData = this.tableData.filter(item => {
        if (item.id !== id) return true;
      });
      this.$store.set(this.$cf.store.tradeIn, this.tableData);
      this.$Message.success('删除成功!');
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
  mounted() {
    // 删除记录
    this.$bus.$on(this.$cf.evt.tradeInDelete, id => {
      this.deleteTableItem(id);
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