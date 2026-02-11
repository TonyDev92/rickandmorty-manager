<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';


const authStore = useAuthStore();
const router = useRouter();

const form = reactive({
    email: '',
    password: ''
});

// Validated fields tracking
const touched = reactive({
    email: false,
    password: false
});

// Validation logic
const isEmailValid = computed(() => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(form.email);
});

const isPasswordValid = computed(() => form.password.length > 6);

const canSubmit = computed(() => isEmailValid.value && isPasswordValid.value);

const handleLogin = async () => {
    // Mark all fields as touched to trigger validation feedback
    touched.email = true;
    touched.password = true;

    await authStore.login(form);
    router.push('/dashboard');

}
</script>

<template>
    <main class="login-view">
        <section class="login-card">
            <header class="login-card__header">
                <h1 class="login-card__title">Portal de Acceso</h1>
                <p class="login-card__subtitle">Ingresa tus credenciales interdimensionales</p>
            </header>
            <form class="login-form" @submit.prevent="handleLogin" novalidate>
                <div class="login-form__group">
                    <label class="login-form__label" for="email">Email</label>
                    <input id="email" v-model="form.email" type="email" class="login-form__input"
                        :class="{ 'login-form__input--error': touched.email && !isEmailValid }"
                        placeholder="morty.smith@citadel.com" @blur="touched.email = true" />
                    <Transition name="slide-up">
                        <span v-if="touched.email && !isEmailValid" class="login-form__feedback">
                            Introduce un correo electrónico válido.
                        </span>
                    </Transition>
                </div>

                <div class="login-form__group">
                    <label class="login-form__label" for="password">Contraseña</label>
                    <input id="password" v-model="form.password" type="password" class="login-form__input"
                        :class="{ 'login-form__input--error': touched.password && !isPasswordValid }"
                        placeholder="••••••••" @blur="touched.password = true" />
                    <Transition name="slide-up">
                        <span v-if="touched.password && !isPasswordValid" class="login-form__feedback">
                            La contraseña debe tener más de 6 caracteres.
                        </span>
                    </Transition>
                </div>

                <button type="submit" class="login-form__button" :disabled="authStore.isLoading">
                    <span v-if="!authStore.isLoading">Entrar al Portal</span>
                    <span v-else class="login-form__loader">Cargando...</span>
                </button>
            </form>
        </section>
    </main>
</template>
<style lang="scss" scoped>
.login-view {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: $color-bg-dark; // Variable Global
    padding: 1rem;
}

.login-card {
    background: $color-card-bg; // Variable Global
    padding: 2.5rem;
    border-radius: 12px;
    width: 100%;
    max-width: 450px;
    box-shadow: 0 14px 22px rgba(0, 0, 0, 0.3);
    border-top: 4px solid $color-rick-green; // Variable Global

    &__header {
        text-align: center;
        margin-bottom: 2rem;
    }

    &__title {
        color: $color-text-main;
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
    }

    &__subtitle {
        color: $color-text-muted;
    }
}

.login-form {
    &__group {
        margin-bottom: 1.5rem;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    &__label {
        color: $color-morty-blue; // Variable Global
        font-weight: 600;
        margin-bottom: 0.5rem;
        font-size: 0.85rem;
        text-transform: uppercase;
    }

    &__input {
        padding: 0.8rem 1rem;
        border-radius: 6px;
        border: 1px solid #555;
        background: $color-input-bg;
        color: $color-text-main;
        transition: border-color 0.3s, box-shadow 0.3s;

        &:focus {
            outline: none;
            border-color: $color-rick-green;
            box-shadow: 0 0 0 2px rgba($color-rick-green, 0.2);
        }

        &--error {
            border-color: $color-error;

            &:focus {
                border-color: $color-error;
                box-shadow: 0 0 0 2px rgba($color-error, 0.2);
            }
        }
    }

    &__feedback {
        color: $color-error;
        font-size: 0.75rem;
        margin-top: 0.4rem;
    }

    &__button {
        width: 100%;
        padding: 1rem;
        background: $color-rick-green;
        color: $color-bg-dark;
        border: none;
        border-radius: 6px;
        font-weight: 700;
        font-size: 1rem;
        cursor: pointer;
        transition: background 0.3s, transform 0.2s;
        margin-top: 1rem;

        &:hover:not(:disabled) {
            background: $color-rick-green-light;
            transform: translateY(-1px);
        }

        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            filter: grayscale(0.5);
        }
    }
}

// Animation for validation feedback
.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
    opacity: 0;
    transform: translateY(-5px);
}
</style>