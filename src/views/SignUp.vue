<template>
    <div class="container">
        <div class="nav">
            <router-link class="nav-back" to="/">&#8249;&nbsp;Назад</router-link>
        </div>
        <form class="form" @submit.prevent="signup">
            <div class="form-head">
                <h3>Регистрация.</h3>
                <p>Мы любим новых пользователей &#128150;</p>
            </div>
            <div class="form-inputs">
                <label for="login" class="error" v-if="errorType == 'login'">&#129333; {{ error }}</label>
                <label for="login" v-else>&#129333; Логин</label><br>
                <input type="text" name="" v-model="login" required/><br>

                <label for="about" class="error" v-if="errorType == 'about'">&#129333; {{ error }}</label>
                <label for="about" v-else>&#128195; ФИО, № группы</label><br>
                <input type="text" v-model="about" required autocomplete="off"/><br>

                <label for="password" class="error" v-if="errorType == 'password'">&#128274; {{ error }}</label>
                <label for="password" v-else>&#128274; Пароль</label><br>
                <input type="password" v-model="password" onKeyUp="this.value = this.value.replace(/[^a-zA-Z0-9@?!,.#]/,'');" required/><br>
            </div>
            <div class="form-inputs">
                <label for="eMail" class="error" v-if="errorType == 'eMail'">&#129333; {{ error }}</label>
                <label for="eMail" v-else>&#129333; E-mail</label><br>
                <input type="email" name="" v-model="eMail" required/><br>

                <label for="phone" class="error" v-if="errorType == 'phone'">&#129333; {{ error }}</label>
                <label for="phone" v-else>&#128195; Телефон</label><br>
                <input type="tel" v-model="phone" required autocomplete="off"/><br>

                <label for="password" class="error" v-if="errorType == 'password'">&#128274; {{ error }}</label>
                <label for="password" v-else>&#128274; Повторите пароль</label><br>
                <input type="password" v-model="password2" onKeyUp="this.value = this.value.replace(/[^a-zA-Z0-9@?!,.#]/,'');" required/><br>
            </div>
            <div class="form-inputs span-2">
                <label class="loose">Пароль должен сосотоять как минимум из 8 латинских букв, цифр или знаков @?!,.#</label><br>
                <button>Завершить регистрацию</button><br>
                <label>У Вас уже есть аккаунт? </label><router-link to="/signin">Войти в систему</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import { http } from '../scripts/http'

export default {
    title: 'ADAS | Регистрация',
    data() {
        return {
            login: '',
            password: '',
            password2: '',
            about: '',
            eMail: '',
            phone: '',
            error: '',
            errorType: '',
        }
    },
    methods: {
        checkPass: function() {
            if (this.password != this.password2) {
                this.error = 'Пароли не совпадают.';
                this.errorType = 'password'
                return false
            } else {
                return true
            }
        },
        signup: function() {
            if (this.checkPass()) {
                let data = {
                    login: this.login,
                    password: this.password,
                    about: this.about, 
                    eMail: this.eMail,
                    phone: this.phone
                }
                http.post('/signup', data).then(response => {
                    let res = response.data.response
                    if (res.error) { this.errorType = res.errorType; this.error = res.error; }
                    else { this.errorType = ''; this.error = '' }
                    if (res.status == 200) {              
                        this.$router.push('/')
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        }
    }, 
}
</script>

<style lang="scss" scoped>
$dark: rgb(29, 29, 29);
$ldark: rgb(49, 49, 49);
$blacktrans: rgba(0, 0, 0, 0.4);
$pink: rgb(255, 134, 134);
$overdark: rgb(15, 15, 15);
$gray: rgb(37, 35, 35);
$turquoise: rgb(0, 126, 199);
$midnightBlue: rgb(16, 0, 104);



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
    height: 600px;
    min-width: 800px;

    display: grid;
    grid-template-columns: repeat(2, 1fr);

    animation: form-in 2s ease-in-out;

    box-shadow: -5px 3px 25px $blacktrans;
}

.form-head {
    grid-column: span 2;
    text-align: center;
    margin-top: 25px;
    font-size: 2.2rem;
    animation: for 2s ease-in-out;

    > p {        
        margin-top: 20px;
        font-size: 1.2rem;
        font-weight: lighter;
    }
}

.span-2 {
    grid-column: span 2 !important;
    text-align: center !important;
}

.form-inputs {
    grid-column: span 1;
    margin: 0 20px;
    font-size: 2rem;
    animation: for 2s ease-in-out;
    text-align: left;

    > .error {
        color: $pink;
    }

    > input {
        outline: none;
        width: 480px;
        height: 40px;
        border: 1px solid $overdark;
        border-radius: .2rem;
        background: $gray;
        font-size: 1.2rem;
        padding: 5px;
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
        height: 600px;
        min-width: 20px;
        width: 20px;
    }
    75% {
        min-width: 1066px;
    }
    100% {
        min-width: 1066px;
    }
}


@keyframes for {
    0% {
        opacity: 0;
    }
    90% {
        opacity: 0
    }
    100% {
        opacity: 1;
    }
}
</style>