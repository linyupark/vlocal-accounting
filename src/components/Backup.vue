
<template>
  <div style="padding: 50px">
    <Button @click="localStorageBackup" size="large" icon="ios-download-outline" type="primary">备份数据</Button>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Button @click="localStorageRestore" size="large" icon="ios-cloud-upload-outline" type="warning">恢复数据</Button>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Poptip
      placement="bottom"
      confirm
      title="你确定要删除所有记录吗"
      @on-ok="okDelete">
      <Button size="large" icon="ios-trash" type="error">清除全部数据</Button>
    </Poptip>
  </div>
</template>

<script>
export default {
  name: 'TradeBackup',
  mixins: [],
  props: {},
  data() {
    return {};
  },
  methods: {
    okDelete() {
      localStorage.clear();
      this.$Message.success('数据已全部清除，2秒后刷新生效');
      setTimeout(() => {
        location.reload();
      }, 2000);
    },
    // 备份数据
    localStorageBackup() {
      var backup = {};
      for (let i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        backup[key] = escape(encodeURIComponent(value));
      }
      var json = JSON.stringify(backup);
      var base = btoa(json);
      var href = 'data:text/javascript;charset=utf-8;base64,' + base;
      var link = document.createElement('a');
      link.setAttribute(
        'download',
        `入库销售记录备份.${this.$dayjs().format('YYYYMMDDHHmmss')}.json`
      );
      link.setAttribute('href', href);
      document.querySelector('body').appendChild(link);
      link.click();
      link.remove();
    },
    // 恢复数据
    localStorageRestore() {
      let self = this;
      var t = document.createElement('div');
      var a = document.createElement('a');
      a.appendChild(document.createTextNode('X'));
      a.setAttribute('href', '#');

      a.style.position = 'absolute';
      a.style.top = '10px';
      a.style.right = '10px';
      a.style['text-decoration'] = 'none';
      a.style.color = '#fff';
      t.appendChild(a);
      a.onclick = function() {
        t.remove();
      };
      t.style.width = '50%';
      t.style.position = 'absolute';
      t.style.top = '25%';
      t.style.left = '25%';
      t.style['background-color'] = 'gray';
      t.style['text-align'] = 'center';
      t.style.padding = '50px';
      t.style.color = '#fff';
      t.style['z-index'] = 10000;

      var l = document.createElement('input');
      l.setAttribute('type', 'file');
      l.setAttribute('id', 'fileinput');
      l.onchange = function(e) {
        t.remove();
        var f = e.target.files[0];
        if (f) {
          var reader = new FileReader();
          reader.onload = function(e) {
            var text = e.target.result;
            var backup = JSON.parse(text);
            for (var key in backup) {
              var value = decodeURIComponent(unescape(backup[key]));
              window.localStorage.setItem(key, value);
            }
            self.$Message.success('导入成功!页面将自动刷新生效');
            setTimeout(() => {
              location.reload();
            }, 2000);
          };
          reader.readAsText(f);
        } else {
          self.$Message.error('导入失败!');
        }
      };
      var a = document.createElement('h3');
      a.appendChild(document.createTextNode('选择备份文件'));
      t.appendChild(a);
      t.appendChild(l);
      document.querySelector('body').appendChild(t);
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
  errorCaptured: ({ err, vm, info }) => {}
};
</script>