<script setup lang="ts">
import Header from '~/components/shared/header.vue';
import { useAuthStore } from '#imports';

const authStore = useAuthStore();
// Computed for determining if the user is authenticated based on the auth store
const isAuthenticated = computed(() => !!authStore.user);

const benefits = [
    {
        icon: 'https://unpkg.com/lucide-static@latest/icons/list-ordered.svg',
        title: 'Personalized Rankings',
        text: 'Save your favorite specimens and rank them by threat level or coolness across the multiverse.'
    },
    {
        icon: 'https://unpkg.com/lucide-static@latest/icons/database.svg',
        title: 'Advanced Tracking',
        text: 'Access detailed technical data, origin dimensions, and current locations for over 800 characters.'
    },
    {
        icon: 'https://unpkg.com/lucide-static@latest/icons/refresh-cw.svg',
        title: 'Portal Persistence',
        text: 'Your data stays with you. Access your curated lists from any terminal in any dimension.'
    }
];
</script>

<template>
    <div class="home-page">
        <Header />

        <main class="home-content">
            <section class="hero">
                <div class="hero__container">
                    <h2 class="hero__title">
                        Explore the <span class="highlight">Multiverse</span>
                    </h2>
                    <p class="hero__description">
                        The ultimate central database for Rick and Morty enthusiasts.
                        Track every specimen, dimension, and bizarre reality in one place.
                    </p>
                    <div class="hero__actions">
                        <NuxtLink v-if="!isAuthenticated" to="/login" class="btn-primary">
                            Get Started
                        </NuxtLink>
                        <NuxtLink v-else to="/dashboard" class="btn-primary">
                            Back to Dashboard
                        </NuxtLink>
                        <a href="#benefits" class="btn-secondary">Learn More</a>
                    </div>
                </div>
            </section>

            <section id="benefits" class="benefits">
                <div class="benefits__container">
                    <header class="benefits__header">
                        <span class="tagline">Interdimensional Perks</span>
                        <h3 class="benefits__title">Why register your portal gun?</h3>
                    </header>

                    <div class="benefits__grid">
                        <div v-for="benefit in benefits" :key="benefit.title" class="benefit-card">
                            <div class="benefit-card__icon-wrapper">
                                <img :src="benefit.icon" :alt="benefit.title" class="benefit-card__icon" />
                            </div>
                            <h4 class="benefit-card__title">{{ benefit.title }}</h4>
                            <p class="benefit-card__text">{{ benefit.text }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section v-if="!isAuthenticated" class="cta-section">
                <div class="cta-section__content">
                    <h3 class="cta-section__title">Ready to begin your research?</h3>
                    <NuxtLink to="/login" class="btn-primary">Create Galactic ID</NuxtLink>
                </div>
            </section>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.home-page {
    background-color: $color-bg-dark;
    min-height: 100vh;
    color: white;
    overflow-x: hidden; 
}

// --- HERO ---
.hero {
    padding: 6rem 1.5rem; 
    display: flex;
    justify-content: center;
    text-align: center;
    background: radial-gradient(circle at center, rgba($color-rick-green, 0.1) 0%, transparent 80%);

    @media (min-width: 768px) {
        padding: 10rem 2rem;
    }

    &__container {
        max-width: 800px;
    }

    &__title {
        font-size: clamp(2.2rem, 10vw, 4.5rem);
        line-height: 1.1;
        margin-bottom: 1.5rem;

        .highlight {
            color: $color-rick-green;
            display: block;
            font-family: monospace;
            @media (min-width: 768px) {
                display: inline; 
            }
        }
    }

    &__description {
        font-size: clamp(1rem, 4vw, 1.25rem);
        color: $color-text-muted;
        margin-bottom: 2.5rem;
        line-height: 1.6;
        max-width: 600px;
        margin-inline: auto;
    }

    &__actions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;

        @media (min-width: 480px) {
            flex-direction: row; 
            justify-content: center;
            gap: 1.5rem;
        }
    }
}

// --- BENEFITS ---
.benefits {
    padding: 4rem 1.5rem;
    background: rgba(0, 0, 0, 0.2);

    @media (min-width: 768px) {
        padding: 8rem 2rem;
    }

    &__container {
        max-width: 1200px;
        margin: 0 auto;
    }

    &__header {
        text-align: center;
        margin-bottom: 3rem;

        @media (min-width: 768px) {
            margin-bottom: 5rem;
        }

        .tagline {
            color: $color-rick-green;
            text-transform: uppercase;
            font-size: 0.75rem;
            letter-spacing: 3px;
            font-weight: 700;
        }

        &__title {
            font-size: clamp(1.8rem, 5vw, 2.5rem);
            margin-top: 1rem;
        }
    }

    &__grid {
        display: grid;
        grid-template-columns: 1fr; 
        gap: 1.5rem;

        @media (min-width: 768px) {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2.5rem;
        }
    }
}

.benefit-card {
    background: $color-card-bg;
    padding: 2rem 1.5rem;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    text-align: center;
    transition: all 0.3s ease;

    @media (min-width: 768px) {
        padding: 3rem 2rem;
    }

    &:hover {
        @media (min-width: 1024px) { 
            transform: translateY(-10px);
            border-color: rgba($color-rick-green, 0.3);
        }
    }

    &__icon-wrapper {
        width: 56px;
        height: 56px;
        background: rgba($color-rick-green, 0.1);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
    }

    &__icon {
        width: 28px;
        height: 28px;
        filter: invert(71%) sepia(85%) saturate(350%) hue-rotate(65deg) brightness(95%) contrast(85%);
    }

    &__title {
        font-size: 1.25rem;
        margin-bottom: 0.8rem;
    }

    &__text {
        color: $color-text-muted;
        line-height: 1.6;
        font-size: 0.95rem;
    }
}

// --- CTA SECTION ---
.cta-section {
    padding: 5rem 1.5rem;
    text-align: center;

    @media (min-width: 768px) {
        padding: 8rem 2rem;
    }

    &__title {
        font-size: clamp(1.5rem, 5vw, 2rem);
        margin-bottom: 2rem;
    }
}

// --- BUTTONS ---
.btn-primary, .btn-secondary {
    width: 100%; 
    max-width: 280px;
    text-align: center;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;

    @media (min-width: 480px) {
        width: auto;
    }
}

.btn-primary {
    background: $color-rick-green;
    color: $color-bg-dark;

    &:hover {
        box-shadow: 0 0 20px rgba($color-rick-green, 0.4);
    }
}

.btn-secondary {
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;

    &:hover {
        background: rgba(255, 255, 255, 0.05);
    }
}
</style>