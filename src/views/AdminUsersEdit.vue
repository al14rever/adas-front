<template>
    <div class="content">
        <NavBar/>
        <div class="text">Настройка пользователей</div>
        <div class="select">
            <div class="selected">
                    <img :src="user.imgSrc">
                    <span v-if="user._id">{{user.about}} ({{user.login}})</span>
                    <span v-else>Добавить нового пользователя</span>
                    <i class="fas fa-angle-double-down"></i>
            </div>
            <div class="forSelect">
                <div class="user" @click="select(null)">
                        <img src="https://res.cloudinary.com/adas/image/upload/v1605162780/devices/dqr6pvy9guow0dwg9s8y.jpg">
                        <span >Добавить нового пользователя</span>
                </div>
                <div class="user" v-for="u in users" :key="u.id" @click="select(u)">
                    <img :src="u.imgSrc">
                    <span>{{u.about}} ({{u.login}}) <i class="fas fa-exclamation-circle" v-if="u.typeNum == 0"></i></span>

                </div>
            </div>
        </div>
        <form class="editForm" @submit.prevent="">
            <div class="header">Основные настройки
                <div class="save">
                    <button @click="editUser()">Сохранить</button>
                </div>
            </div>
            <div class="img">
                <div class="upload" id="loader">
                    <div class="center">
                        <div><button class="upload" id="uploadButton" onclick="document.getElementById('upload').click()"><i class="fas fa-upload"></i>Загрузить</button></div>
                    </div>
                </div>      
                <input type="file" id="upload" hidden onchange="handleFiles(this.files)" accept="image/*" > 
                <img :src="user.imgSrc" id="img">
            </div>
            <div class="info">
                <label for="login">Логин:</label>
                <input type="text" v-model="user.login" placeholder="Логин" required>
                <label for="about">О пользователе:</label>
                <input type="text" v-model="user.about" placeholder="О пользователе" required>
                <label for="login">E-mail:</label>
                <input type="text" v-model="user.eMail" placeholder="E-mail" required>
                <label for="login">Телефон:</label>
                <input type="text" v-model="user.phone" placeholder="Телефон" required>
                <label for="type">Тип:</label>
                <div class="typeS">
                    <div class="typeSelected">
                        <input type="hidden" v-model="user.typeNum">
                        <div class="select">
                            <span>{{user.type}}</span>
                        </div>
                    </div>
                    <div class="forTypeSelect">
                        <div class="select" @click="user.typeNum = 0; user.type='Заблокирован/Не подтвержден'">
                            <span>Заблокирован/Не подтвержден</span>
                        </div>
                        <div class="select" @click="user.typeNum = 2; user.type='Студент'">
                            <span>Студент</span>
                        </div>
                        <div class="select" @click="user.typeNum = 1; user.type='Администратор'">
                            <span>Администратор</span>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="settings">
                <div class="resetPassword" v-if="user._id">
                    <div class="text"></div>
                    <button v-if="!user.new_password" content="Сбросить пароль пользователя до стандартного (1234567890). При авторизации пользователя, система потребует сменить пароль." v-tippy="{ placement : 'top',  arrow: true }" @click="resetPassword(user._id)">Сбросить пароль</button>
                    <button v-else disabled>Пароль сброшен</button>
                </div>
                <div class="resetPassword" v-else>
                    <div class="text"></div>
                    <button disabled>Пароль сброшен</button>
                </div>
            </div>

        </form>
    </div>
</template>

<style lang="scss" scoped>
$gold: rgb(255, 212, 0);
$blood: rgb(206, 67, 67);
$grass: rgb(126, 200, 80);
$graphite: rgb(31, 29, 29);
$blacktrans: rgba(0, 0, 0, 0.4);

