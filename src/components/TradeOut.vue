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
        <Select style="width: 350px" v-model="formData.iid" filterable clearable>
          <Option v-for="item in itemList" :value="item.iid" :key="item.iid">{{ item.iid }}:{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem  label="单价(元)" :label-width="70">
        <InputNumber 
          :disabled="formData.iid===''"
          style="width: 100px"
          :min="0" 
          v-model="formData.price"
        />
      </FormItem>
      <FormItem label="数量">
        <InputNumber 
          :max="maxAmount"
          :disabled="formData.iid===''"
          style="width: 80px" 
          v-model="formData.amount" 
        />
      </FormItem>
      <FormItem :label-width="0">
        <Button :loading="loading" type="primary" @click="addTableItem('formData')">添加该笔记录</Button>
      </FormItem>
    </Form>
    <Table height="500" :columns="$cf.tradeOutCols" :data="tableData"></Table>
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
      tableData: this.$store.get(this.$cf.store.tradeOut) || [],
      // 表单数据
      formData: {
        iid: '',
        price: 0,
        time: '',
        amount: 0
      },
      // 商品可选列表(从进货数据里获得)
      itemList: [],
      // 表单规则
      formRules: {
        iid: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      loading: false,
      // 默认可最大出货
      maxAmount: 9999,
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
              name: this.itemName,
              id: Date.now(),
              time: this.$dayjs().format('YY-MM-DD HH:mm:ss'),
              total: (Number(this.formData.price) * Number(this.formData.amount)).toFixed(2)
            };
            this.tableData.unshift(newData);
            this.$store.set(this.$cf.store.tradeOut, this.tableData);
            this.$Message.success('添加成功!');
            this.formData = {
              iid: '',
              price: 0,
              time: '',
              amount: 0
            };
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
      this.$store.set(this.$cf.store.tradeOut, this.tableData);
      this.$Message.success('删除成功!');
    },
    // 获取商品id列表
    getItemList() {
      const tradeInTable = this.$store.get(this.$cf.store.tradeIn) || [];
      let itemList = [];
      tradeInTable.forEach(item => {
        let exist = false;
        itemList.forEach(item2 => {
          if (item2.iid == item.iid) {
            exist = true;
          }
        });
        if (!exist) {
          itemList.push({
            iid: item.iid,
            name: item.name
          });
        }
      });
      this.itemList = itemList;
      console.log('已获取商品列表', itemList);
    }
  },
  computed: {
    itemName() {
      let name = '';
      this.itemList.forEach(item => {
        if (item.iid === this.formData.iid) {
          name = item.name;
        }
      });
      return name;
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

    // 删除记录
    this.$bus.$on(this.$cf.evt.tradeOutDelete, id => {
      this.deleteTableItem(id);
    });

    // 获得商品id列表
    this.getItemList();

    // 改变tab的时候也触发一次获取商品id
    this.$bus.$on(this.$cf.evt.tabChanged, name => {
      if (name === 'tradeOut') {
        this.getItemList();
      }
    });

    // 选择商品后去获取库存数量
    this.$bus.$on(this.$cf.evt.putKeepAmount, amount => {
      this.maxAmount = Number(amount);
    });
    this.$watch('formData.iid', iid => {
      this.$bus.$emit(this.$cf.evt.getKeepAmount, iid);
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