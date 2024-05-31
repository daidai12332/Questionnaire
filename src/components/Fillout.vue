<template >
    
    <div class="fill">
        <div class="title">
            <h1>{{ this.quizName }}</h1>
        </div>
        <br>
        <div class="question">{{ this.description }}</div>
        <div class="info">
            <div class="block">
                <label for="">姓名 </label>
                <input type="text" v-model="this.userName">
            </div>
            <div class="block">
                <label for="">手機 </label>
                <input type="text" v-model="this.phone">
            </div>
            <div class="block">
                <label for="">Email</label>
                <input type="text" v-model="this.email">
            </div>
            <div class="block">
                <label for="">年齡 </label>
                <input type="number" v-model.number="this.age">
            </div>

        </div>
        <br>
        <div class="option" v-for="(item, index) in this.list2">
            <p>{{ item.question_name }}</p>
            <span v-show="item.question_type == 1">(單選題)</span>
            <span v-show="item.question_type == 2">(複選題)</span>
            <span v-show="item.question_type == 3">(簡答題)</span>
            <span v-show="item.is_necessary">(必填)</span>

            <div class="type" v-show="item.question_type == 1">
                <div class="opt" v-for="(item, index) in this.optionArr[index]">
                    <label for="">{{ item }}
                        <input type="radio" :name="opt + index" :value="item" v-model="this.radioAnswers[index]">
                    </label>

                </div>
            </div>

            <div class="type" v-show="item.question_type == 2">
                <div class="opt" v-for="(items, index) in this.optionArr[index]">
                    <label for="">{{ items }}
                        <input type="checkbox" :name="opti + index" :value="items"
                            v-model="this.checkboxAnswers[index]">
                    </label>
                </div>
            </div>

            <div class="type" v-show="item.question_type == 3">
                <input type="text" v-model="this.textAnswers[index]">
            </div>
        </div>

        <div class="send">
            <button type="button">
                <RouterLink class="routeItem" to="/" style="text-decoration: none; color: inherit">返回</RouterLink>
            </button>
            <button type="button" @click="this.confirm()">確認</button>
        </div>

        <div class="save" v-show="this.alertShow">
            <div class="center">

                <p>是否送出?</p>
                <button type="button" @click="this.esc()">否</button>
                <button type="button" @click="this.saveAnswer()">是</button>
            </div>
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            userName: "",
            phone: "",
            email: "",
            age: 0,
            obj: {
                answerList: [
                ]
            },
            regPhone: /^09[0-9]{8}/,
            regEmail: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
            radioAnswers: [],
            checkboxAnswers: [],
            checkboxAnswersTrans: [],
            textAnswers: [],
            answerList: [],
            list: [],
            list2: [],
            list3: [],
            quizName: "",
            description: "",
            alertShow: false,
            optionArr: [],
            quId: 0,
            quizId: this.$route.params.quizId,
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
                    this.list2.length = 0;
                    this.list.push(data);

                    this.quizName = this.list[0].quizList[0].quiz_name;
                    this.description = this.list[0].quizList[0].quiz_description;

                    this.list[0].quizList.forEach((item, index) => {
                        this.list2.push(item);
                    });

                    for (let i = 0; i < this.list[0].quizList.length; i++) {
                        if (this.list[0].quizList[i].question_options !== null) {
                            this.optionArr.push(this.list[0].quizList[i].question_options.split(";"));
                        }

                    }
                    // this.list[0].quizList[0].question_options.split(";");
                    // console.log(this.optionArr[0][0])
                    // console.log(this.list[0].quizList.length)
                    // console.log(this.list2[0].question_id)
                    // console.log(obj)
                })
        },
        confirm() {
            
            if (this.userName == "") {
                Swal.fire({
                    title: "請輸入姓名!",
                    text: "",
                    icon: "warning"
                });
                return;
            } else if (!this.regPhone.test(this.phone)) {
                Swal.fire({
                    title: "手機格式錯誤!",
                    text: "",
                    icon: "warning"
                });
                return;
            } else if (!this.regEmail.test(this.email)) {
                Swal.fire({
                    title: "Email格式錯誤!",
                    text: "",
                    icon: "warning"
                });
                return;
            } else if (this.age < 0) {
                Swal.fire({
                    title: "年齡輸入錯誤!",
                    text: "",
                    icon: "warning"
                });
                return;
            }
            for (let j = 0; j < this.list2.length; j++) {
                if (this.list2[j].question_type == 1 && this.radioAnswers.toString() === "" && this.list2[j].is_necessary == true) {
                    Swal.fire({
                        title: "必填問題未作答!",
                        text: "",
                        icon: "warning"
                    });
                    return;
                } else if (this.list2[j].question_type == 2 && this.checkboxAnswersTrans.toString() === "" && this.list2[j].is_necessary == true) {
                    Swal.fire({
                        title: "必填問題未作答!",
                        text: "",
                        icon: "warning"
                    });
                    return;
                } else if (this.list2[j].question_type == 3 && this.textAnswers.toString() === "" && this.list2[j].is_necessary == true) {
                    Swal.fire({
                        title: "必填問題未作答!",
                        text: "",
                        icon: "warning"
                    });
                    return;
                }
            }
            this.alertShow = !this.alertShow;
            this.obj.answerList.length = 0;
            for (let i = 0; i < this.list2.length; i++) {
                if (this.list2[i].question_type == 1) {
                    this.obj.answerList.push({
                        "name": this.userName,
                        "phone": this.phone,
                        "email": this.email,
                        "age": this.age,
                        "quizId": this.quizId,
                        "quId": this.list2[i].question_id,
                        "answer": this.radioAnswers.toString(),
                    })
                } else if (this.list2[i].question_type == 2) {
                    this.optionArr[i].forEach((item, index) => {
                        if (this.checkboxAnswers[index] == true) {
                            this.checkboxAnswersTrans.push(item);
                        }

                    });

                    this.obj.answerList.push({
                        "name": this.userName,
                        "phone": this.phone,
                        "email": this.email,
                        "age": this.age,
                        "quizId": this.quizId,
                        "quId": this.list2[i].question_id,
                        "answer": this.checkboxAnswersTrans.toString(),
                    })
                } else if (this.list2[i].question_type == 3) {
                    if (typeof (this.textAnswers[i]) !== 'undefined') {
                        this.obj.answerList.push({
                            "name": this.userName,
                            "phone": this.phone,
                            "email": this.email,
                            "age": this.age,
                            "quizId": this.quizId,
                            "quId": this.list2[i].question_id,
                            "answer": this.textAnswers[i].toString(),
                        })
                    } else {
                        this.obj.answerList.push({
                            "name": this.userName,
                            "phone": this.phone,
                            "email": this.email,
                            "age": this.age,
                            "quizId": this.quizId,
                            "quId": this.list2[i].question_id,
                            "answer": "",
                        })
                    }

                }


            }
            console.log(this.obj)
        },
        saveAnswer() {
            this.alertShow = !this.alertShow;
            window.alert("成功送出!");
            fetch("http://localhost:8080/quiz/answer", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.obj)
            })
                .then(res => res.json())
                .then(json => console.log(json));

        },
        esc() {
            this.alertShow = !this.alertShow;
        },
        goRou() {
            this.$router.push(`/fillout/${quizId}`)
        }
    },
    mounted() {
        this.getInfo();
        console.log(this.regPhone.test("0912345678"));
        console.log(this.regEmail.test("aka@00.abc"));
        
    },
    created() {
        this.checkboxAnswers.push(...Array.from({ length: this.optionArr.length }).map(() => []))
    }
}
</script>
<style lang="scss" scoped>
.fill {
    width: 100%;
    height: 140vh;
    display: flex;
    flex-direction: column;
    text-align: center;
    position: relative;
    background-image: url("../assets/eff39c2c2ffb3b6d41d5114bc6d8f8dc.jpg");
    background-repeat: no-repeat;
    background-position: center;

    .info {
        margin-top: 6%;
        display: flex;
        flex-direction: column;

        label {
            margin: 25px;
        }

    }

    .question {
        text-align: left;
        width: 60vw;
        height: 17vh;
        margin-left: 20vw;
    }

    .send {
        button {
            margin: 15px;
        }
    }

    .save {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;

        .center {

            margin-top: 20%;
            position: fixed;
        }
    }
}
</style>