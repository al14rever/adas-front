<template>
    <div class="cards">
        <div class="card-header">
            <div class="text">
                <h1>Приветствуем в системе ADAS!</h1>
                <router-link class="btn-white" to='/signin'>Войти в приложение</router-link>
                <router-link class="btn-black" to='/signup'>Стать новым пользователем</router-link>
            </div>
        </div>
        <div class="card-next">
            <div class="text">
                <p class="big">Приложение доступно только для зарегистрированных пользователей.</p>
                <p>Вы можете зарегистрироваться самостоятельно и дождаться подтверждения аккаунта администрацией.</p>
                <p>Обычно процесс потверждения занимает не более суток.</p>
            </div>
        </div>
        
    </div>
</template>

<style lang="scss" scoped>
.cards {
    position: relative;
    width: 100%;
}

.card-header {
    position: relative;
    background: rgb(42, 42, 42);
    font-size: 2rem;
    height: 65vh;
    text-align: center;
    animation: head 500ms ease-in-out;

    > div {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        > h1 {
            margin-bottom: 100px;
        }

        > .btn-white {
            font-size: 1.2rem;
            border-radius: 3rem;
            background: rgb(255, 253, 255);
            color: rgb(0, 0, 0);
            padding: 25px;
            margin: 20px;
            transition: all 200ms ease-in-out;

            &:hover {
                background: rgb(218, 216, 218);
                color: rgb(0, 10, 10);
                box-shadow: 0 0 25px rgba(63, 63, 63, 0.301);
            }
        }

        > .btn-black {
            font-size: 1.2rem;
            border-radius: 3rem;
            background: rgb(195, 26, 26); //красный
            color: rgb(255, 255, 255);
            padding: 25px;
            transition: all 200ms ease-in-out;

            &:hover {
                background: rgb(165, 2, 17);
                box-shadow: 0 0 25px rgba(0, 0, 0, 0.322);
            }
        }
    }
}

.card-next {
    position: relative;
    font-size: 1.5rem;
    font-weight: bold;
    height: 50vh;
    text-align: center;
    animation: bottom 500ms ease-in-out;
    background: rgb(195, 26, 26);
    color: black;

    > .text {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        > .big {
            font-weight: bold;
            font-size: 3rem;
            margin-bottom: 50px;
        }
    }
}

.card-3 {
    position: relative;
    font-size: 1.5rem;
    font-weight: bold;
    height: 50vh;
    text-align: center;
    background: rgb(218, 216, 218);
    color: black;

    > .text {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        > .big {
            font-weight: bold;
            font-size: 3rem;
            margin-bottom: 50px;
        }
    }
}

@keyframes head {
    0% {
        top: -400px;
        opacity: 0;
    }
    30% {
        opacity: 1;
    }
    100% {
        top: 0;
        opacity: 1;
    }
}

@keyframes bottom {
    0% {
        margin-top: 50vh;
        opacity: 0;
    }
    100% {
        left: 0;
        opacity: 1;
    }
}
</style>