<template>
    <div class="all">
        <h1>更新問卷</h1>
        <div class="block">
            <label for="">問卷名稱　</label>
            <input type="text" v-model="this.qName">
        </div>
        <div class="block">
            <label for="">問卷說明　</label>
            <input type="text" v-model="this.qdescription">
        </div>
        <div class="block">
            <label for="">開始時間　</label>
            <input type="date" v-model="this.starDate">
        </div>
        <div class="block">
            <label for="">結束時間　</label>
            <input type="date" v-model="this.endDate">
        </div>
        <div class="block">
            <label for="">問題　</label>
            <input type="text" v-model="this.question">
            <label for="">　問題種類　</label>
            <select name="" id="" v-model="this.type">
                <option value="1">單選題</option>
                <option value="2">複選題</option>
                <option value="3">簡答題</option>
            </select>
            <label for="">　必填</label>
            <input type="checkbox" v-model="this.checkbox" @click="(e) => {
                console.dir(e.target);
            }">
        </div>
        <div class="block">
            <label for="">選項: (多個請以分號隔開)</label>
            <br>
            <input type="text" v-model="this.option">
            <button type="button" class="add" @click="this.join()">加入</button>
            <button type="button" class="delte" @click="this.deletQuestion()">刪除</button>
        </div>
    
        <div class="tab">
            <table border=1>
                <tr>
                    <td></td>
                    <td>題目</td>
                    <td>問題種類</td>
                    <td>必填</td>
                    <td>選項</td>
                </tr>
                <tr v-for="(item, index) in this.optionList">
                    <td><input type="checkbox" v-model="this.deleteQus[index]" name="del"></td>
                    <td>{{ item.question }}</td>
                    <td>{{ item.type }}</td>
                    <td>{{ item.checkbox }}</td>
                    <td>{{ item.option }}</td>
                </tr>
            </table>
            <div class="label">

                <label for="">不發佈</label>
                <input type="radio" value="false" name="pub" v-model="this.published">
                <label for="">發佈</label>
                <input type="radio" value="true" name="pub" v-model="this.published">
            </div>
        </div>
    
        <button type="button" class="return">
            <RouterLink class="routeItem" to="/backend" style="text-decoration: none; color: inherit"><span class="material-symbols-outlined">arrow_back</span></RouterLink>
        </button>
        <button type="button" class="confirm" @click="this.confirm()">確認</button>
    
        <div class="save" v-show="this.alertShow">
                <div class="center">
    
                    <p>是否送出?</p>
                    <button type="button" @click="this.esc()">否</button>
                    <button type="button"@click="this.saveQuiz()">是</button>
                </div>
        </div>
    </div>

</template>
<script>

