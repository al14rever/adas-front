<template>
    <div class="content">
        <NavBar/>
        <div class="text">Журнал</div>
        <div class="logs" v-if="logs">
            <div class="rows header">
                <div class="item">Пользователь</div>
                <div class="item">Оборудование</div>
                <div class="item">Получил</div>
                <div class="item">Вернул</div>
            </div>
            <div class="rows" v-for="log in logs" v-bind:key="log.id">
                <div class="item">{{log.user}}</div>
                <div class="item">{{log.device}}</div>
                <div class="item">{{log.received}}</div>
                <div class="item">{{log.returned}}</div>
            </div>
            <div class="rows footer"><div class="item"></div></div>
        </div>
        <div class="logs" v-else>
            <div class="rows header">
                <div class="item">Пользователь</div>
                <div class="item">Оборудование</div>
                <div class="item">Получил</div>
                <div class="item">Вернул</div>
            </div>
            <div class="rows">
                <div class="item-full">
                    <div class="loader-text" >Получение данных с сервера...</div>
                    <div class="loader-container">
                        <div class="loader"></div>
                    </div>
                </div>
            </div>
            <div class="rows footer"><div class="item"></div></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$gold: rgb(255, 212, 0);
$blood: rgb(180, 0, 0);

$gradientBlackSteel: linear-gradient(90deg, #22252E 0%, #16171d 100%);

.content {
    position: relative;   
    width: calc(100vw - 130px);
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

    .logs {
        position: relative;
        grid-column: span 2;
        min-width: 900px;
        display: grid;

        .header {
            border-radius: 1.5rem 1.5rem 0 0;

            .item {                
                font-size: 1.2rem !important;
            }
        }

        .rows {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            background: $gradientBlackSteel;

            .item {
                font-size: 1rem;
                margin: auto;
                grid-column: span 1;
                padding: 20px;
            }

            .item-full {
                font-size: 1rem;
                margin: auto;
                height: 300px;
                grid-column: span 4;
                padding: 20px;
            }
        }

        .footer {
            border-radius: 0 0 1.5rem 1.5rem;
            margin-bottom: 20px;
        }
    }
}
</style>

<script>
import NavBar from '../components/NavBar.vue'
import { http } from '../scripts/http'

export default {
    title: 'ADAS | Журнал',
    data() {
        return {
            logs: null
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')  
            this.$router.push('/')
        }
    },
    mounted: async function() {     
        http.post('/logs').then(response => {
            this.logs = response.data.logs
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