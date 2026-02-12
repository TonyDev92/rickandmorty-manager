<script setup lang="ts">
import { useCharacterLogic } from '#imports';

const props = defineProps<{ 
    char: any; 
    index: number;
    isFirst: boolean;
    isLast: boolean;
}>();

// Using the character logic composable to get status color and other character-related logic
const { statusColor } = useCharacterLogic(props.char);

defineEmits(['moveUp', 'moveDown', 'remove']);
</script>

<template>
    <tr class="fav-row">
        <td class="fav-row__rank">
            <span class="rank-num">#{{ index + 1 }}</span>
        </td>

        <td class="fav-row__subject">
            <div class="subject-info">
                <div class="subject-info__avatar">
                    <img :src="char.image" :alt="char.name" loading="lazy" />
                </div>
                <div class="subject-info__text">
                    <span class="subject-info__name">{{ char.name }}</span>
                    <div class="subject-info__meta only-mobile">
                        {{ char.species }} · {{ char.status }}
                    </div>
                </div>
            </div>
        </td>

        <td class="fav-row__status hide-mobile">
            <div class="status-badge">
                <span class="status-dot" :style="{ backgroundColor: statusColor }"></span>
                {{ char.species }} - {{ char.status }}
            </div>
        </td>

        <td class="fav-row__data hide-mobile">
            <div class="data-item"><strong>From:</strong> {{ char.origin.name }}</div>
            <div class="data-item"><strong>In:</strong> {{ char.location.name }}</div>
        </td>

        <td class="fav-row__actions">
            <div class="action-group">
                <button @click="$emit('moveUp')" :disabled="isFirst" class="btn-ctrl" title="Promote">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 15-6-6-6 6" /></svg>
                </button>
                <button @click="$emit('moveDown')" :disabled="isLast" class="btn-ctrl" title="Demote">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6" /></svg>
                </button>
                <button @click="$emit('remove')" class="btn-ctrl btn-ctrl--delete" title="Delete">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6m4-11v6" /></svg>
                </button>
            </div>
        </td>
    </tr>
</template>

<style lang="scss" scoped>
/* Desktop Version */
.fav-row {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: background 0.3s;

    &:hover { background: rgba(255, 255, 255, 0.02); }

    td { padding: 1rem 1.5rem; vertical-align: middle; }

    &__rank .rank-num { 
        color: $color-rick-green; 
        font-family: monospace; 
        font-weight: bold; 
        font-size: 1.1rem;
    }

    &__subject .subject-info {
        display: flex; align-items: center; gap: 1rem;
        &__avatar {
            width: 45px; height: 45px; border-radius: 50%; overflow: hidden;
            border: 2px solid $color-rick-green; flex-shrink: 0;
            img { width: 100%; height: 100%; object-fit: cover; }
        }
        &__name { color: white; font-weight: 500; font-size: 1rem; }
    }

    &__status .status-badge {
        display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: $color-text-main;
        .status-dot { width: 8px; height: 8px; border-radius: 50%; }
    }

    &__data {
        font-size: 0.8rem; color: $color-text-muted;
        strong { color: $color-morty-blue; font-weight: normal; }
    }

    &__actions .action-group { display: flex; gap: 0.5rem; }
}

/* control btn */
.btn-ctrl {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white; width: 34px; height: 34px; border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: 0.2s;

    &:hover:not(:disabled) {
        border-color: $color-rick-green;
        color: $color-rick-green;
        background: rgba($color-rick-green, 0.1);
    }

    &--delete:hover {
        border-color: $color-error;
        color: $color-error;
        background: rgba($color-error, 0.1);
    }

    &:disabled { opacity: 0.1; cursor: not-allowed; }
}

/* helpers*/
.only-mobile { display: none; }
.hide-mobile { @media (max-width: 768px) { display: none; } }

/* card transformation (Mobile) */
@media (max-width: 768px) {
    .only-mobile { display: block; }

    .fav-row {
        display: block; 
        background: $color-card-bg;
        margin-bottom: 1rem;
        border: 1px solid rgba($color-rick-green, 0.2);
        border-radius: 12px;
        padding: 1rem !important;

        td { display: block; padding: 0 !important; border: none; }

        &__rank {
            margin-bottom: 0.5rem;
            .rank-num {
                background: rgba($color-rick-green, 0.1);
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 0.8rem;
            }
        }

        &__subject {
            margin-bottom: 1rem;
            .subject-info {
                &__name { font-size: 1.1rem; }
                &__meta { margin-top: 4px; color: $color-morty-blue; }
            }
        }

        &__actions {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 0.8rem !important;
            .action-group {
                display: flex;
                width: 100%;
                .btn-ctrl { flex: 1; height: 40px; }
            }
        }
    }
}
</style>