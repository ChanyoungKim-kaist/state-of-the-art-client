<template>
    <v-container >
        <v-layout column>
            <v-flex xs12 text-center mt-3 class="title">
                <h1> 제품을 등록해주세요! 📻 </h1>
                <p> 등록된 제품은 마이페이지에서 확인할 수 있습니다. </p>
            </v-flex>
            <v-flex>
                <v-layout row mt-10>
                    <v-flex xs6>
                        <v-layout column pa-5>
                            <v-card>
                                <v-img
                                src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
                                :aspect-ratio="16/9"
                                >
                                </v-img>
                                <v-card-title>
                                <div>
                                    제품 이미지를 업로드해주세요.
                                </div>
                            </v-card-title>
                            <v-flex pa-5>
                                    <v-file-input
                                        :rules="rules"
                                        accept="image/png, image/jpeg, image/bmp"
                                        placeholder="Pick an avatar"
                                        prepend-icon="mdi-camera"
                                        label="이미지 선택"
                                    ></v-file-input>
                                </v-flex>
                            </v-card>
                            <v-flex pa-2>
                                <ListAdd
                                    @listAdd="listAdd"
                                    @listEdit="listEdit"
                                />
                            </v-flex>
                        </v-layout>
                    </v-flex>

                    <v-flex xs6>
                        <v-layout column pa-5>
                            <v-flex pa-2>
                                <v-select
                                    class="category"
                                    v-model="value"
                                    :items="items"
                                    chips
                                    label="카테고리"
                                    multiple
                                    outlined
                                    ></v-select>    
                            </v-flex>

                            <v-flex pa-2>
                                <v-text-field 
                                    label="경매 시작 가격을 입력해주세요."
                                    placeholder="숫자를 입력해주세요"
                                    outlined
                                    suffix="원"
                                    required
                                ></v-text-field>
                            </v-flex>
                            <v-flex pa-2>
                                <v-checkbox v-model="checkbox">
                                <template v-slot:label>
                                    <div>
                                        제품의 정품 인증서를 보유하고 있습니다.
                                    </div>
                                </template>
                                </v-checkbox>
                            </v-flex>
                        </v-layout>
                    </v-flex> 
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    
import ListAdd from '../components/ListAdd'

export default {
    components: {
        ListAdd
    },
    data() {
        return {
            todoList: [],
            items: ['가전', '도서', '옷', '가구', '생활'],
            category: ''
        }
    },
    computed: {
        countDone() {
            let cnt = 0
            this.todoList.forEach(list => {
                if (list.status == 'done') cnt++
            })
            return cnt
        }
    },
    methods: {
        listAdd(memo) {
            this.todoList.push({memo: memo, status: 'created'})
        },
        statusControl(index, status) {
            this.todoList[index].status = status
        },
        listEdit(memo, index) {
            this.todoList[index].memo = memo
        },
    
    }
}
</script>

<style scoped>

.title {
    padding-top: 30px;
    font-family: KakaoBig,Apple SD Gothic Neo,Malgun Gothic,맑은 고딕,sans-serif;
    font-size: 46px;
    line-height: 60px;
    color: var(--baseForeground);
    letter-spacing: -1px;
    background-size: 72px 72px;
}

</style>