<template>
    <div>
        <h1> {{userInfo.first_name}}님 환영합니다 </h1>
    </div>
</template>

<script>
import {mapState} from "vuex"
export default {
    computed: {
        ...mapState(["userInfo"])
    }
}
</script> 