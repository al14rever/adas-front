<template>
    <div class="content">
        <NavBar/>
        <div class="text">Оборудование</div>
        <form class="card-edit" @submit.prevent="edit">
            <form class="card-header" id="dropArea" @submit.prevent="">
                <div class="upload" id="loader">
                    <div class="center">
                        <div><button class="upload" id="uploadButton" onclick="document.getElementById('upload').click()"><i class="fas fa-upload"></i>Загрузить</button></div>
                    </div>
                </div>      
                <input type="file" id="upload" hidden onchange="handleFiles(this.files)" accept="image/*" >          
                <img src="https://res.cloudinary.com/adas/image/upload/v1604509799/devices/fq1aky4ce0ohry4cmq1k.jpg" id="img">
            </form>
            <div class="card-info">
                <input type="hidden" id="_id" v-model="id">
                <input type="text" class="name" v-model="name" id="name" placeholder="Наименование" required>
                <textarea type="text" class="about" v-model="about" id="about" placeholder="Описание, не более 500 символов" maxlength="500" required></textarea>
                <input type="text" class="type" v-model="type" id="type" placeholder="Тип" required>
                <button class="save"><i class="fas fa-save"></i>Сохранить</button>
            </div>
        </form>

        
        <div class="card" v-for="device in devices" v-bind:key="device.id">
            <div class="card-over">
                <div class="center">
                    <form @submit.prevent="editDevice(device)"><button class="edit"><i class="fas fa-edit"></i>Изменить</button></form>
                    <form @submit.prevent="deleteDevice(device._id)"><button class="delete"><i class="fas fa-trash-alt"></i>Удалить</button></form>
                </div>
            </div>
            <div class="card-header">    
                <img v-if="device.imgSrc" :src="device.imgSrc">
                <img v-else src="https://res.cloudinary.com/adas/image/upload/v1604509799/devices/fq1aky4ce0ohry4cmq1k.jpg">
            </div>
            <div class="card-info">
                <p>{{device.name}}</p>
                <span>{{device.about}}</span>
                <div class="type">{{device.type}}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$gold: rgb(255, 212, 0);
$blood: rgb(180, 0, 0);
$grass: rgb(126, 200, 80);
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

        animation: card 0s ease;

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

        .card-over {
            z-index: 100;
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
                grid-template-columns: repeat(1, 1fr);
                
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
                        margin-bottom: 20px;

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
        }
    }

    .card-edit {
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        max-width: 300px;
        background: $gradientBlackSteel;
        border-radius: 1.2rem;
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        transition: all 100ms ease;
        margin: 5px;
        margin-bottom: 20px;

        animation: card 1s ease;

        .card-header {
            position: relative;
            height: 300px;

            > img {
                width: 100%;
                margin: auto;
                border-radius: 1.2rem 1.2rem 0 0;
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
                border-radius: 1.2rem 1.2rem 0 0 ;
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

        .card-info {
            position: relative;
            
            > .name {
                outline: none;
                width: 260px;
                height: 35px;
                border: none;
                color: white;
                border-bottom: 1px solid $gold ;
                background: transparent;
                padding: 0 20px;
                font-size: 18px; 
            }

            > .about {
                outline: none;
                border: none;
                height: 150px;
                width: 260px;
                font-family: 'Commissioner', sans-serif;
                font-weight: lighter;
                text-align: justify;
                resize: none;
                padding: 10px 20px;
                font-size: 16px;
                color: white;
                border-bottom: 1px solid $gold ;
                background: transparent;
            }

            > .type {
                outline: none;
                width: 260px;
                height: 30px;
                border: none;
                color: white;
                border-bottom: 1px solid $gold ;
                background: transparent;
                padding: 0 20px;
                font-weight: bold;
                color: $grass;
                font-size: 16px; 
            }

            > .save {
                position: absolute;
                left: 50%;
                bottom: 0;
                transform: translate(-50%, -50%);
                grid-column: span 1;
                background: $blacktrans;
                padding: 5px 20px;
                font-size: 1rem;
                font-weight: 700;
                color: $grass;
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
    title: 'ADAS | Оборудование',
    data() {
        return {
            devices: null,
            id: '',
            imgSrc: '',
            name: '',
            about: '',
            type: ''
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')  
            this.$router.push('/')
        },
        edit: function() {
            let data = {
                name: this.name,
                about: this.about,
                type: this.type
            }
            if (document.getElementById('img').src != 'https://res.cloudinary.com/adas/image/upload/v1604509799/devices/fq1aky4ce0ohry4cmq1k.jpg')  data.imgSrc = document.getElementById('img').src
            if (this.id) data._id = this.id
            http.post('/admin/devices/edit', data).then(() => {
                document.getElementById('img').src = 'https://res.cloudinary.com/adas/image/upload/v1604509799/devices/fq1aky4ce0ohry4cmq1k.jpg'
                this.name = null
                this.about = null
                this.type = null
                document.getElementById('uploadButton').innerHTML = '<i class="fas fa-upload"></i>Загрузить</button>'
                http.post('/devices').then(response => {
                    this.devices = response.data.devices
                    if (response.data.logout) {
                        this.logout()
                    }
                })
            }).catch((error) => {
                this.$swal({
                    icon: 'error',
                    title: 'Ошибка!'
                });
                console.log(error)
            })
            this.$swal({
                icon: 'success',
                title: 'Изменения приняты!'
            });
        },
        deleteDevice(_id) {
            if (confirm(`Удалить устройство [id: ${_id}]?`)) {
                http.post('/admin/devices/delete', {_id: _id}).then(() => {
                    http.post('/devices').then(response => {
                        this.devices = response.data.devices
                        if (response.data.logout) {
                            this.logout()
                        }
                    })
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
        editDevice(device) {
            this.name = device.name,
            this.about = device.about,
            this.type = device.type,
            document.getElementById('img').src = device.imgSrc,
            this.id = device._id
            http.post('/devices').then(response => {
                this.devices = response.data.devices
                if (response.data.logout) {
                    this.logout()
                }
            })
    }
    },
    mounted: async function() {     
        http.post('/devices').then(response => {
            this.devices = response.data.devices
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