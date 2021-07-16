<template>
    <div>
        <v-container fluid>
            <v-textarea
            v-model="memo"
            filled
            label="소개를 입력해주세요."
            auto-grow
            ></v-textarea>
    <v-btn fab @click="listAdd"> <i class="fas fa-check"></i> </v-btn>
  </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            memo: null
        }
    },
    methods: {
        listAdd() {
            if ( this.memo ==null ) {
                alert('소개를 입력해주세요.')
            }
            else this.$emit('listAdd', this.memo)
        }
    }
}
</script>