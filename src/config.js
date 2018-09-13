import TradeInAction from './components/TradeInAction';
import TradeOutAction from './components/TradeOutAction';

export default {
  // 全局事件
  evt: {
    tradeInDelete: 'TRADE_IN_DELETE',
    tradeOutDelete: 'TRADE_OUT_DELETE',
    tabChanged: 'TAB_CHANGED',
    getKeepAmount: 'GET_KEEP_AMOUNT',
    putKeepAmount: 'PUT_KEEP_AMOUNT'
  },
  // 存储字段
  store: {
    tradeIn: 'TRADEIN',
    tradeOut: 'TRADEOUT'
  },
  // 收益报表
  summaryCols: [
    {
      title: '商品编号',
      key: 'iid'
    },
    {
      title: '名称',
      key: 'name',
      ellipsis: true,
      minWidth: 150
    },
    {
      title: '进货均价',
      key: 'inAvg',
      render: (h, params) => h('span', params.row.inAvg + '元')
    },
    {
      title: '进货总量',
      key: 'inAmount'
    },
    {
      title: '进货成本',
      key: 'inTotal',
      render: (h, params) => h('span', params.row.inTotal + '元')
    },
    {
      title: '销售均价',
      key: 'outAvg',
      render: (h, params) => h('span', params.row.outAvg + '元')
    },
    {
      title: '销售总量',
      key: 'outAmount'
    },
    {
      title: '销售额',
      key: 'outTotal',
      render: (h, params) => h('span', params.row.outTotal + '元')
    },
    {
      title: '库存',
      key: 'keepAmount',
    },
    {
      title: '收益',
      key: 'income',
      render: (h, params) => h('span', params.row.income + '元')
    }
  ],
  // 出货列
  tradeOutCols: [
    // {
    //   title: 'ID',
    //   key: 'id',
    // },
    {
      title: '商品编号',
      key: 'iid'
    },
    {
      title: '名称',
      key: 'name',
      ellipsis: true,
      minWidth: 150
    },
    {
      title: '单价',
      key: 'price',
      render: (h, params) => h('span', params.row.price + '元')
    },
    {
      title: '数量',
      key: 'amount'
    },
    {
      title: '销售时间',
      key: 'time',
      minWidth: 100
    },
    {
      title: '总价',
      key: 'total',
      render: (h, params) => h('span', params.row.total + '元')
    },
    {
      title: '操作',
      key: 'action',
      render: (h, params) =>
        h(TradeOutAction, {
          props: { params }
        })
    }
  ],
  // 入库列
  tradeInCols: [
    // {
    //   title: 'ID',
    //   key: 'id',
    // },
    {
      title: '商品编号',
      key: 'iid'
    },
    {
      title: '名称',
      key: 'name',
      ellipsis: true,
      minWidth: 150
    },
    {
      title: '单价',
      key: 'price',
      render: (h, params) => h('span', params.row.price + '元')
    },
    {
      title: '数量',
      key: 'amount'
    },
    {
      title: '入库时间',
      key: 'time',
      minWidth: 100
    },
    {
      title: '总价',
      key: 'total',
      render: (h, params) => h('span', params.row.total + '元')
    },
    {
      title: '操作',
      key: 'action',
      render: (h, params) =>
        h(TradeInAction, {
          props: { params }
        })
    }
  ]
};
