<template>
    <div class="zm-dialog-sortord" @mouseleave="addSelHidden">
        <span class="zm-dialog-Icon-title">排序方式</span>
        <div class="zm-dialog-Icon" @click="addSelClass()" v-bind:class="{'zmicon_hover':isHover}">
            <span class="number">{{RandomSN}}</span>
            <i class="iconfont icon-sanjiao-copy icon_triangle"></i>
        </div>
        <ul class="zm-dialog-random" v-show="isShow" @mouseleave="addSelHidden">
            <li data-type="random" @click="addSortRandom()"><span class="random">随机展示</span></li>
            <li data-type="time" @click="addSortDesc()"><span class="time">按时间排序</span></li>
            <li data-type="number" @click="addSortAsc()"><span class="number">按编号排序</span></li>
        </ul>
    </div>
</template>
<script>
export default {
    name:"set-blog-select",
    props:['prop'],
    data(){
        return {
            isShow:false,
            isHover:false,
            RandomSN:"按时间排序"
        }
    },
    methods:{
        addSelClass(){
            let _this = this;
                _this.isShow = !_this.isShow;
                _this.isHover = ! _this.isHover;
        },
        addSelHidden(){
            let _this = this;
                _this.isShow = false;
                _this.isHover = false;
        },
        addSelClick(){
            let _this = this;
            let current = event.currentTarget;
            // console.log(current.nextElementSibling)
            _this.isShow = !_this.isShow;
            _this.isHover = ! _this.isHover;
            _this.RandomSN = current.innerText
        },
        addSortRandom(){
            let _this = this;
            _this.addSelClick();
            for(var i=0,len=_this.prop.lists.length;i<len;i++){
                var rand  = parseInt(Math.random()*len);
                var temp  = _this.prop.lists[rand];
                _this.prop.lists[rand] = _this.prop.lists[i];
                _this.prop.lists[i] = temp;
            }
            _this.$emit("sortList",_this.prop.lists);
        },
        addSortDesc(){
            let _this = this;
            _this.addSelClick();
            _this.prop.lists.sort(_this.sortBy('fCreateTime',false));
        },
        addSortAsc(){
            let _this = this;
            _this.addSelClick();
            _this.prop.lists.sort(_this.sortBy('fCreateTime',true));
        },
        sortBy(attr,rev){
             //attr 排序的属性 如number属性
             //rev true表示升序排列，false降序排序
             //第二个参数没有传递 默认升序排列
            if(rev ==  undefined){
                rev = 1;
            }else{
                rev = (rev) ? 1 : -1;
            }
            return function(a,b){
                a = a[attr];
                b = b[attr];
                if(a < b){
                    return rev * -1;
                }
                if(a > b){
                    return rev * 1;
                }
                return 0;
            }
        }
    }
}
</script>
