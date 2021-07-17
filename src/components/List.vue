<template>
    <div>
        <v-card 
            :class="{'done': list.status == 'done'}"
            class="pa-3 mb-3" 
            v-for="(list, index) in todoList"
            :key="index"
        >
            <p>  {{list.memo}} </p>
            <v-btn
                v-if ="list.status == 'created'"
                @click = "$emit('statusControl', index, 'done')"
                fab small color="green"
            ><i class="fas fa-check"></i> 
            </v-btn>
            <v-btn
                class="pa-3 mb-3" 
                @click="listEdit(list.memo, index)"
                v-if="list.status == 'created'"
                fab small color="yellow"
            >
            </v-btn>
        </v-card> 
    </div>
</template>

<script>
import {eventBus} from "../main"

export default {
    props: ["todoList"],
    methods: {
        listEdit(memo, index) {
            eventBus.listEdit(memo, index)
        }
    },
}

</script>

<style scoped>
.done {
    overflow: hidden;
    position: relative;
    width: 297px;
    margin-top: 36px;
    border-radius: 14px;
    background-color: var(--colorBg10);
    box-shadow: 4px ㅋ12px 30px 6px rgb(0 0 0 / 9%);
}
.done p {
    text-decoration: line-through;
    color: rgba(0, 0, 0, 0.5);
}

</style>