.content {
    position: relative;   
    width: calc(100% - 130px);
    padding-left: 100px;
    padding-right: 20px;
    font-family: 'Exo 2', sans-serif;
    display: grid;
    min-height: fit-content;
    grid-template-columns: repeat(4, 1fr);

    .text {
        grid-column: span 4;
        margin-top: 20px;
        font-size: 40px;
        font-weight: 800;
        margin-bottom: 20px;
    }

    .select {
        grid-column: span 4;
        position: relative;
        cursor: pointer;
        z-index: 900;

        &:hover {

            .selected {
                border-radius: 1.2rem 1.2rem 0 0;

                > i {
                    transform: rotate(180deg);
                    margin-left: -30px;
                }
            }

            .forSelect {
                visibility: visible; 
                max-height: 250px;
                border-top: 5px solid $gold;
                border-bottom: 5px solid $gold;
            }
        }

        > .selected {
            border-radius: 1.2rem;
            background: $graphite;
            border: 1px solid $gold;
            display: grid;
            grid-template-columns: 40px 1fr 10px 10px;
            padding: 5px;
            transition: border-radius .3s ease;

            > img {
                width: 30px;
                border-radius: 50%;
            }

            > span, i {
                margin: auto 0;
            }

            &:hover {
                color: $gold;
            }
        }

        > .forSelect {
            position: absolute;
            width: 100%;
            max-height: 0;
            overflow: auto;
            visibility: hidden;
            transition: all 0.3s ease-in-out;

            > .user {
                background: $graphite;
                border: 1px solid $gold;
                padding: 5px;
                display: grid;
                grid-template-columns: 40px 1fr;

                > img {
                    width: 30px;
                    border-radius: 50%;
                }

                > span, i {
                    margin: auto 0;

                    > i {
                        color: $blood;
                    }
                }

                &:hover {
                    color: $gold;
                }

            }
        }
    }

    .editForm {
        grid-column: span 4;
        margin-top: 20px;
        width: 100%;
        border-radius: 1.2rem;
        background: $graphite;
        display: grid;
        grid-template-columns: 350px 1fr;

        > .header {
            grid-column: span 4;
            padding: 20px;
            font-size: 22px;
            font-weight: 700;

            > .save {
                float: right;
                
                > button {
                    margin: auto;
                    height: fit-content;
                    width: fit-content;
                    padding: 10px 20px;
                    border: 1px solid $grass;
                    color:   $grass;
                    background: transparent;
                    border-radius: 1.2rem;
                    cursor: pointer;

                    &:hover {
                        background: $grass;
                        color: white;
                    }
                }
            }
        }

        .img {
            position: relative;
            width: 300px;
            height: 300px;
            margin: auto;

            > img {
                width: 100%;
                margin: auto;
                border-radius: 1.2rem;
                margin-bottom: 0;
            }

            .upload {
                position: absolute;
                outline: none;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: $blacktrans;
                width: 100%;
                height: 100%;
                border-radius: 1.2rem;
                visibility: hidden;
                opacity: 0;
                transition: all .2s ease;

                > .center {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: fit-content;
                    display: grid;
                    width: 100%;
                    grid-template-columns: repeat(1, 1fr);
                    
                    > div {
                        margin: auto;

                        > .upload {
                            position: relative;
                            grid-column: span 1;
                            background: $blacktrans;
                            padding: 10px 40px;
                            font-size: 1.2rem;
                            font-weight: 700;
                            color: $gold;
                            cursor: pointer;
                            border: 3px solid $gold;
                            border-radius: 1.5rem;
                            margin-bottom: 20px;

                            transition: all .2s ease;

                            &:hover, &:focus {
                                background: $gold;
                                color: white;
                            }

                            > i {
                                margin-right: 10px;
                            }
                        }
                    }
                }
            }

            &:hover {

                .upload {
                    visibility: visible;
                    opacity: 1;
                }
            }

        }

        .info {
            width: 100%;
            margin: 0 0 20px 0;

            > label {
                display: block;
                font-size: 16px;
                font-weight: normal;
                margin-top: 20px;
            }

            > input {
                height: 30px;
                width: 95%;
                font-size: 20px;
                background: transparent;
                border: none;
                outline: none;
                color: white;
                border-bottom: 1px solid $gold;
            }

            .typeS {
                position: relative;

                &:hover {
                     
                    .forTypeSelect {
                        visibility: visible;
                    }
                }

                > .typeSelected {
                    width: 300px;

                    .select {
                        padding: 10px;
                        background: $graphite;
                        border-bottom: 1px solid $gold;
                    }
                }

                > .forTypeSelect {
                    position: absolute;
                    width: 300px;
                    visibility: hidden;
                    transition: all .3 ease;

                    .select {
                        padding: 10px;
                        background: $graphite;
                        border: 1px solid $gold;

                        &:hover {
                            color: $gold;
                        }
                    }
                }
            }
        }
    }

    .settings {
        grid-column: span 4;
        position: relative;

        > .header {
            padding: 0 20px;
            font-size: 22px;
            font-weight: 700;
        }

        > .resetPassword {
            display: grid;
            grid-template-columns: 1fr 300px;
            height: fit-content;

            > .text {
                grid-column: span 1;
                padding: 10px 20px;
                font-size: 16px;
                word-wrap: normal;
                font-weight: normal;
                color:  $blood;
            }

            > button {
                margin: auto;
                height: fit-content;
                width: fit-content;
                padding: 10px 20px;
                border: 1px solid $blood;
                color:   $blood;
                background: transparent;
                border-radius: 1.2rem;
                cursor: pointer;

                &:hover {
                    background: $blood;
                    color: white;
                }

                &:disabled {
                    background: transparent;
                    color: $grass;
                    border: 1px solid $grass;
                    cursor: not-allowed;
                }
            }
        }
    }

}
</style>

