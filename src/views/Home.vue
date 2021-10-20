<template>
    <div class="container">
        <div class="nav">
            <div class="nav-free"></div>
            <router-link class="nav-logo" onclick="window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });" to="/"></router-link>
            <router-link class="nav-2" onclick="window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });" to="/"></router-link>
            
            
            <div class="nav-free"></div>
        </div>
        <Hello/>
        <Abouts/>
    </div>
</template>



<script>
import Hello from '../components/Hello.vue'
import Abouts from '../components/Abouts.vue'

export default {
    title: 'ADAS',
    data() {
        return {
            login: this.$store.getters.LOGIN,
        }
    },
    mounted: function () {            
    },
    components: {
        Hello,
        Abouts
    }
}
</script>

<style lang="scss" scoped>

$heavenly: rgb(225, 229, 255);

.nav {
    position: absolute;
    z-index: 100;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    height: 50px;
    min-width: 960px;
    width: 100%;
    color: white;
    animation: navbar-in 500ms ease-in-out;
    cursor: pointer;

    > a:hover {
        color: $heavenly;
    }
}

.nav-free {
    grid-column: span 2;
    cursor: default;
}

.nav-logo {
    grid-column: span 1;
    font-size: 2.5rem;
    font-weight: bold;
}

.nav-1 {
    grid-column: span 1;
    font-size: 1.2rem;
    margin: auto;
}

.nav-2 {
    grid-column: span 3;
    font-size: 1.2rem;
    margin: auto;
    margin-left: 0;
}


@keyframes navbar-in {
    0% {
        top: -50px;
    }
    100% {
        top: 0;
    }
}
</style>