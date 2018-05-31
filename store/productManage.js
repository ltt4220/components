export default {
    state: {
        labelName: "产品管理",
        productListUrl: "http://local.zuma.com/product/webbuilder-api/productCategory/getProductCategoryList", //类目接口;
        productUrl: "http://local.zuma.com/product/webbuilder-api/product/getProductList", //数据接口;
        productTypeData: null,//类目数据;
        isNoProduct: false, //添加产品显示页面状态;
        assignData:null//指定数据;
    },
    mutations: {
        setLabel(state, value) { //check产品管理;
            state.labelName = value;
        },
        setUrl(sate, obj) {
            state[obj.key] = obj.value;
        },
        setProductType(state,value){
          state.productTypeData = value;
        },
        setNoProduct(state, value) {
          state.isNoProduct = value;
        },
        setAssignData(state,value){
          state.assignData = value;
        }
    }
}
