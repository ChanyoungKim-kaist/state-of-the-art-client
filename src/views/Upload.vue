<template>
    <v-container>
        <v-parallax
    height="300"
    src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
  ></v-parallax>
        <v-layout column>
            <v-flex xs12 text-center class="title">
                <h1> 제품을 등록해주세요! 📻 </h1>
                <p> 등록된 제품은 마이페이지에서 확인할 수 있습니다. </p>
            </v-flex>
            <v-flex>
                <v-layout row mt-10>
                    <v-flex xs6>
                        <v-layout column pa-5>
                            <v-card >
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
                                        multiple
                                        small-chips
                                        accept="image/png, image/jpeg, image/bmp"
                                        placeholder="Pick an avatar"
                                        prepend-icon="mdi-camera"
                                        label="이미지 선택"
                                    ></v-file-input>
                                </v-flex>
                            </v-card>
                            <v-flex pt-5>
                                <v-textarea
                                outlined
                                label="제품 소개를 입력해주세요"
                                ></v-textarea>
                            </v-flex>
                        </v-layout>
                    </v-flex>

                    <v-flex xs6>
                        <v-layout column pa-5>
                            <v-flex pa-2>
                                <v-text-field
                                    label="제품 이름"
                                    placeholder="제품 이름을 입력해주세요."
                                ></v-text-field>    
                            </v-flex>    

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
                                    type="number"
                                    suffix="원"
                                ></v-text-field>
                            </v-flex>
                            <v-flex pa-2>
                                <v-dialog
                                    ref="dialog"
                                    v-model="modal"
                                    persistent
                                    width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="date"
                                        label="원하는 날짜를 선택해주세요."
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                    v-model="date"
                                    scrollable
                                    :allowed-dates="disablePastDates"
                                    >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="modal = false"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="save(date)"
                                    >
                                        OK
                                    </v-btn>
                                    </v-date-picker>
                                </v-dialog>
                            </v-flex>

                            <v-flex pa-2>
                                <v-dialog
                                    ref="dialog"
                                    v-model="modal2"
                                    :return-value.sync="time"
                                    persistent
                                    width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="time"
                                        label="원하는 시간을 선택해주세요."
                                        prepend-icon="mdi-clock-time-four-outline"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-time-picker
                                    v-if="modal2"
                                    v-model="time"
                                    full-width
                                    >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="modal2 = false"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="save2(time)"
                                    >
                                        OK
                                    </v-btn>
                                    </v-time-picker>
                                </v-dialog>
                            </v-flex>
                   
                            <v-flex pa-2>
                                <v-checkbox v-model="checkbox">
                                <template v-slot:label>
                                    제품의 정품 인증서를 보유하고 있습니다.
                                </template>
                                </v-checkbox>
                            </v-flex>

                            <v-flex align-self-end mt-50>
                                <v-btn
                                rounded
                                width="100"
                                color="primary"
                                dark
                                >
                                등록
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-flex> 
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    
//import ListAdd from '../components/ListAdd'

export default {
    components: {
        //ListAdd
    },
    data() {
        return {
            todoList: [],
            items: ['가전', '도서', '옷', '가구', '생활'],
            category: '',
            modal: false,
            modal2: false,
            
            date: null,
            time: null,
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
        save(date) {
            this.$refs.dialog.save(date)
            this.modal = false
        },
        save2(time) {
            this.$refs.dialog.save(time)
        },
        disablePastDates(val) {
            return val >= new Date().toISOString().substr(0, 10)
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