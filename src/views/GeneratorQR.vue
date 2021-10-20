<template>
    <div class="content">
        <NavBar/>
        <div class="page" size="A4" layout="portrait">
            <div class="page-content" id="page">
            </div>
        </div>
        <div class="editBlocks">
            <div class="header">Изменить блоки</div>
            <div class="elements">
                <div class="element">
                    <div class="blocks">
                        <label>Настройки страницы</label>
                    </div>
                    <div class="blocks">
                        <label>Ориентация:</label>
                        <br>
                        <input type="radio" v-on:click="updatePage" value="landscape" id="landscape" v-model="page.orientation">
                        <label for="landscape">Горизонтальная</label>
                        <br>
                        <input type="radio" v-on:click="updatePage" value="portrait" id="portrait" v-model="page.orientation">
                        <label for="portrait">Вертикальная</label>
                    </div>                 
                    <div class="blocks"></div>
                    <div class="blocks" v-if="page.orientation == 'landscape'"><button onclick="savePDF('l')"><i class="fas fa-download"></i> Сохранить как PDF</button></div>
                    <div class="blocks" v-if="page.orientation == 'portrait'"><button onclick="savePDF('p')"><i class="fas fa-download"></i> Сохранить как PDF</button></div>
                </div>
                <div class="element" v-for="(device, index) in devices" v-bind:key="device.id" v-on:click="update">
                    <div class="blocks">
                        <label>Код:</label>
                        <br>
                        <br>
                        <p>{{device.code}}</p>
                    </div>
                    <div class="blocks">
                        <label>Ориентация:</label>
                        <br>
                        <input type="radio" value="landscape" id="landscape" v-model="device.orientation">
                        <label for="landscape">Горизонтальная</label>
                        <br>
                        <input type="radio" value="portrait" id="portrait" v-model="device.orientation">
                        <label for="portrait">Вертикальная</label>
                    </div>
                    <div class="blocks">
                        <label>Название:</label>
                        <br>
                        <br>
                        <p>{{device.name}}</p>
                    </div>
                    <div class="blocks">
                        <label>Размер:</label>
                        <br>
                        <input type="radio" value="small" id="small" v-model="device.size">
                        <label for="small">Маленький</label>
                        <br>
                        <input type="radio" value="middle" id="middle" v-model="device.size">
                        <label for="middle">Средний</label>
                        <br>
                        <input type="radio" value="large" id="large" v-model="device.size">
                        <label for="large">Большой</label>
                    </div>
                    <div class="close" v-on:click="close(index)"><i class="fas fa-times"></i></div>                    
                    <div class="up" v-if="index > 0" v-on:click="up(index)"><i class="fas fa-arrow-up"></i></div>                    
                    <div class="down" v-if="index < devices.length - 1" v-on:click="down(index)"><i class="fas fa-arrow-down"></i></div>                    
                </div>
            </div>
        </div>
    <div class="goToAccounting" v-if="!devices">
        <div class="action">
            <p>Список пуст</p>
            <router-link to="/admin/panel/accounting">Перейти в раздел "Учёт"</router-link>
        </div>
        
    </div>
    </div>
</template>

<style lang="scss" scoped>
$gold: rgb(255, 212, 0);
$blood: rgb(180, 0, 0);
$grass: rgb(126, 200, 80);
$blacktrans: rgba(0, 0, 0, 0.4);

