<template>
    <div class="content">
        <NavBar/>
        <div class="text">Пользователи  ({{num}})</div>
        <div class="search">
            <label>Поиск пользователя:</label>
            <input v-model="search" type="text" >
        </div>
        <div class="card-user" v-for="user in users" v-bind:key="user.id">
            <div class="card-over">
                <div class="center">
                    <form @submit.prevent="toEdit(user)"><button class="edit"><i class="fas fa-user-edit"></i>Изменить</button></form>
                    <form @submit.prevent="deleteUser(user._id)"><button class="delete"><i class="fas fa-user-slash"></i>Удалить</button></form>
                </div>
            </div>
            <div class="card-header">ADAS profile</div>
            <div class="card-header"><i class="fas fa-user-circle"></i></div>
            <div class="card-header">Профиль ADAS</div>
            <img class="avatar" :src="user.imgSrc">
            <div class="info">
                <label>Логин</label>
                <p>{{user.login}}</p>
                <label>О пользователе</label>
                <p>{{user.about}}</p>
                <label>E-mail</label>
                <p>{{user.eMail}}</p>
                <label>Телефон</label>
                <p>{{user.phone}}</p>
                <label>Тип</label>
                <p>{{user.type}}</p>
            </div>
            <div class="id">
                <div id="id" @click="notification('ID')" onclick="navigator.clipboard.writeText(this.childNodes[0].childNodes[1].innerHTML)">
                    <span><i class="fas fa-id-card"></i><span id="copyId">{{user._id}}</span></span>                   
                    <span class="tooltip"><i class="far fa-copy"></i> Копировать ID Пользователя</span>
                </div>
            </div>
            <div class="code">
                <div id="code" @click="notification('Индивидуальный код')" onclick="navigator.clipboard.writeText(this.childNodes[0].childNodes[1].innerHTML)">
                    <span><i class="fas fa-qrcode"></i><span id="copyCode">{{user.code}}</span></span>                   
                    <span class="tooltip"><i class="far fa-copy"></i> Копировать код пользователя</span>
                </div>
            </div>
        </div>
        <div id="notification" class="notification"></div>
    </div>
</template>

<style lang="scss" scoped>
$gold: rgb(255, 212, 0);
$blood: rgb(180, 0, 0);
$grass: rgb(126, 200, 80);
$gray: rgb(56, 55, 59);
$blacktrans: rgba(0, 0, 0, 0.4);
$black: rgb(0, 0, 0);
$greyLilac: rgb(55, 61, 78);
$blackBlue: rgb(14, 17, 27);

$gradientBlackSteel: linear-gradient(90deg, #22252E 0%, #16171d 100%);

.notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    border-radius: 2rem;
    background: $gray;
    color: $gold;    
    cursor: pointer;

    &:empty {
        display: none;
    }
}

