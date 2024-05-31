<template >
    <div class="all">
        <button type="button" class="return"><router-link :to="{name:'feedback',params:{quizId:this.quiz_id}}"><span class="material-symbols-outlined">arrow_back</span></router-link></button>
        <div class="title">
            <h1> {{ this.quizName}} </h1>
            <br>
            <p>{{ this.quizDescription }}</p>
            <p class="qName">{{ this.questionName }}</p>
        </div>
        <div class="userInfo">
            <table border="1">
                <tr>
                    <td>姓名</td>
                    <td>Email</td>
                    <td>電話</td>
                    <td>年齡</td>
                    <td>答案</td>
                </tr>
                <tr v-for="(item,index) in this.userList">
                    <td>{{item.name}}</td>
                    <td>{{item.email}}</td>
                    <td>{{item.phone}}</td>
                    <td>{{item.age}}</td>
                    <td>{{item.answer.replaceAll(',', '')}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            quizId: this.$route.params.quizId,
            quId: this.$route.params.quId,
            list:[],
            list2:[],
            quizName:"",
            questionName: "",
            quizDescription:"",
            userList:[],
            userName:"",
            userEmail:"",
            userAge:"",
            userPhone:"",
            userAnswer:"",
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
                        if(item.question_id == this.quId){
                            this.quizName = item.quiz_name;
                            this.questionName = item.question_name;
                            this.quizDescription = item.quiz_description;
                        }
                        
                    });
                    
                    // console.log()
                })
        },
        getAnswer(){
            let obj = {
                quizId: this.quizId,
                quId: this.quId
            }
            fetch(`http://localhost:8080/quiz/find_answer?quiz_id=${this.quizId}&qu_id=${this.quId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },

            })
                .then(res => res.json())
                .then((data) => {
                    this.list2.length = 0;
                    
                    this.list2.push(data)
                    this.list2[0].answerList.forEach((item,index) => {
                        this.userList.push(item);
                    });
                    console.log(this.userList)
                })
        },
        goRou() {
            this.$router.push(`/feedbackdetail/${quizId}/${quId}`)
        }
    },
    mounted() {
        this.getInfo();
        this.getAnswer();
    },
}
</script>
<style lang="scss" scoped>
@import "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" ;
    
    .all{
        width: 100%;
        height: 100vh;
        background: #E8DFCA;


        .title{
            
            width: 100%;
            height: 20vh;
            h1{
                margin-left: 43%;
            }
            p{
                width: 50vw;
                height: 8vh;
                margin-left: 25%;
            }
            .qName{
                margin-left: 47%;
            }
        }
    
        .userInfo{
            
            
            table{
                border-collapse: collapse;
                // width: 100%;
                // height: 100%;
                margin-left: 37%;
                margin-top: 1%;
        
                
                td{
                    padding:10px;
                }
            }
        }
    }
</style>