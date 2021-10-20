<template>
    <div class="content">
        <NavBar/>
        <div class="text">Оборудование ({{num}})</div>
        <div class="search">
            <label>Поиск оборудования:</label>
            <input v-model="search" type="text" >
        </div>
        <div class="card" v-for="device in devices" v-bind:key="device.id">
            <div class="card-header">    
                <img v-if="device.imgSrc" :src="device.imgSrc">
                <img v-else src="https://res.cloudinary.com/adas/image/upload/v1604509799/devices/fq1aky4ce0ohry4cmq1k.jpg">
            </div>
            <div class="card-info">
                <p>{{device.name}}</p>
                <span>{{device.about}}</span>
                <div class="type">{{device.type}}</div>
            </div>
            <div class="place404">В аудитории 404: <span v-if="device.accounting404">{{device.accounting404}}</span><span v-else>нет</span></div>
            <div class="place707">В аудитории 707: <span v-if="device.accounting707">{{device.accounting707}}</span><span v-else>нет</span></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$gold: rgb(255, 212, 0);
$blood: rgb(180, 0, 0);
$grass: rgb(126, 200, 80);
$sky: rgb(135, 206, 235);
$blacktrans: rgba(0, 0, 0, 0.4);

$gradientBlackSteel: linear-gradient(90deg, #22252E 0%, #16171d 100%);

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
    
    .search {        
        grid-column: span 4;
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
    
    .card {
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        width: 300px;
        background: $gradientBlackSteel;
        border-radius: 1.2rem;
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        transition: all 100ms ease;
        margin: 5px;
        margin-bottom: 20px;
        cursor: pointer;

        animation: card 1s ease;

        .card-header {
            position: relative;
            grid-column: span 1;
            height: 300px;

            > img {
                width: 100%;
                margin: auto;
                border-radius: 1.2rem 1.2rem 0 0;
            }
        }

        .place404 {
            position: absolute;
            border-radius: 1.2rem;
            margin-top: 10px;
            background: $blacktrans;
            color: $sky;
            top: 10px;
            left: 10px;
            width: fit-content;
            height: fit-content;
            padding: 0 10px 5px;
        }

        .place707 {
            position: absolute;
            border-radius: 1.2rem;
            margin-top: 10px;
            background: $blacktrans;
            color: $grass;
            top: 40px;
            left: 10px;
            width: fit-content;
            height: fit-content;
            padding: 0 10px 5px;
        }

        .card-info {
            display: grid;
            padding: 10px;
            height: fit-content;

            > p {                
                font-size: 24px;
                margin-bottom: 10px;
            }

            > span {
                font-weight: lighter;
                text-align: justify;
            }

            .type {
                border-radius: 1.2rem;
                margin-top: 10px;
                background: $blacktrans;
                color: $grass;
                width: fit-content;
                height: fit-content;
                padding: 0 10px 5px;
            }
        }

        
    }
}
@media (max-width: 1200px) {
    .content {
        grid-template-columns: repeat(2, 1fr);
        
        .text {
            grid-column: span 2;
        }

        .card-user {
            grid-column: span 1;
        }

    }
}

@media (min-width: 2000px) {
    .content {
        grid-template-columns: repeat(6, 1fr);
        
        .text {
            grid-column: span 6;
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
        margin-left: 5px;
    }
}
</style>

<script>
import NavBar from '../components/NavBar.vue'
import { http } from '../scripts/http'

export default {
    title: 'ADAS | Поиск оборудования',
    data() {
        return {
            devices: null,
            num: 0,
            search: ''
        }
    },
    watch: {
        search: function (val) {
            http.post('/devices/search', {search: val}).then(response => {
                this.devices = response.data.devices
                this.num = this.devices.length
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
    },
    mounted: async function() {     
        http.post('/devices/search', {search: this.search}).then(response => {
            this.devices = response.data.devices
            this.num = this.devices.length
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