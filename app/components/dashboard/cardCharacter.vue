<script setup lang="ts">
// Interface to define the structure of a character object based on the API response
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
// Computed property to determine the color of the status badge based on the character's status
const statusColor = computed(() => {
    switch (props.character.status.toLowerCase()) {
        case 'alive': return '#55cc44';
        case 'dead': return '#d63d2e';
        default: return '#9e9e9e';
    }
});
</script>

<template>
    <article class="char-card">
        <div class="char-card__image-container">
            <img :src="character.image" :alt="character.name" class="char-card__img" loading="lazy" />
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