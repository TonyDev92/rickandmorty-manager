<script setup lang="ts">
import { useFavoritesStore } from '~/stores/favoritesStore';

interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    image: string;
    location: { name: string };
    origin: { name: string };
}

const props = defineProps<{
    character: Character
}>();

const favStore = useFavoritesStore();

// Computed property to check if the character is in favorites
const isFav = computed(() => favStore.isFavorite(props.character.id));

const statusColor = computed(() => {
    switch (props.character.status.toLowerCase()) {
        case 'alive': return '#55cc44';
        case 'dead': return '#d63d2e';
        default: return '#9e9e9e';
    }
});

// function to toggle favorite status of the character
const toggleFav = () => {
    favStore.toggleFavorite(props.character);
};
</script>

<template>
    <article class="char-card">
        <div class="char-card__image-container">
            <img :src="character.image" :alt="character.name" class="char-card__img" loading="lazy" />
            <!-- Favorite button -->
            <button 
                class="char-card__fav-btn" 
                :class="{ 'char-card__fav-btn--active': isFav }"
                @click="toggleFav"
                aria-label="Toggle Favorite"
            >
                <svg viewBox="0 0 24 24" width="24" height="24" class="heart-icon">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            </button>

            <span class="char-card__status-badge" :style="{ backgroundColor: statusColor }">
                {{ character.status }}
            </span>
        </div>

        <div class="char-card__details">
            <h3 class="char-card__name">{{ character.name }}</h3>

            <div class="char-card__info-group">
                <span class="label">Species:</span>
                <span class="value">{{ character.species }}</span>
            </div>

            <div class="char-card__info-group">
                <span class="label">Last known location:</span>
                <span class="value">{{ character.location.name }}</span>
            </div>

            <div class="char-card__info-group">
                <span class="label">First seen in:</span>
                <span class="value">{{ character.origin.name }}</span>
            </div>
        </div>
    </article>
</template>

<style lang="scss" scoped>
.char-card {
    background: $color-card-bg;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid rgba($color-text-muted, 0.1);
    display: flex;
    flex-direction: column;
    position: relative;

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
        border-color: rgba($color-rick-green, 0.4);
    }

    &__image-container {
        position: relative;
        width: 100%;
        aspect-ratio: 1 / 1;
    }

    &__fav-btn {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 2;
        background: rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(4px);

        .heart-icon {
            fill: none;
            stroke: white;
            stroke-width: 2;
            transition: all 0.3s ease;
        }

        &:hover {
            background: rgba(0, 0, 0, 0.8);
            transform: scale(1.1);
        }

        &--active {
            .heart-icon {
                fill: $color-error;
                stroke: $color-error;
            }
        }
    }

    &__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__status-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 700;
        color: white;
        text-transform: uppercase;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    &__details {
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    &__name {
        color: $color-rick-green;
        font-size: 1.4rem;
        margin: 0;
        line-height: 1.2;
    }

    &__info-group {
        display: flex;
        flex-direction: column;

        .label {
            color: $color-text-muted;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .value {
            color: $color-text-main;
            font-size: 0.95rem;
        }
    }
}
</style>