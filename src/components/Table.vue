<template>
    
    <div class="search" >
        
        
        <div class="question">
            <span >問卷名稱</span>
            <input type="text" class="title" v-model="this.quizName">
        </div>
        <div class="time">
            <span >統計時間　</span>
            <input type="date" v-model="this.startDate">
            <span>　到　</span>
            <input type="date" v-model="this.endDate">
            <button type="button" @click="this.getData()">搜尋</button>
        </div>

        <div class="data">
            <table border=1>
                <tr class="tr1">
                    <td>名稱</td>
                    <td>狀態</td>
                    <td>開始時間</td>
                    <td>結束時間</td>
                    <td>結果</td>
                </tr>
                <tr v-for="(item, index) in displayedRows" >
                    <td v-if="this.today.toISOString().split('T')[0] < item.start_date">{{ item.quiz_name }}</td>
                    <td v-else-if="this.today.toISOString().split('T')[0] > item.end_date">{{ item.quiz_name }}</td>
                    <td v-else><router-link :to="{name:'fillout',params:{quizId:item.quiz_id}}">{{ item.quiz_name }}</router-link></td>
                    <td v-if="this.today.toISOString().split('T')[0] < item.start_date">尚未開始</td>
                    <td v-else-if="this.today.toISOString().split('T')[0] > item.end_date">已結束</td>
                    <td v-else>進行中</td>
                    <td >{{ item.start_date }}</td>
                    <td >{{ item.end_date }}</td>
                    <td v-if="this.today.toISOString().split('T')[0] < item.start_date">結果</td>
                    <td v-else><router-link :to="{name:'statics',params:{quizId:item.quiz_id}}">結果</router-link></td>
                </tr>
                <br>
                <br>
            <button @click="prevPage" :disabled="currentPage === 1"><</button>
            <span v-for="i in Math.ceil(this.allItems.length / this.pageSize)" @click="page(i)" :style="{cursor: 'pointer', margin:'6px'}">{{ i }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">></button>
            </table>
        </div>
    
    </div>
</template>

<script >
import Statics from '../components/Statics.vue'
import Fillout from '../components/Fillout.vue'

export default {
    data() {
        return {
        quizName:"",
        startDate: "",
        endDate: "",
        backend: false,
        quizId: 1,
        today: new Date(),
        endDateList:[],
        startDateList:[],
        quizIdList: [],
        list:[],
        listName:"",
        allItems: [], // 所有數據
        pageSize: 10, // 每頁數據量
        currentPage: 1, // 當前頁
    
        };
    },
    components:{
        Statics,
        Fillout
    },
    computed: {
    // 計算屬性：當前頁要顯示的數據子集
    displayedRows() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.allItems.slice(start, end);
    },
    
    // 計算屬性：總頁數
    totalPages() {
        return Math.ceil(this.allItems.length / this.pageSize);
    },
    },
    methods: {
    prevPage() {
        if (this.currentPage > 1) {
        this.currentPage--;
    }
    },
    nextPage() {
        if (this.currentPage < this.totalPages) {
        this.currentPage++;
        }
    },
    page(i){
        this.currentPage = i    
        },
    getData(){
        let obj = {
            
            quizName: this.quizName,
            startDate: this.startDate,
            endDate: this.endDate,
            backend: this.backend,
            
        }
        fetch("http://localhost:8080/quiz/search", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        .then(res => res.json())
        .then((data) =>{
            this.list.length = 0;
            this.listName = "";
            this.allItems.length = 0;
            this.startDateList.length = 0;
            this.endDateList.length = 0;
            this.list.push(data);
            this.list[0].quizList.forEach((item,index) => {
                this.quizIdList.push(item.quiz_id)
            });
            for(let i = 0; i<this.list[0].quizList.length; i++){
                this.listName = this.list[0].quizList[i];
                if(this.quizIdList[i+1] !== this.listName.quiz_id){
                    this.allItems.push(this.listName);
                }
            }
            
            // console.log(this.startDateList)
            // console.log(this.endDateList)
            // console.log(this.allItems);
            // console.log(this.today.toISOString().split('T')[0]);
            // console.log(this.allItems);
            // console.log(this.list);
        })
    },
    // test(){
    //     console.log(this.allItems)
    //     console.log(this.today.getTime() < this.date);
    // }
},
    mounted() {
        this.getData()
    },
};

</script>

<style lang="scss" scoped>
    .search{
    width: 60vw;
    height: 18vh;
    // border: 1px solid black;
    // margin-top: 10vh;
    // margin-left: 20vw;
    font-size: 20px;
    
    .question{
        width: 100%;
        height: 50%;
      // border: 1px solid black;
        position: relative;
      // text-align: center;
        .title{
        position: absolute;
        top: 30%;
        left: 28%;
        width: 55.5%;
        height: 40%;
    }
    span{
        position: absolute;
        top: 30%;
        left: 16%;
    }
    }

    .time{
        width: 100%;
        height: 50%;
      // border: 1px solid black;
        text-align: center;
      // position: relative;
        input{
        // position: absolute;
        
        // top: 10%;
        width: 20%;
        height: 40%;
    }

    button{
        margin-left: 20px;
        width: 50px;
        height: 30px;
    }
    }

    .data{
        width: 60vw;
        height: 60vh;
        // border: 1px solid black;

        table{
        border-collapse: collapse;
        width: 100%;
        height: 100%;

        .tr1{
            background: rgb(110, 106, 106);
            color: white;
        }

        tr:nth-child(even) {
            background-color: rgb(202, 202, 202);
        }

        td{
            padding:10px;
        }
        }
    }
    
}
    
</style>