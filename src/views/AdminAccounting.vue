<template>
    <div class="content">
        <NavBar/>
        <div class="text">Учёт</div>
        <div class="search">
            <label>Поиск оборудования:</label>
            <input v-model="search" type="text" >
        </div>
        <div class="table">
            <div class="table-body" v-for="device in devices" v-bind:key="device.id">
                <div class="item">
                    <img class="min-img" v-if="device.imgSrc" :src="device.imgSrc">
                    <img class="min-img" v-else src="https://res.cloudinary.com/adas/image/upload/v1604509799/devices/fq1aky4ce0ohry4cmq1k.jpg">
                    <img class="big-img" v-if="device.imgSrc" :src="device.imgSrc">
                    <img class="big-img" v-else src="https://res.cloudinary.com/adas/image/upload/v1604509799/devices/fq1aky4ce0ohry4cmq1k.jpg">
                </div>
                <div class="item">
                    <div class="name">{{device.name}}</div>
                    <div class="about">{{device.about}}</div>
                    <div class="type">{{device.type}}</div>
                </div>
                <div class="item list">
                    <div class="list-header">
                        <div class="element"><i class="fas fa-location-arrow"></i></div>
                        <div class="element"><i class="fas fa-qrcode"></i>&nbsp;Код</div>
                        <div class="element">Примечание</div>
                        <div class="element"><i class="fas fa-exclamation-circle"></i></div>
                    </div>
                    <form class="list-add" @submit.prevent="add(device._id)">
                        <select v-model="place" required>
                            <option value="404" selected>404</option>
                            <option value="707">707</option>
                        </select>
                        <input class="element" v-model="code" readonly>
                        <input class="element" v-model="note">
                        <div class="actions">
                            <button><i class="fas fa-plus"></i></button>
                        </div>
                    </form>
                    <form class="list-body" v-for="acc in device.accounting" v-bind:key="acc.id" @submit.prevent="">
                        <select v-if="acc.place == 404" v-model="acc.place" required>
                            <option value="404" selected>404</option>
                            <option value="707">707</option>
                        </select>
                        <select v-else v-model="acc.place" required>
                            <option value="404">404</option>
                            <option value="707" selected>707</option>
                        </select>
                        <input class="element" v-model="acc.code" readonly>
                        <input class="element" v-model="acc.note">
                        <div class="actions">
                            <form @submit.prevent="edit(acc._id, acc.place, acc.note)"><button><i class="fas fa-save"></i></button></form>
                            <form @submit.prevent="del(acc._id)"><button><i class="fas fa-trash-alt delete"></i></button></form>
                            <form @submit.prevent="addToPrint(acc, device)"><button><i class="fas fa-print"></i></button></form>
                        </div>                        
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$gold: rgb(255, 212, 0);
$blood: rgb(180, 0, 0);
$grass: rgb(126, 200, 80);
$blacktrans: rgba(0, 0, 0, 0.4);
$lime: rgb(247, 255, 142);
$gray: rgb(37, 35, 35);