export default {
    data() {
        return {
            qName: "",
            qdescription: "",
            starDate: "",
            endDate: "",
            question: "",
            type: "",
            type2: "",
            deleteQus: [],
            deleteQus2: [],
            checkbox: "",
            option: "",
            optionList: [],
            published: false,
            list: [],
            quizList: [],
            quizId: this.$route.params.quizId,
            obj: {
                quiz_list: [
                ],
                is_published: ""
            },
            alertShow : false,
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
                    this.quizList.length = 0;
                    this.list.push(data)
                    this.list[0].quizList.forEach((item, index) => {
                        this.quizList.push(item);
                    });

                    this.qName= this.quizList[0].quiz_name
                    this.qdescription = this.quizList[0].quiz_description
                    this.starDate = this.quizList[0].start_date
                    this.endDate = this.quizList[0].end_date

                    this.quizList.forEach((item, index) => {
                        if (item.question_type == "1") {
                            this.type = "單選題"
                        } else if (item.question_type == "2") {
                            this.type = "複選題"
                        } else if (item.question_type == "3") {
                            this.type = "簡答題"
                        }
                        if(item.is_necessary == true){
                            this.optionList.push({
                            question: item.question_name,
                            option: item.question_options.split(";").join(';'),
                            type: this.type,
                            checkbox: "✔️"
                        });
                        }else{
                            this.optionList.push({
                            question: item.question_name,
                            option: item.question_options.split(";").join(';'),
                            type: this.type,
                            checkbox: ""
                        });
                        }
                        
                    });
                    
                    console.log(this.quizList)
                })
        },
        join() {
            if (this.type == "1") {
                this.type = "單選題"
            } else if (this.type == "2") {
                this.type = "複選題"
            } else if (this.type == "3") {
                this.type = "簡答題"
            }
            if (this.checkbox == true) {
                this.optionList.push({
                    question: this.question,
                    option: this.option.split(";").join(';'),
                    type: this.type,
                    checkbox: "✔️"
                })
            } else {
                this.optionList.push({
                    question: this.question,
                    option: this.option.split(";").join(';'),
                    type: this.type,
                    checkbox: ""
                })
            }

            // console.log(this.option)
        },
        deletQuestion() {
            console.log(this.deleteQus)
            for (let i = 0; i < this.optionList.length; i++) {
                if (this.deleteQus[i] !== true) {
                    this.deleteQus2.push(this.optionList[i])
                }
            }
            this.optionList.length = 0;

            this.deleteQus2.forEach((item, index) => {
                this.optionList.push(item)
            });
            // console.log(this.optionList.length)

        },
        saveQuiz() {
            this.alertShow = !this.alertShow;
            window.alert("成功送出!");
            fetch("http://localhost:8080/quiz/update", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.obj)
            })
                .then(res => res.json())
                .then(json => console.log(json));

        },
        confirm() {
            
            this.alertShow = !this.alertShow;
            for (let i = 0; i < this.optionList.length; i++) {

                if (this.optionList[i].type == "單選題") {
                    this.type2 = "1"
                } else if (this.optionList[i].type == "複選題") {
                    this.type2 = "2"
                } else if (this.optionList[i].type == "簡答題") {
                    this.type2 = "3"
                }

                if (this.optionList[i].checkbox == "✔️") {
                    this.obj.quiz_list.push({
                        "quiz_id": this.quizId,
                        "question_id": i + 1,
                        "quiz_name": this.qName,
                        "quiz_description": this.qdescription,
                        "start_date": this.starDate,
                        "end_date": this.endDate,
                        "question_name": this.optionList[i].question,
                        "question_type": this.type2,
                        "is_necessary": true,
                        "question_options": this.optionList[i].option,
                        
                    })
                } else {
                    this.obj.quiz_list.push({
                        "quiz_id": this.quizId,
                        "question_id": i + 1,
                        "quiz_name": this.qName,
                        "quiz_description": this.qdescription,
                        "start_date": this.starDate,
                        "end_date": this.endDate,
                        "question_name": this.optionList[i].question,
                        "question_type": this.type2,
                        "is_necessary": false,
                        "question_options": this.optionList[i].option,
                        
                    })
                    
                }

            }
            this.obj.is_published = this.published
            
            console.log(this.obj)
            // console.log(this.obj.quiz_list)
        },
        esc(){
            this.alertShow = !this.alertShow;
            this.obj.quiz_list.length = 0;
        },
        goRou() {
            this.$router.push(`/update/${quizId}`)
        }
    },
    mounted() {
        this.getInfo();
        
    },
    updated() {
        this.optionList;
        
    },
}
</script>
<style lang="scss" scoped>
@import "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" ;
.all{
    position: relative;
    text-align: center;
    width: 100%;
    height: 100vh;
    background: #E8DFCA;
    
    .block{
        width: 40vw;
        height: 5vh;
        margin: auto;

        .add{
            margin: 10px;
        }
    }
    .tab{
        width: 40vw;
        height: 5vh;
        margin-top: 5vh;
        margin-left: 40vw;
        table{
            // margin-left: 43%;
            
            border-collapse: collapse;

            td{
                padding: 10px;
            }
        }
    }

    .label{
        width: 10vw;
        height: 10vh;
        position: absolute;
        right: 23vw;
        
    }
    .save {
            position: absolute;
            z-index: 2;
            width: 100%;
            height: 100%;
            top: 0;
    
            .center{
                margin-left: 20%;
                margin-top: 20%;
                position: fixed;
            }
        }

        .return{
            position: absolute;
            top: 0%;
            left: 10vw;
            
        }

        .confirm{
            position: absolute;
            bottom: 0;
            left: 20vw;
            font-size: 20px;
            width: 60px;
        }
}
</style>