.content {
    position: relative;   
    width: calc(100% - 130px);
    padding-left: 100px;
    padding-right: 20px;
    font-family: 'Exo 2', sans-serif;
    display: grid;
    min-height: fit-content;
    grid-template-columns: 1fr 500px;

    .goToAccounting {
        width: 100vw;
        height: 100vh;
        z-index: 90;
        position: fixed;
        background: $blacktrans;
        margin-left: -20px;

        > .action {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            text-align: center;

            > p {                
                font-size: 2rem;
            }

            > a {
                color: $grass;
                font-size: 3rem;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

    .editBlocks {
        overflow: auto;
        max-height: 100vh;

        .header {
            font-size: 2rem;
            margin: 20px;
            margin-bottom: 10px;
        }

        .elements {


            > .element {
                position: relative;
                padding: 10px 20px;
                background: $blacktrans;
                margin-bottom: 10px;
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: 1fr 1fr;
                
                > .blocks {
                    grid-column: span 1;
                    grid-row: span 1;
                    display: block;

                    > p {
                        font-size: 1.2rem ;
                    }

                    > button {
                        background: transparent;
                        border-radius: 1.2rem;
                        border: 1px solid $grass;
                        color: $grass;
                        cursor: pointer;
                        margin-top: 10px;
                        padding: 5px 10px;
                        outline: none;

                        &:hover {
                            color: white;
                            background: $grass;
                        }
                    }

                }

                > .close {
                    position: absolute;
                    cursor: pointer;
                    top: 10px;
                    right: 10px;

                    &:hover {
                        color: lightgray;
                    }
                }

                > .up {
                    position: absolute;
                    cursor: pointer;
                    top: 30px;
                    right: 10px;

                    &:hover {
                        color: lightgray;
                    }
                }

                > .down {
                    position: absolute;
                    cursor: pointer;
                    top: 50px;
                    right: 10px;

                    &:hover {
                        color: lightgray;
                    }
                }
            }
        }
    }

    .page {
        background: white;
        display: block;
        margin: 20px auto;
        margin-bottom: 0.5cm;
        box-shadow: 0 0 0.5cm $blacktrans;
        color: black;
    }

    .page[size="A4"][layout="portrait"] {  
        width: 21cm;
        height: 29.7cm;         

        .page-content {
            margin: 1.5cm 1.5cm;
            display: grid;
            grid-template-columns: repeat(18, 1cm);
            grid-template-rows: repeat(27, 1cm);
        }
    }
    
    .page[size="A4"][layout="landscape"] {
        width: 29.7cm;
        height: 21cm;          

        .page-content {
            margin: 1.5cm 1.5cm;
            display: grid;
            grid-template-columns: repeat(27, 1cm);
            grid-template-rows: repeat(18, 1cm);
        }
    }
}
</style>

<script>
import NavBar from '../components/NavBar.vue'
// import { jsPDF } from 'jspdf'
// import { http } from '../scripts/http'


export default {
    title: 'ADAS | Настройка пользователей',
    data() {
        return {
            devices: null,
            page: {
                orientation: 'portrait'
            }
        }
    },
    methods: {
        swap(arr, a, b) {
            arr[a] = arr.splice(b, 1, arr[a])[0];
        },
        close(device) {
            this.devices.splice(device, 1)
            this.update()  
            if (this.devices.length < 1) this.devices = null          
        },
        up(index) {
            this.swap(this.devices, index, index - 1)
        },
        down(index) {
            this.swap(this.devices, index, index+1)            
        },
        updatePage() {
            setTimeout(() => {
                let page = document.getElementsByClassName('page')
                page[0].setAttribute('layout', this.page.orientation)
                localStorage.page = JSON.stringify(this.page)
            }, 100)
            
        },
        update() {
            setTimeout(this.updateE, 300)
        },
        updateE() {
            if (!this.devices) localStorage.removeItem('devices')
            else localStorage.devices = JSON.stringify(this.devices)
            let page = document.getElementById('page')
            page.innerHTML = ''

            try {
                for (let i = 0; i < this.devices.length; i++) {
                    let g = document.createElement('div')
                    let c = document.createElement('img')
                    let t = document.createElement('div')  

                    g.id = this.devices[i]._id
                    g.style.outline = '1px solid black'
                    
                    if (this.devices[i].orientation == 'landscape' && this.devices[i].size == 'small') {
                        g.classList.add('column-6')
                        g.classList.add('row-3')
                        g.style.display = 'grid'
                        g.style.gridTemplateColumns = '2fr 3fr'
                        
                        c.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + this.devices[i].code
                        c.style.display = 'block'
                        c.style.margin = 'auto'
                        c.style.width = '2cm'

                        t.innerHTML = '<p style="font-size: .7rem;">Название: </p><p style="font-size: .7rem;">' + this.devices[i].name + '</p><br><p style="font-size: .7rem;">Код: </p><p style="font-size: .7rem;">' + this.devices[i].code + '</p>'
                        t.style.margin = '20px 10px'                    
                        t.style.wordWrap = 'break-word'
                    } else if (this.devices[i].orientation == 'landscape' && this.devices[i].size == 'middle') {
                        g.classList.add('column-9')
                        g.classList.add('row-4')
                        g.style.display = 'grid'
                        g.style.gridTemplateColumns = '2fr 3fr'
                        
                        c.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + this.devices[i].code
                        c.style.display = 'block'
                        c.style.margin = 'auto'
                        c.style.width = '3cm'

                        t.innerHTML = '<p style="font-size: .7rem;">Название: </p><p style="font-size: 1.3rem;">' + this.devices[i].name + '</p><br><p style="font-size: .7rem;">Код: </p><p style="font-size: 1.3rem;">' + this.devices[i].code + '</p>'
                        t.style.margin = '20px 10px'                    
                        t.style.wordWrap = 'break-word'
                    } else if (this.devices[i].orientation == 'landscape' && this.devices[i].size == 'large') {
                        g.classList.add('column-18')
                        g.classList.add('row-6')
                        g.style.display = 'grid'
                        g.style.gridTemplateColumns = '2fr 3fr'
                        
                        c.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + this.devices[i].code
                        c.style.display = 'block'
                        c.style.margin = 'auto'
                        c.style.width = '5cm'

                        t.innerHTML = '<p style="font-size: 1.2rem;">Название: </p><p style="font-size: 2rem;">' + this.devices[i].name + '</p><br><p style="font-size: 1.2rem;">Код: </p><p style="font-size: 2rem;">' + this.devices[i].code + '</p>'
                        t.style.margin = '20px 10px'                    
                        t.style.wordWrap = 'break-word'
                    } else if (this.devices[i].orientation == 'portrait' && this.devices[i].size == 'small') {
                        g.classList.add('column-4')
                        g.classList.add('row-4')
                        
                        c.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + this.devices[i].code
                        c.style.display = 'block'
                        c.style.margin = '10px auto'
                        c.style.width = '2cm'

                        t.innerHTML = '<p style="font-size: .5rem;">Название: </p><p style="font-size: .7rem;">' + this.devices[i].name + '</p><p style="font-size: .5rem;">Код: </p><p style="font-size: .7rem;">' + this.devices[i].code + '</p>'
                        t.style.margin = '10px 20px'                    
                        t.style.wordWrap = 'break-word'
                    } else if (this.devices[i].orientation == 'portrait' && this.devices[i].size == 'middle') {
                        g.classList.add('column-6')
                        g.classList.add('row-6')
                        
                        c.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + this.devices[i].code
                        c.style.display = 'block'
                        c.style.margin = '10px auto'
                        c.style.width = '3cm'

                        t.innerHTML = '<p style="font-size: .7rem;">Название: </p><p style="font-size: 1rem;">' + this.devices[i].name + '</p><p style="font-size: .7rem;">Код: </p><p style="font-size: 1rem;">' + this.devices[i].code + '</p>'
                        t.style.margin = '10px 20px'                    
                        t.style.wordWrap = 'break-word'
                    } else if (this.devices[i].orientation == 'portrait' && this.devices[i].size == 'large') {
                        g.classList.add('column-8')
                        g.classList.add('row-8')
                        
                        c.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + this.devices[i].code
                        c.style.display = 'block'
                        c.style.margin = '10px auto'
                        c.style.width = '5cm'

                        t.innerHTML = '<p style="font-size: .7rem;">Название: </p><p style="font-size: 1rem;">' + this.devices[i].name + '</p><p style="font-size: .7rem;">Код: </p><p style="font-size: 1rem;">' + this.devices[i].code + '</p>'
                        t.style.margin = '10px 20px'                    
                        t.style.wordWrap = 'break-word'
                    }


                    page.append(g)
                    g.prepend(c)          
                    c.after(t)
                }
            } catch {
                return
            }
        }
    },
    mounted: function() {
        // localStorage.removeItem('pages')
        if (localStorage.page){ 
            this.page = JSON.parse(localStorage.page)
            this.updatePage()

        }
        else 
            this.page = {
                orientation: 'portrait'
            }

        try {
            if (localStorage.devices.length <= 2) {
                localStorage.removeItem('devices')
            } else if (localStorage.devices[localStorage.devices.length-1] == ']') {
                this.devices = JSON.parse(localStorage.devices)     
            } else {
                this.devices = JSON.parse(localStorage.devices + ']')
            }
        
            this.update()
        } catch {
            return
        }
    },
    components: {
        NavBar
    }
}

</script>