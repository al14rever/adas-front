<template>
    <div class="container">
        <div class="nav">
            <router-link class="nav-back" to="/">&#8249;&nbsp;Назад</router-link>
        </div>
        <form class="form" @submit.prevent="signin">
            <div class="form-head">
                <h3>Вход в приложение.</h3>
                <p>Мы рады видеть Вас снова! &#128150;</p>
            </div>
            <div class="form-inputs">
                <label for="login" class="error" v-if="errorType == 'login'">&#129333; {{ error }}</label>
                <label for="login" v-else>&#129333; Логин или e-mail</label><br>
                <input type="text" v-model="login" required/><br>
                <label for="password" class="error" v-if="errorType == 'password'">&#128274; {{ error }}</label>
                <label for="password" v-else>&#128274; Пароль</label><br>
                <input type="password" v-model="password" required/><br>
            </div>
            <div class="form-inputs span-2">
                <label class="loose">Если Вы забыли пароль, то необходимо обраться к администратору.</label><br>
                <button>Вход</button><br>
                <label>У Вас всё ещё нет аккаунта? </label><router-link to="/signup">Зарегистрироваться</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import { http } from '../scripts/http'

export default {
    title: 'ADAS | Авторизация',
    data() {
        return {
            login: '',
            password: '',
            error: '',
            errorType: '',
        }
    },
    methods: {
        signin: function() {
            let data = {
                login: this.login,
                password: this.password
            }
            http.post('/signin', data).then(response => {
                let res = response.data.response
                if (res.error) { this.errorType = res.errorType; this.error = res.error; }
                else { this.errorType = ''; this.error = '' }
                if (res.token) {   
                    if (res.new_password_hash) {
                        localStorage.user_temp = JSON.stringify(res.user)
                        localStorage.token_temp = res.token
                        this.$router.push({name: 'NewPassword', params: {hash: res.new_password_hash}})
                    } else {
                        this.$store.dispatch('login', { user: res.user, token: res.token })    
                        this.$router.push('/profile')
                    }
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
$dark: rgb(29, 29, 29);
$blacktrans: rgba(0, 0, 0, 0.4);
$ldark: rgb(49, 49, 49);
$pink: rgb(255, 134, 134);
$overdark: rgb(15, 15, 15);
$midnightBlue: rgb(16, 0, 104);
$turquoise: rgb(0, 126, 199);
$gray: rgb(37, 35, 35);





.nav {
    position: absolute;
    z-index: 100;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    height: 50px;
    min-width: 960px;
    width: 100%;
    color: white;
    animation: back-in 500ms ease-in-out;
    cursor: pointer;
}

.nav-back {
    grid-column: span 4;
    font-size: 1.8rem;
    font-weight: bold;
    margin: 15px;
    margin-left: 50px;
    animation: back-jump 2s ease-in-out alternate infinite;

    &:hover {
        color: lightgray;
    }
}

.form {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 1rem;
    border: 1px solid $dark;
    background: $ldark;
    height: 550px;
    min-width: 600px;

    animation: form-in 1s ease-in-out;

    box-shadow: -5px 3px 25px $blacktrans;
}

.form-head {
    grid-column: span 2;
    text-align: center;
    margin: 25px;
    font-size: 2.2rem;
    animation: for 1s ease-in-out;

    > p {        
        margin-top: 20px;
        font-size: 1.2rem;
        font-weight: lighter;
    }
}

.span-2 {
    grid-column: span 2 !important;
    margin-left: 20px !important;
    text-align: center !important;
}


.form-inputs {
    grid-column: span 2;
    margin: 20px;
    margin-left: 40px;
    font-size: 2rem;
    animation: for 1s ease-in-out;
    text-align: left;

    > .error {
        color:  $pink;
    }

    > input {
        outline: none;
        width: 500px;
        height: 30px;
        border: 1px solid $overdark;
        border-radius: .2rem;
        background: $gray;
        font-size: 1.2rem;
        padding: 10px;
        color: whitesmoke;
    }

    > button {
        outline: none;
        width: 492px;
        height: 52px;
        margin-top: 10px;
        border: 1px solid $midnightBlue;
        border-radius: .2rem;
        background: $turquoise;
        font-size: 1.2rem;
        color: whitesmoke;
        cursor: pointer;
    }

    > label {
        font-size: 1rem;
        font-weight: lighter;
        text-align: left;
    }

    > a {
        font-size: 1rem;
        color: $turquoise;
    }

    > .loose {
        font-size: 1rem;
        color: $pink;
    }

}

@keyframes back-in {
    0% {
        top: -300px;
    }
    100% {
        top: 0;
    }
}


@keyframes back-jump {
    0% {
        margin-left: 50px;
    }
    100% {
        margin-left: 15px;
    }
}


@keyframes form-in {
    0% {
        height: 0;
        min-width: 20px;
        width: 20px;
        color: $blacktrans;
    }
    35% {        
        height: 550px;
        min-width: 20px;
        width: 20px;
    }
    75% {
        min-width: 600px;
    }
    100% {
        min-width: 600px;
    }
}


@keyframes for {
    0% {
        opacity: 0;
    }
    75% {
        opacity: 0
    }
    100% {
        opacity: 1;
    }
}
</style>