<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const form = reactive({
    email: '',
    password: ''
});

// State to track if fields have been touched for validation feedback
const touched = reactive({
    email: false,
    password: false
});

// Computed properties for validation
const isEmailValid = computed(() => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(form.email);
});

const isPasswordValid = computed(() => form.password.length > 6);

const canSubmit = computed(() => isEmailValid.value && isPasswordValid.value);

const handleLogin = async () => {
    // Mark fields as touched to trigger validation feedback
    touched.email = true;
    touched.password = true;

    if (canSubmit.value) {
        try {
            await authStore.login(form);
            router.push('/dashboard');
        } catch (error) {
            console.error("Portal access denied", error);
        }
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
                    <input 
                        id="email" 
                        v-model="form.email" 
                        type="email" 
                        class="login-form__input"
                        :class="{ 'login-form__input--error': touched.email && !isEmailValid }"
                        placeholder="morty.smith@citadel.com" 
                        @blur="touched.email = true" 
                    />
                    <Transition name="slide-up">
                        <span v-if="touched.email && !isEmailValid" class="login-form__feedback">
                            Enter a valid email address. 
                        </span>
                    </Transition>
                </div>

                <div class="login-form__group">
                    <label class="login-form__label" for="password">Password</label>
                    <input 
                        id="password" 
                        v-model="form.password" 
                        type="password" 
                        class="login-form__input"
                        :class="{ 'login-form__input--error': touched.password && !isPasswordValid }"
                        placeholder="••••••••••••" 
                        @blur="touched.password = true" 
                    />
                    <Transition name="slide-up">
                        <span v-if="touched.password && !isPasswordValid" class="login-form__feedback">
                            The password must be more than 6 characters.
                        </span>
                    </Transition>
                </div>

                <button 
                    type="submit" 
                    class="login-form__button" 
                    :disabled="authStore.isLoading || !canSubmit"
                >
                    <span v-if="!authStore.isLoading">Enter Portal</span>
                    <div v-else class="loader-container">
                        <span class="login-form__loader">Loading...</span>
                    </div>
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
    padding: 1.5rem;
    border-radius: 12px;
    width: 100%;
    max-width: 450px;
    box-shadow: 0 14px 22px rgba(0, 0, 0, 0.4);
    border-top: 4px solid $color-rick-green;
    animation: cardAppear 0.6s cubic-bezier(0.16, 1, 0.3, 1);

    @media (min-width: 480px) {
        padding: 2.5rem;
    }

    &__header {
        text-align: center;
        margin-bottom: 2rem;
    }

    &__title {
        color: $color-text-main;
        font-size: clamp(1.4rem, 6vw, 1.8rem);
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    &__subtitle {
        color: $color-text-muted;
        font-size: 0.9rem;
        line-height: 1.4;
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
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    &__input {
        padding: 0.8rem 1rem;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.05);
        color: $color-text-main;
        font-size: 16px;
        transition: all 0.3s ease;
        width: 100%;

        &:focus {
            outline: none;
            border-color: $color-rick-green;
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 0 0 3px rgba($color-rick-green, 0.15);
        }

        &--error {
            border-color: rgba($color-error, 0.5);
            &:focus {
                border-color: $color-error;
                box-shadow: 0 0 0 3px rgba($color-error, 0.15);
            }
        }
    }

    &__feedback {
        color: $color-error;
        font-size: 0.75rem;
        margin-top: 0.5rem;
        font-weight: 500;
    }

    &__button {
        width: 100%;
        padding: 1rem;
        background: $color-rick-green;
        color: $color-bg-dark;
        border: none;
        border-radius: 6px;
        font-weight: 800;
        font-size: 1rem;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover:not(:disabled) {
            background: $color-rick-green-light;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba($color-rick-green, 0.3);
        }

        &:active {
            transform: translateY(0);
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            filter: grayscale(0.2);
        }
    }

    &__footer {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
    }

    &__link-back {
        color: $color-text-muted;
        text-decoration: none;
        font-size: 0.85rem;
        font-weight: 600;
        transition: color 0.3s ease;
        padding: 0.5rem 1rem;

        &:hover {
            color: $color-rick-green;
        }
    }
}

@keyframes cardAppear {
    from {
        opacity: 0;
        transform: scale(0.95) translateY(20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateY(-8px);
}

.slide-up-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}

.login-form__loader {
    animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
}
</style>