.content {
    position: relative;   
    width: calc(100% - 130px);
    padding-left: 100px;
    padding-right: 20px;
    font-family: 'Exo 2', sans-serif;
    display: grid;
    min-height: fit-content;
    grid-template-columns: repeat(auto-fit, 1fr);
    
    .text {
        grid-column: span 2;
        margin-top: 20px;
        font-size: 40px;
        font-weight: 800;
        margin-bottom: 20px;
    }
    
    .search {        
        grid-column: span 2;
        background: $gradientBlackSteel;
        padding: 20px 10px;
        margin-bottom: 20px;
        border-radius: 1.2rem;
        display: grid;

        > label {
            height: 40px;
            margin-left: 10px;
            font-size: 1.7rem;
            grid-column: span 1;
        }

        > input {
            display: block;
            height: 35px;
            border: none;
            border-radius: 1.2rem;
            padding: 10px 20px;
            outline: none;
            font-size: 20px;
            color: white;
            background: $blacktrans;
            margin: auto;
            width: calc(100% - 40px);
        }
    }

    .card-user { 
        position: relative;
        padding: 15px;
        margin-left: 5px;
        max-width: 700px;
        background: $gradientBlackSteel;
        border-radius: 1.2rem;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        transition: all 100ms ease;
        margin-bottom: 20px;
        cursor: pointer;

        animation: card 1s ease;

        .card-over {
            position: absolute;
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
                grid-template-columns: repeat(2, 1fr);
                
                > form {
                    margin: auto;

                    > .edit {
                        grid-column: span 1;
                        background: $blacktrans;
                        padding: 10px 40px;
                        font-size: 1.2rem;
                        font-weight: 700;
                        color: $grass;
                        margin: 0 20px;
                        cursor: pointer;
                        border: 3px solid $grass;
                        border-radius: 1.5rem;

                        transition: all .2s ease;

                        &:hover, &:focus {
                            background: $grass;
                            color: white;
                        }

                        > i {
                            margin-right: 10px;
                        }
                    }

                    > .delete {
                        grid-column: span 1;
                        background: $blacktrans;
                        padding: 10px 40px;
                        font-size: 1.2rem;
                        font-weight: 700;
                        color: $blood;
                        margin: 0 20px;
                        cursor: pointer;
                        border: 3px solid $blood;
                        border-radius: 1.5rem;

                        transition: all .2s ease;

                        &:hover, &:focus {
                            background: $blood;
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

            .card-over {
                opacity: 1;
                visibility: visible;
            }

            .id, .code {
                div {
                    background: inherit;
                    color: gold;
                    border: 3px solid $gold;

                    &:hover {
                        background: $gold;
                        color: $black;
                    }
                }
            }

        }

        .card-header {
            grid-column: span 2;
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 20px;
            text-align: center;

            i {
                font-size: 30px;
            }
        }

        .info  {
            grid-column: span 4;
            padding: 5px;

            label {
                font-size: 16px;
                font-weight: 400;
            }

            p {
                text-transform: uppercase;
                word-wrap: break-word;
                font-size: 24px;
                font-weight: 600;
                margin-top: 5px;
                margin-bottom: 10px;
            }
        }

        .id {
            grid-column: span 3;
            margin: auto;
            margin-top: 20px;
            z-index: 100;
            transition: all .2s ease;

            div {    
                padding: 10px 10px;
                width: fit-content;
                border-radius: 2rem;
                border: 3px solid $greyLilac;
                cursor: pointer;
                background: $greyLilac;
                position: relative;
                font-size: 14px;
                
                i {
                    margin-right: 10px;
                }

                .tooltip {         
                    z-index: 100;
                    display: block;
                    position: absolute;
                    background-color: $gold;
                    padding: 8px 15px;
                    border-radius: 3px; 
                    left: 50%;
                    top: -80%;
                    transform: translate(-50%, -50%);
                    width: max-content;
                    opacity: 0;
                    visibility: hidden;
                    font-size: 13px;
                    letter-spacing: .5px;
                    transition: display 5s ease 5s;
                    
                    &:before {
                        content: '';
                        display: block;
                        position: absolute;
                        left: 50%;
                        top: 100%;
                        margin-top: -5px;
                        transform: rotate(45deg);
                        width: 10px;
                        height: 10px;
                        background-color: inherit;
                    }
                }

                &:hover {
                    background: $blackBlue;
                    color: $gold;

                    .tooltip {
                        visibility: visible;
                        opacity: 1;
                    }
                }   
            }
        }

        .code {
            grid-column: span 3;
            margin: auto;
            margin-top: 20px;
            z-index: 100;
            transition: all .2s ease;

            div {    
                padding: 10px 20px;
                width: fit-content;
                border-radius: 2rem;
                cursor: pointer;
                background: $greyLilac;
                border: 3px solid $greyLilac;
                position: relative;
                font-size: 14px;
                
                i {
                    margin-right: 10px;
                }

                .tooltip {         
                    z-index: 100;
                    display: block;
                    position: absolute;
                    background-color: $gold;
                    padding: 8px 15px;
                    border-radius: 3px; 
                    left: 50%;
                    top: -80%;
                    transform: translate(-50%, -50%);
                    width: max-content;
                    opacity: 0;
                    visibility: hidden;
                    font-size: 13px;
                    letter-spacing: .5px;
                    transition: display 5s ease 5s;
                    
                    &:before {
                        content: '';
                        display: block;
                        position: absolute;
                        left: 50%;
                        top: 100%;
                        margin-top: -5px;
                        transform: rotate(45deg);
                        width: 10px;
                        height: 10px;
                        background-color: inherit;
                    }
                }

                &:hover {
                    background: $blackBlue;
                    color: $gold;

                    .tooltip {
                        visibility: visible;
                        opacity: 1;
                    }
                }            
            }
        }

        .login {
            text-transform: capitalize;
        }

        .avatar {
            grid-column: span 2;
            margin: auto;
            padding: 10px;
            width: calc(100% - 20px);
            border-radius: 5px;
        }
    }
}

@media (max-width: 1300px) {
    .content {
        grid-template-columns: repeat(1, 1fr);
        
        .text, .card-user, .search, .onHands {
            grid-column: span 1;
        }
    }
}

@media (min-width: 2200px) {
    .content {
        grid-template-columns: repeat(3, 1fr);
        
        .text {
            grid-column: span 3;
        }

        .card-user {
            grid-column: span 1;
        }

    }
}



@media (min-width: 3000px) {
    .content {
        grid-template-columns: repeat(5, 1fr);
        
        .text {
            grid-column: span 5;
        }

        .card-user {
            grid-column: span 1;
        }

    }
}


@keyframes card {
    0% {
        margin-left: -1500px;
    }
    100% {
        margin-left: 0;
    }
}
</style>

<script>
import NavBar from '../components/NavBar.vue'
import { http } from '../scripts/http'

export default {
    title: 'ADAS | Пользователи',
    data() {
        return {
            users: [],
            search: '',
            num: 0,
        }
    },
    watch: {
        search: function (val) {
            http.post('/admin/users', {search: val}).then(response => {
                this.users = response.data.users
                this.num = this.users.length
                if (response.data.logout) {
                    this.logout()
                }
            })
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')  
            this.$router.push('/')
        }, 
        toEdit(user) {
            localStorage.userEdit = JSON.stringify(user)
            console.log(user)
            this.$router.push({name: 'AdminUsersEdit'})
        },
        notification(text) {       
            let notification = document.getElementById('notification');
            notification.innerHTML = '<i class="far fa-copy"></i>&nbsp;&nbsp;&nbsp;' + text + ' пользователя успешно скопирован';
            notification.addEventListener('click', () => {notification.innerHTML = ''})
            setTimeout(() => {
                notification.innerHTML = '';
            }, 3000)
        },
        deleteUser(_id) {        
            if (confirm(`Удалить пользователя [id: ${_id}]?`)) {                        
                http.post('/admin/users/delete', {_id: _id}).then(() => {
                    http.post('/admin/users').then(response => {
                        this.users = response.data.users
                        if (response.data.logout) {
                            this.logout()
                        }
                    })
                }) 
            } 
        }
    },
    mounted: async function() {     
        http.post('/admin/users', {search: this.search}).then(response => {
            this.users = response.data.users
            this.num = this.users.length
            if (response.data.logout) {
                this.logout()
            }
        })   
    }, 
    components: {
        NavBar
    }, 
    computed: { 
    }
}
</script>