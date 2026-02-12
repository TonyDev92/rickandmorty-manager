<script setup lang="ts">
import Header from '~/components/shared/header.vue';
import favRow from '~/components/ui/favRow.vue';
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
</script>

<template>
    <div class="favorites-view">
        <Header />

        <main class="favorites-container">
            <header class="favorites-header">
                <h2 class="favorites-header__title">Ranking of Multiverse</h2>
                <p class="favorites-header__subtitle">Manage and order your favorite specimens</p>
            </header>

            <section class="favorites-content">
                <div v-if="favStore.favorites.length > 0" class="table-wrapper">
                    <table class="fav-table">
                        <thead class="hide-mobile">
                            <tr>
                                <th>Pos</th>
                                <th>Subject</th>
                                <th>Species & Status</th>
                                <th>Origin & Location</th>
                                <th class="text-right">Actions</th>
                            </tr>
                        </thead>

                        <transition-group name="list" tag="tbody">
                            <favRow v-for="(char, index) in favStore.favorites" :key="char.id" :char="char"
                                :index="index" :is-first="index === 0"
                                :is-last="index === favStore.favorites.length - 1" @move-up="moveUp(index)"
                                @move-down="moveDown(index)" @remove="favStore.toggleFavorite(char)" />
                        </transition-group>
                    </table>
                </div>

                <div v-else class="empty-state">
                    <div class="empty-state__icon-wrapper">
                        <img src="https://unpkg.com/lucide-static@latest/icons/database-zap.svg" alt="No favorites"
                            class="empty-icon-svg" />
                    </div>
                    <h3 class="empty-state__title">No subjects on the radar</h3>
                    <p class="empty-state__description">Your multiverse ranking is currently empty. Start tracking
                        specimens from the dashboard.</p>
                    <NuxtLink to="/dashboard" class="btn-link">Back to Dashboard</NuxtLink>
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
    padding: 2rem 1rem;
}

.favorites-header {
    margin-bottom: 2rem;

    &__title {
        color: $color-rick-green;
        font-size: 1.8rem;
        margin: 0;
    }

    &__subtitle {
        color: $color-text-muted;
        font-size: 0.9rem;
    }
}

/* TABLE LAYOUT */
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
}

/* HELPERS */
.hide-mobile {
    @media (max-width: 768px) {
        display: none;
    }
}

.text-right {
    text-align: right;
}

/* TRANSITIONS (Animación de reordenamiento) */
.list-move {
    transition: transform 0.5s ease;
}

/* RESPONSIVE RESET */
@media (max-width: 768px) {
    .table-wrapper {
        background: transparent;
        border: none;
        overflow: visible;
    }

    .fav-table {
        display: block;

        thead {
            display: none;
        }

        tbody {
            display: block;
            width: 100%;
        }
    }
}

/* EMPTY STATE */
.empty-state {
    text-align: center;
    padding: 4rem 1.5rem;
    background: rgba(0, 0, 0, 0.1);
    border: 1px dashed rgba($color-rick-green, 0.2);
    border-radius: 20px;

    &__icon-wrapper {
        width: 60px;
        height: 60px;
        background: rgba($color-rick-green, 0.05);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
    }

    .empty-icon-svg {
        width: 32px;
        height: 32px;
        filter: invert(71%) sepia(85%) saturate(350%) hue-rotate(65deg);
        opacity: 0.7;
    }

    &__title {
        color: white;
        margin-bottom: 0.5rem;
    }

    &__description {
        color: $color-text-muted;
        margin-bottom: 2rem;
        font-size: 0.9rem;
        max-width: 400px;
        margin-inline: auto;
    }

    .btn-link {
        display: inline-block;
        color: $color-rick-green;
        text-decoration: none;
        padding: 0.7rem 1.5rem;
        border: 1px solid $color-rick-green;
        border-radius: 8px;
        transition: all 0.3s;

        &:hover {
            background: $color-rick-green;
            color: $color-bg-dark;
        }
    }
}
</style>