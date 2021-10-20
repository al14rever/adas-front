<template>
    <div class="content">
        <NavBar/>
        <div class="text">Профиль</div>
        <div class="card-user">
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
        </div>
        <div class="card-qr">
            <img class="qr" id="qr" alt="http://goqr.me/api/">
            <div class="code">
                <div id="code" @click="notification('Индивидуальный код')" onclick="navigator.clipboard.writeText(this.childNodes[0].childNodes[1].innerHTML)">
                    <span><i class="fas fa-qrcode"></i><span id="copyCode">{{user.code}}</span></span>                   
                    <span class="tooltip"><i class="far fa-copy"></i> Копировать индивидуальный код пользователя</span>
                </div>
            </div>
        </div>
        <div class="text">На руках</div>
        <div v-if="onHands" class="onHands">
            <div v-for="item in onHands" v-bind:key="item.id" class="item">Название: {{item.name}} | Аудитория: {{item._doc.place}} | Code: {{item._doc.code}}</div>
        </div>
        <div v-else class="onHands">
            <div class="item" >Пусто</div>
        </div>
        <div id="notification" class="notification"></div>
    </div>
</template>

<style lang="scss" scoped>

$gold: rgb(255, 212, 0);
$blood: rgb(180, 0, 0);
$gray: rgb(56, 55, 59);
$greyLilac: rgb(55, 61, 78);
$blackBlue: rgb(14, 17, 27);

$gradientBlackSteel: linear-gradient(90deg, #22252E 0%, #16171d 100%);  
$gradientBlackPurpure: linear-gradient(90deg, #191d29 0%, #16171d 100%);

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

    .card-user { 
        z-index: 2;
        padding: 20px;
        max-width: 700px;
        background: $gradientBlackSteel; 
        border-radius: 1.2rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        transition: all 100ms ease;
        margin-bottom: 20px;

        animation: card 1s ease;

        .card-header {
            grid-column: span 1;
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 20px;
            text-align: center;

            i {
                font-size: 30px;
            }
        }

        .info  {
            grid-column: span 2;
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
            margin-top: 20px;

            div {    
                padding: 10px 20px;
                width: fit-content;
                border-radius: 2rem;
                cursor: pointer;
                background: $greyLilac; 
                position: relative;
                
                i {
                    margin-right: 10px;
                }


                .tooltip {         
                    z-index: 100;
                    display: block;
                    position: absolute;
                    background-color: $greyLilac;
                    padding: 8px 15px;
                    border-radius: 3px; 
                    left: 50%;
                    top: 170%;
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
                        top: 0;
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
            grid-column: span 1;
            margin: auto;
            padding: 10px;
            width: calc(100% - 20px);
            border-radius: 5px;
        }
    }

    .card-qr {
        z-index: 1;
        grid-column: span 1;
        padding: 20px;
        margin-left: 20px;
        max-width: 310px;
        height: fit-content;
        background: $gradientBlackPurpure; 
        border-radius: 1.2rem;
        display: grid;
        grid-template-columns: 1fr;
        transition: all 100ms ease;

        animation: card-qr 1s ease;

        .qr {
            grid-column: span 1;
            margin-bottom: 20px;
            width: calc(100% - 20px);
            padding: 10px;
        }

        .code {
            grid-column: span 1;

            div {    
                padding: 10px 20px;
                text-align: center;
                border-radius: 2rem;
                cursor: pointer;
                background: $greyLilac;
                position: relative;
                
                i {
                    margin-right: 10px;
                }


                .tooltip {         
                    z-index: 100;
                    display: block;
                    position: absolute;
                    background-color: $greyLilac;
                    padding: 8px 15px;
                    border-radius: 3px; 
                    left: 50%;
                    top: 170%;
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
                        top: 0;
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
    }

    .onHands {
        grid-column: span 2;
        display: grid;
        max-width: 740px;
        margin-bottom: 20px;

        animation: card 1s ease;

        .item {
            grid-row: span 1;
            border-radius: 3rem;
            background: $gradientBlackSteel;
            padding: 20px 30px;
            margin-top: 10px;
        }
    }
}

@media (max-width: 1700px) {
    .content {
        grid-template-columns: repeat(1, 1fr);
        
        .text {
            grid-column: span 1;
        }

        .card-user {
            grid-column: span 1;
        }

        .onHands {
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

@keyframes card-qr {
    0% {
        margin-left: -1500px;
    }
    100% {
        margin-left: 20px;
    }
}
</style>

<script>
import NavBar from '../components/NavBar.vue'
import { http } from '../scripts/http'

export default {
    title: 'ADAS | Профиль',
    data() {
        return {
            user: JSON.parse(this.$store.getters.user) || {},
            onHands: null
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')  
            this.$router.push('/')
        }, 
        notification(text) {       
            let notification = document.getElementById('notification');
            notification.innerHTML = '<i class="far fa-copy"></i>&nbsp;&nbsp;&nbsp;' + text + ' пользователя успешно скопирован';
            notification.addEventListener('click', () => {notification.innerHTML = ''})
            setTimeout(() => {
                notification.innerHTML = '';
            }, 3000)
        }
    },
    mounted: function() {    
        if (!this.user) location.reload()
        //document.getElementById('qr').src = 'https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=' + this.user.code
        document.getElementById('qr').src = 'https://barcode.tec-it.com/barcode.ashx?data=' + this.user.code + '&code=&multiplebarcodes=false&translate-esc=true&unit=Fit&dpi=600&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&codepage=Default&qunit=Mm&quiet=5&hidehrt=False' 
        console.log(this.user._id)
        http.post('/user/onhands', {_id: this.user._id}).then(response => {
            this.onHands = response.data.have
            console.log(response.data.have)
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