$gradientBlackSteel: linear-gradient(90deg, #22252E 0%, #16171d 100%);


.content {
    position: relative;   
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

    .table {
        display: grid;
        width: 100%;

        animation: card 0s ease;

        .table-body {            
            display: grid;
            grid-template-columns: 100px 1fr 2fr;
            margin-bottom: 10px;
            background: $blacktrans;
            border: 1px solid $grass;
            border-radius: 1.2rem;
            min-height: 200px;

            .item {
                padding: 10px;
                position: relative;

                &:hover {

                    .big-img {
                        visibility: visible;
                        opacity: 1;
                    }
                }
            }

            .min-img {
                position: relative;
                width: 90px;
                margin: auto;
                cursor: pointer;
                border-radius: 50%;
            }

            .big-img {
                visibility: hidden;
                opacity: 0;
                position: absolute;
                z-index: 100;
                width: 250px;
                top: -50px;
                left: 110px;
                transition: all .25s ease;
                border-radius: 1.2rem;
            }

            .name {                
                font-size: 24px;
                margin-bottom: 10px;
            }

            .about {
                display: block;
                font-weight: lighter;
                text-align: justify;
                max-height: 120px;
                overflow: auto;
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

            .list {
                display: grid;
                margin: 10px;
                max-height: 300px;
                padding: 20px 0;
                overflow: auto;

                > div, form {
                    display: grid;
                    grid-template-columns: 70px 200px 1fr 80px;
                    height: fit-content;
                    text-align: center;
                    margin-bottom: 10px;

                    > input {
                        outline: none;
                        background: transparent;
                        border-radius: 1.2rem;
                        border: 1px solid $gold;
                        padding: 10px;
                        color: $gold;
                        font-size: 1.1rem;
                        margin-right: 10px;

                        &:hover, &:active, &:focus {
                            outline: none;
                            border-bottom: 1px solid $lime;
                            color: white;
                        }
                    }

                    > select {
                        outline: none;
                        background: transparent;
                        border-radius: 1.2rem;
                        border: 1px solid $gold;
                        margin-right: 10px;
                        color: $gold;
                        font-size: 1.1rem;

                        > option {
                            background: $gray;
                        }
                    }

                    > .actions {
                        
                        form {
                            display: inline-block;
                        }
                        
                        button {
                            background: transparent;
                            border: none;
                            color: $grass;
                            padding: 5px;
                            cursor: pointer;
                                font-size: 18px;

                            &:hover {
                                font-size: 22px;
                                padding: 3px;
                            }
                        }

                        .delete {
                            color: $blood;
                        }
                    }
                }
            }
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
    title: 'ADAS | Оборудование',
    data() {
        return {
            devices: null,
            code: new Date().getTime()+'0'+(new Date().getSeconds()+10),
            place: '',
            search: '',
            note: ''
        }
    },
    watch: {
        search: function (val) {
            http.post('/admin/accounting', {search: val}).then(response => {
                this.devices = response.data.devices
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
        add(device_id) {
            http.post('/admin/accounting/add', {place: this.place, code: this.code, note: this.note, device_id: device_id}).then(response => {
                this.code = new Date().getTime()+'0'+(new Date().getSeconds()+10)
                this.place = '',
                this.note = ''
                if (response.data.logout) {
                    this.logout()
                }  
                http.post('/admin/accounting').then(response => {
                    this.devices = response.data.devices
                    if (response.data.logout) {
                        this.logout()
                    }
                }) 
            })
            this.$swal({
                icon: "success",
                position: 'top-end',
                text: 'Добавленно',
                backdrop: false,
                toast: true,
                showConfirmButton: false,
                timer: 900,
                timerProgressBar: true
            });
        },
        addToPrint(device, deviceName) {
            // localStorage.removeItem('devices')
            // console.log(device + deviceName.name)  
            // console.log(localStorage.devices)
            // console.log(localStorage.devices.replace(/]/i, ','))
            // localStorage.devices = localStorage.devices.replace(/]/i, ',')
            // console.log(localStorage.devices)
            
             
            device.name = deviceName.name
            device.orientation = 'portrait'
            device.size = 'middle'
            if (!localStorage.devices) {             
                localStorage.devices = []                
                localStorage.devices += '[' + JSON.stringify(device)
            } else if (localStorage.devices[localStorage.devices.length-1]==']') { 
                localStorage.devices = localStorage.devices.replace(/]/i, ',')
                localStorage.devices += JSON.stringify(device)
            } else {
                localStorage.devices += ',' + JSON.stringify(device)
            }
            this.$swal({
                icon: "success",
                position: 'top-end',
                text: 'Добавленно в печать',
                backdrop: false,
                toast: true,
                showConfirmButton: false,
                timer: 900,
                timerProgressBar: true
            });
        },
        edit(_id, place, note) {
            http.post('/admin/accounting/edit', {place: place, note: note, _id: _id}).then(response => {
                this.code = new Date().getTime()+'0'+(new Date().getSeconds()+10)
                this.place = '',
                this.note = ''
                if (response.data.logout) {
                    this.logout()
                }  
                http.post('/admin/accounting').then(response => {
                    this.devices = response.data.devices
                    if (response.data.logout) {
                        this.logout()
                    }
                }) 
            })
            this.$swal({
                icon: "success",
                position: 'top-end',
                text: 'Изменено',
                backdrop: false,
                toast: true,
                showConfirmButton: false,
                timer: 900,
                timerProgressBar: true
            });
        },
        del(_id) {
            http.post('/admin/accounting/delete', {_id: _id}).then(response => {
                if (response.data.logout) {
                    this.logout()
                }  
                http.post('/admin/accounting').then(response => {
                    this.devices = response.data.devices
                    if (response.data.logout) {
                        this.logout()
                    }
                }) 
            })
            this.$swal({
                icon: "warning",
                position: 'top-end',
                text: 'Удалено',
                backdrop: false,
                toast: true,
                showConfirmButton: false,
                timer: 900,
                timerProgressBar: true
            });
        }
    },






    created : function() {     
        //const savedState = JSON.parse(localStorage.getItem('dev') || 'null'); 
        /*
        //if (JSON.parse(localStorage.getItem('test')) != null) {
            this.devices = JSON.parse(localStorage.getItem('test'));
            //this.logout()
            this.$swal({
                position: 'center',
                icon: 'info',
                title: '1',

                width: 600,
                timerProgressBar: true,
                showConfirmButton: false,
                timer: 1000
            })

        //}*/
        //console.log(localStorage.getItem('test'))

        if (this.devices == null) { 
            http.post('/admin/accounting').then(response => {
                this.devices = response.data.devices
                if (response.data.logout) {
                    this.logout()
                }
            })
            
        }  
        
    }, 
    beforeDestroy() {

        localStorage.setItem('test', this.devices);
        //localStorage.setItem(, JSON.stringify('dev')); 

        
    },
    components: {
        NavBar
    }
}
</script>