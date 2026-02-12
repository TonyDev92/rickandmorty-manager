<script setup lang="ts">
import Header from '~/components/shared/header.vue';
import { useFavoritesStore } from '~/stores/favoritesStore';

const favStore = useFavoritesStore();

definePageMeta({
    middleware: 'auth'
});

// function to move up in the ranking (Promote)
const moveUp = (index: number) => {
    if (index > 0) {
        const list = favStore.favorites;
        const currentItem = list[index];
        const previousItem = list[index - 1];
        if (currentItem && previousItem) {
            list[index] = previousItem;
            list[index - 1] = currentItem;
        }
    }
};

// function to move down in the ranking (Demote)
const moveDown = (index: number) => {
    const list = favStore.favorites;
    if (index < list.length - 1) {
        const currentItem = list[index];
        const nextItem = list[index + 1];
        if (currentItem && nextItem) {
            list[index] = nextItem;
            list[index + 1] = currentItem;
        }
    }
};

const remove = (character: any) => {
    favStore.toggleFavorite(character);
};
</script>

<template>
    <div class="favorites-view">
        
        <Header/>
        <main class="favorites-container">
            <header class="favorites-header">
                <h2 class="favorites-header__title">Ranking of Multiverse</h2>
                <p class="favorites-header__subtitle">Manage and order your favorite specimens</p>
            </header>

            <section class="favorites-content">
                <div v-if="favStore.favorites.length > 0" class="table-wrapper">
                    <table class="fav-table">
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Subject</th>
                                <th>Species and Status</th>
                                <th>Origin and Location</th>
                                <th>Ranking Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(char, index) in favStore.favorites" :key="char.id" class="fav-row">
                                <td class="fav-row__rank">
                                    <span class="rank-num">#{{ index + 1 }}</span>
                                </td>

                                <td class="fav-row__subject">
                                    <div class="subject-info">
                                        <div class="subject-info__avatar">
                                            <img :src="char.image" :alt="char.name" />
                                        </div>
                                        <span class="subject-info__name">{{ char.name }}</span>
                                    </div>
                                </td>

                                <td class="fav-row__status">
                                    <div class="status-badge">
                                        <span class="status-dot" :style="{ backgroundColor: char.status === 'Alive' ? '#55cc44' : '#d63d2e' }"></span>
                                        {{ char.species }} - {{ char.status }}
                                    </div>
                                </td>

                                <td class="fav-row__data">
                                    <div class="data-item"><strong>Origin:</strong> {{ char.origin.name }}</div>
                                    <div class="data-item"><strong>Location:</strong> {{ char.location.name }}</div>
                                </td>

                                <td class="fav-row__actions">
                                    <div class="action-group">
                                        <button @click="moveUp(index)" :disabled="index === 0" class="btn-ctrl" title="Promote">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 15-6-6-6 6"/></svg>
                                        </button>
                                        
                                        <button @click="moveDown(index)" :disabled="index === favStore.favorites.length - 1" class="btn-ctrl" title="Demote">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                                        </button>

                                        <button @click="remove(char)" class="btn-ctrl btn-ctrl--delete" title="Delete">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6m4-11v6"/></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-else class="empty-state">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(85, 204, 68, 0.5)" stroke-width="1"><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 1 0 10 10"/></svg>
                    <h3>No hay sujetos en el radar</h3>
                    <NuxtLink to="/dashboard" class="btn-link">Volver al Dashboard</NuxtLink>
                </div>
            </section>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.favorites-view {
    min-height: 100vh;
    background-color: $color-bg-dark;
}

.favorites-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
}

.favorites-header {
    margin-bottom: 2.5rem;
    &__title { color: $color-rick-green; font-size: 1.8rem; margin: 0; }
    &__subtitle { color: $color-text-muted; font-size: 0.9rem; }
}

.table-wrapper {
    background: $color-card-bg;
    border-radius: 12px;
    border: 1px solid rgba($color-rick-green, 0.15);
    overflow: hidden;
}

.fav-table {
    width: 100%;
    border-collapse: collapse;
    
    th {
        text-align: left;
        padding: 1rem 1.5rem;
        background: rgba(0, 0, 0, 0.2);
        color: $color-morty-blue;
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .fav-row {
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        &:last-child { border-bottom: none; }
        
        td { padding: 1rem 1.5rem; vertical-align: middle; }

        &__rank .rank-num {
            color: $color-rick-green;
            font-family: monospace;
            font-weight: bold;
        }

        &__subject {
            .subject-info {
                display: flex;
                align-items: center;
                gap: 1rem;
                &__avatar {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 2px solid $color-rick-green;
                    img { width: 100%; height: 100%; object-fit: cover; }
                }
                &__name { color: white; font-weight: 500; }
            }
        }

        &__status {
            color: $color-text-main;
            font-size: 0.85rem;
            .status-badge {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .status-dot { width: 8px; height: 8px; border-radius: 50%; }
        }

        &__data {
            font-size: 0.8rem;
            color: $color-text-muted;
            .data-item { margin-bottom: 2px; }
            strong { color: $color-morty-blue; font-weight: normal; }
        }

        &__actions .action-group {
            display: flex;
            gap: 0.5rem;
        }
    }
}

.btn-ctrl {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    width: 34px;
    height: 34px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s;

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

.empty-state {
    text-align: center;
    padding: 4rem;
    h3 { color: $color-text-muted; font-weight: normal; margin: 1rem 0; }
    .btn-link {
        color: $color-rick-green;
        text-decoration: none;
        font-size: 0.9rem;
        border-bottom: 1px solid;
    }
}
</style>