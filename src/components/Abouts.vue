<template>
    <div class="cards">
        <div class="card-4">
            <h1>О приложении</h1>
        </div>
        <div class="card-5">
            <div class="text">
                <p class="big">ADAS – Автоматизированная Система Учета Оборудования.</p>
                <p>Приложение является ключевой частью систмемы ADAS, здесь вы можете зарегистрироваться, чтобы получить индивидуальный номер,
                который необходим для дальнейшего взаимодействия с системой, получить информацию о доступном оборудовани.</p>
            </div>
            <div class="text">
                <p class="mid">Наша система предоставляет:</p>
                <p>1. Автоматизированный учет (ведение журнала).</p>
                <p>2. Удобнаю систему идентификации пользователей (индивидуальные номера).</p>
                <p>3. Средства работы с инвентарными номерами (генератор QR-кодов устройств для удобной печати).</p>
                <p>4. Внятный пользовательский интерфейс.</p>
            </div>
        </div>        
    </div>
</template>

<style lang="scss" scoped>
.cards {
    position: relative;
    width: 100%;
}

.card-4 {
    position: relative;
    font-size: 2rem;
    font-weight: bold;
    height: 15vh;
    text-align: center;
    background: rgb(42, 42, 42);
    color: white;

    > h1 {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

.card-5 {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    font-size: 1.5rem;
    font-weight: normal;
    height: 50vh;
    text-align: center;

    > .text {
        grid-column: span 1;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 15px;
        text-align: left;

        > .big {
            font-weight: bold;
            font-size: 2.5rem;
            margin-bottom: 30px;
            color:rgb(195, 26, 26);
        }

        > .mid {
            font-weight: bold;
            font-size: 2rem;
            margin-bottom: 15px;
            color:rgb(195, 26, 26);
        }

        > p {
            line-height: 1.5;
        }
    }
}
</style>