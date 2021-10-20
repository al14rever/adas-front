<template>
    <nav class="sidebar-navigation" id="leftMenu" v-if="isAdmin">
        <div> 
            <div class="menu" @click="leftMenu">
                <i class="fas fa-bars"></i>
                <label>Меню</label>
                <span class="tooltip">Развернуть меню</span>
            </div>
            <hr>
            <router-link to="/search">
                <i class="fas fa-search"></i>
                <label>Поиск оборудования</label>
                <span class="tooltip">Поиск оборудования</span>
            </router-link>
            <router-link to="/logs">
                <i class="fas fa-clipboard-list"></i>
                <label>Журнал</label>
                <span class="tooltip">Журнал</span>
            </router-link>
            <router-link to="/admin/panel/users">
                <i class="fas fa-users gold"></i>
                <label>Пользователи</label>
                <span class="tooltip">Пользователи</span>
            </router-link>
            <router-link to="/admin/panel/user/edit">
                <i class="fas fa-users-cog gold"></i>
                <label>Пользователи</label>
                <span class="tooltip">Настройка пользователей</span>
            </router-link>
            <router-link to="/admin/panel/devices">
                <i class="fas fa-microchip gold"></i>
                <label>Оборудание</label>
                <span class="tooltip">Оборудание</span>
            </router-link>
            <router-link to="/admin/panel/accounting">
                <i class="fas fa-clipboard-check gold"></i>
                <label>Учёт</label>
                <span class="tooltip">Учёт</span>
            </router-link>
            <router-link to="/admin/panel/generator/qrcode">
                <i class="fas fa-print gold"><i class="qr fas fa-exclamation" v-if="qrNum != 0"></i></i>
                <label>Печать QR-кодов</label>
                <span class="tooltip">Печать QR-кодов</span>
            </router-link>
            <hr>
            <router-link class="profile" to="/profile">
                <i class="fas fa-user-circle"></i>
                <label>Профиль</label>
                <span class="tooltip">Профиль</span>
            </router-link>
            <div class="logout" @click="logout">
                <i class="fas fa-sign-out-alt"></i>
                <label>Выйти</label>
                <span class="tooltip">Выйти</span>
            </div>
        </div>
    </nav>
    <nav class="sidebar-navigation" id="leftMenu" v-else>
        <div> 
            <div class="menu" @click="leftMenu">
                <i class="fas fa-bars"></i>
                <label>Меню</label>
                <span class="tooltip">Развернуть меню</span>
            </div>
            <hr>
            <router-link to="/search">
                <i class="fas fa-search"></i>
                <label>Поиск оборудования</label>
                <span class="tooltip">Поиск оборудования</span>
            </router-link>
            <router-link to="/logs">
                <i class="fas fa-clipboard-list"></i>
                <label>Журнал</label>
                <span class="tooltip">Журнал</span>
            </router-link>            
            <hr>
            <router-link class="profile" to="/profile">
                <i class="fas fa-user-circle"></i>
                <label>Профиль</label>
                <span class="tooltip">Профиль</span>
            </router-link>
            <div class="logout" @click="logout">
                <i class="fas fa-sign-out-alt"></i>
                <label>Выйти</label>
                <span class="tooltip">Выйти</span>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
$sidebar-background-color: #313443;
$active-sidebar-link-color: #22252E;
$hover-sidebar-link-color: $active-sidebar-link-color;
$active-link-color:  rgb(41, 223, 255);
$tooltip-background-color: $sidebar-background-color;

$gold: rgb(255, 212, 0);
$blood: rgb(180, 0, 0);

.active {
    width: 300px !important;
    
    div {
        
        div, a {      
            display: grid !important;
            grid-template-columns: repeat(auto-fill, 80px 220px);  

            i {      
                text-align: center;          
                grid-column: span 1;
            }

            label {       
                grid-column: span 1;
                visibility: visible;
                opacity: 1;
            }

            .tooltip {
                display: none !important;
            }
        }

    }
    
}

.sidebar-navigation {
    z-index: 1000;
    position: absolute;
    min-height: 100vh;
    height: 100%;
    width: 80px;
    max-width: 100%;
    background-color: $sidebar-background-color;
    transition: all 400ms ease;
      
	> div {
        text-align: center;
        color: white;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: clip;
        
        label {
            cursor: pointer;
            margin: auto;
            grid-column: span 1;
            display: inline-block;
            opacity: 0;
            visibility: hidden;
            margin-left: 5px;
            transition: all 400ms ease;
        }

		> a, div {
            display: grid;
            grid-template-columns: repeat(auto-fill, 80px 220px);      
            text-align: center;
			padding: 28px 0;
            cursor: pointer;
			transition: all ease-out 120ms;
			
			i {
                font-size: 24px;
                position: relative;

                transition: all ease 450ms;
                
                > .qr {
                    position: absolute;
                    margin-left: -10px;
                    margin-top: -10px;
                    font-size: .8rem;
                    border-radius: 50%;
                    background: $blood;
                    width: 1.3rem;
                    height: 1.1rem;
                    padding-top: 0.3rem;
                    color: white;
                }
            }
		
			.tooltip {
				display: inline-block;
				position: absolute;
                z-index: 100;
				background-color: $tooltip-background-color;
				padding: 8px 15px;
				border-radius: 3px;
				left: 70px;
				opacity: 0;
				visibility: hidden;
				font-size: 13px;
                letter-spacing: .5px;
                transition: display 5s ease 5s;
				
				&:before {
					content: '';
					display: block;
					position: absolute;
					left: -4px;
					top: 10px;
					transform: rotate(45deg);
					width: 10px;
					height: 10px;
					background-color: inherit;
				}
			}
			
			&:hover {
				background-color: $hover-sidebar-link-color;
				
				.tooltip {
					visibility: visible;
					opacity: 1;
				}
			}			
		}

        > hr {
            border: none;
            background-color: inherit;
            color: inherit;
            height: 10px;
            margin: 0;
        }

        > .menu {
            background: rgb(28, 28, 51) !important;
        }

        .gold {
            color: $gold;
        }

        > .profile {
            color: rgb(142, 255, 119) !important;

            i {
                color: rgb(142, 255, 119) !important;
            }
        }

        > .logout {
            color: rgb(255, 119, 119) !important;
        }
	}
}
			
.router-link-active {
    background-color: $active-sidebar-link-color;
    border-right: 5px solid $gold !important;
    
    i {
        color: $active-link-color;
    }
}

</style>

<script>

export default {
    data() {
        return {
            isAdmin: JSON.parse(localStorage.getItem('user')).isAdmin,
            qrNum: 0
        }
    },
    mounted() {     
        let leftMenu = document.getElementById('leftMenu');
        function outsideClickListener(event) {
            if (leftMenu.className == 'sidebar-navigation active' && !leftMenu.contains(event.target)) {
                leftMenu.className = 'sidebar-navigation'
            }
        }
        document.addEventListener('click', outsideClickListener)    
        try { this.qrNum = localStorage.devices.length } 
        catch {return}
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')  
            this.$router.push('/')
        },
        leftMenu() {
            let leftMenu = document.getElementById('leftMenu')
            if(leftMenu.className == 'sidebar-navigation active') {
                leftMenu.className = 'sidebar-navigation'
            } else {
                leftMenu.className = 'sidebar-navigation active'
            }
        }
    }
}
</script>