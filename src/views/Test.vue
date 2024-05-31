<template>

    <h1>{{ this.$route.params.quizId }}</h1>
</template>
<script>
import Swal from 'sweetalert2'
export default {
    data() {

    },
    methods: {
        goRou() {
            this.$router.push(`/test/${quizId}`)
        }
    }, mounted() {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Signed in successfully"
        });
    },
}
</script>
<style lang="scss" scoped></style>