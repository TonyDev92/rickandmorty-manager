<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const form = reactive({
    email: '',
    password: ''
});

// Touch tracking for validation feedback
const touched = reactive({
    email: false,
    password: false
});

// Validation computeds
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

    if (canSubmit.value) {
        await authStore.login(form);
        router.push('/dashboard');
    }
}
</script>

<template>
    <main class="login-view">
        <section class="login-card">
            <header class="login-card__header">
                <h1 class="login-card__title">Access Portal</h1>
                <p class="login-card__subtitle">Enter your interdimensional credentials</p>
            </header>

            <form class="login-form" @submit.prevent="handleLogin" novalidate>
                <div class="login-form__group">
                    <label class="login-form__label" for="email">Email</label>
                    <input id="email" v-model="form.email" type="email" class="login-form__input"
                        :class="{ 'login-form__input--error': touched.email && !isEmailValid }"
                        placeholder="morty.smith@citadel.com" @blur="touched.email = true" />
                    <Transition name="slide-up">
                        <span v-if="touched.email && !isEmailValid" class="login-form__feedback">
                            Enter a valid email address. 
                        </span>
                    </Transition>
                </div>

                <div class="login-form__group">
                    <label class="login-form__label" for="password">Password</label>
                    <input id="password" v-model="form.password" type="password" class="login-form__input"
                        :class="{ 'login-form__input--error': touched.password && !isPasswordValid }"
                        :placeholder="'* '.repeat(18).trim()" @blur="touched.password = true" />
                    <Transition name="slide-up">
                        <span v-if="touched.password && !isPasswordValid" class="login-form__feedback">
                            The password must be more than 6 characters.
                        </span>
                    </Transition>
                </div>

                <button type="submit" class="login-form__button" :disabled="authStore.isLoading || !canSubmit">
                    <span v-if="!authStore.isLoading">Entrar al Portal</span>
                    <span v-else class="login-form__loader">Cargando...</span>
                </button>

                <div class="login-form__footer">
                    <NuxtLink to="/" class="login-form__link-back">
                        &larr; Volver a Home
                    </NuxtLink>
                </div>
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
    background-color: $color-bg-dark;
    padding: 1rem;
}

.login-card {
    background: $color-card-bg;
    padding: 2.5rem;
    border-radius: 12px;
    width: 100%;
    max-width: 450px;
    box-shadow: 0 14px 22px rgba(0, 0, 0, 0.3);
    border-top: 4px solid $color-rick-green;

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
        color: $color-morty-blue;
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

    &__footer {
        margin-top: 1.5rem;
        display: flex;
        justify-content: center;
    }

    &__link-back {
        color: $color-text-muted;
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 500;
        transition: color 0.3s ease;

        &:hover {
            color: $color-rick-green;
        }
    }
}

// Feedback animation for validation messages
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