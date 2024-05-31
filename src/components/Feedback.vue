<template >
    
    <div class="all">
        <button type="button" class="return"><RouterLink class="routeItem" to="/backend" style="text-decoration: none; color: inherit"><span class="material-symbols-outlined">arrow_back</span></RouterLink></button>
        <div class="fed">
            <table >
                <tr>
                    <td class="title">請選擇題目</td>
                </tr>
                <tr v-for="(item,index) in this.questionList">
                    <td><router-link :to="{name:'feedbackdetail',params:{quizId:this.quizId},params:{quId:item.question_id}}" style="text-decoration: none; color: inherit">{{ item.question_name }}</router-link></td>
                </tr>
            </table>
            
        </div>
    </div>
</template>
<script>
import Feedbackdetail from '../components/FeedbackDetail.vue';
export default {

    data() {
        return {
            quizId: this.$route.params.quizId,
            quid:0,
            list:[],
            questionList:[],
        }
    },
    methods: {
        getInfo() {
            let obj = {
                quizId: this.quizId
            }
            fetch(`http://localhost:8080/quiz/find_info?quiz_id=${this.quizId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },

            })
                .then(res => res.json())
                .then((data) => {
                    this.list.length = 0;
                    
                    this.list.push(data)
                    this.list[0].quizList.forEach((item, index) => {
                        this.questionList.push(item);
                    });
                    
                    console.log(this.questionList)
                })
        },
        goRou() {
            this.$router.push(`/feedback/${quizId}`)
        }
    },
    components:{
        Feedbackdetail,
    },
    mounted() {
        this.getInfo();
    },
}
</script>
<style lang="scss" scoped>
@import "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" ;
.all{
    background: #E8DFCA;
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    
    .fed{
        
        width: 50vw;
        height: 66vh;
        // border: 1px solid black;
        text-align: left;
        margin-top: 10vh;
        margin-left: 28vw;
        background-image: url("../assets/b006720f9b352195bbcedb7f8fae50cd.jpg");
        background-size: contain;
        background-repeat: no-repeat;
        
        table{
            border-collapse: collapse;
            
            margin-top: 4vw;
            margin-left: 5vw;
            display: inline-block;
            color: white;
            td{
                padding: 10px;
                
            }
    
            .title{
                text-align: center;
                font-size: 40px;
            }
            
        }
    }
}
</style>