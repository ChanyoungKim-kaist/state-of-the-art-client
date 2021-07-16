<template>
    <div>
        <v-card 
            class="pa-3" 
            v-for="(list, index) in todoList"
            :key="index"
        >
            <p>  {{list.memo}} </p>
        </v-card> 
    </div>
</template>

<script>
export default {
    props: ["todoList"]
}

</script>