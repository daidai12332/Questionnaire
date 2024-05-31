
<template>
  
  <!-- <div class="search">
    <div class="question">
      <span>問卷名稱</span>
      <input type="text" class="title">
    </div>
    <div class="time">
      <span >統計時間　</span>
      <input type="date">
      <span>　到　</span>
      <input type="date">
      <button>搜尋</button>
    </div>
    
  </div> -->

  <div class="result">
    <Table   />
  </div>
  
    
  <!-- <RouterLink class="routeItem" to="/about">About</RouterLink> -->

</template>

<script>
import Table from '../components/Table.vue'
export default {
      data() {
        return {
          res:false,
        }
      },
      methods: {
        
      },
      components:{
        Table
      }
}
</script>

<style lang="scss" scoped>
  // .search{
  //   width: 60vw;
  //   height: 18vh;
  //   border: 1px solid black;
  //   margin-top: 10vh;
  //   margin-left: 20vw;
  //   font-size: 20px;
    
  //   .question{
  //     width: 100%;
  //     height: 50%;
  //     // border: 1px solid black;
  //     position: relative;
  //     // text-align: center;
  //     .title{
  //       position: absolute;
  //       top: 30%;
  //       left: 28%;
  //       width: 55.5%;
  //       height: 40%;
  //   }
  //   span{
  //     position: absolute;
  //       top: 30%;
  //       left: 16%;
  //   }
  //   }

  //   .time{
  //     width: 100%;
  //     height: 50%;
  //     // border: 1px solid black;
  //     text-align: center;
  //     // position: relative;
  //     input{
  //       // position: absolute;
        
  //       // top: 10%;
  //       width: 20%;
  //       height: 40%;
  //   }

  //   button{
  //     margin-left: 20px;
  //     width: 50px;
  //     height: 30px;
  //   }
  //   }
    
  // }

  .result{
    width: 60vw;
    height: 77.7vh;
    border: 1px solid black;
    margin-top: 10vh;
    margin-left: 20vw;
  }
  
</style>