<script>
import NavBar from '../components/NavBar.vue'
import { http } from '../scripts/http'

export default {
    title: 'ADAS | Настройка пользователей',
    data() {
        return {
            users: null,
            user: {
                id: null,
                login: '',
                about: '',
                imgSrc: 'https://res.cloudinary.com/adas/image/upload/v1605162780/devices/dqr6pvy9guow0dwg9s8y.jpg',
                type: 'Студент',
                typeNum: '2',
                new_password: false
            },
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')  
            this.$router.push('/')
        },
        select(user) {
            if (user != null)
                this.user = user
            else 
                this.user = {
                    id: null,
                    login: '',
                    about: '',
                    imgSrc: 'https://res.cloudinary.com/adas/image/upload/v1605162780/devices/dqr6pvy9guow0dwg9s8y.jpg',
                    type: 'Студент',
                    typeNum: '2',
                }
        },
        resetPassword(_id) {
            http.post('/admin/users/reset/password', {_id: _id}).then(response => {
                this.user = response.data.user
                if (response.data.logout) {
                    this.logout()
                }
            })
            this.$swal({
                icon: 'success',
                title: 'Пароль сброшен!'
            });
        }
    },
    editUser() {
        this.user.imgSrc = document.getElementById('img').src
        http.post('/admin/users/edit', {user: this.user}).then(response => {
            this.user = response.data.user
            if (response.data.logout) {
                this.logout()
            }
            http.post('/admin/users').then(response => {
                this.users = response.data.users.sort((a,b) => a.type < b.type ? 1 : -1)
                if (response.data.logout) {
                    this.logout()
                }
            }) 
        }) 
        this.$swal({
            icon: 'success',
            title: this.user
        });
    },
    mounted: async function() {   
        if (JSON.parse(localStorage.userEdit)._id) this.user = JSON.parse(localStorage.userEdit)
        http.post('/admin/users').then(response => {
            this.users = response.data.users.sort((a,b) => a.type < b.type ? 1 : -1)
            if (response.data.logout) {
                this.logout()
            }
        })  
    },
    components: {
        NavBar
    }
}
</script>


