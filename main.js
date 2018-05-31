import Vue from 'vue'
// Vue.config.productionTip = false;//设置为false以阻止在vue启动时生产提示代码;
var file=""
const component = () =>import('./components'+file);
