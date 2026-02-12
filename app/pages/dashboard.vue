<script setup lang="ts">
import Header from '~/components/shared/header.vue';
import cardCharacter from '~/components/dashboard/cardCharacter.vue';
import characterSearch from '~/components/dashboard/characterSearch.vue'; import { useCharacters } from '~/composables/useCharacters';

const searchQuery = ref('');
const { characters, paginationInfo, isLoading, page } = useCharacters();

/**
 *  Property to filter characters based on the search query.
 *  It checks if the search query is empty and returns all characters,
 *  otherwise it filters the characters by name using a case-insensitive match.
 */
const filteredCharacters = computed(() => {
    if (!searchQuery.value) return characters.value;

    return characters.value.filter(char =>
        char.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

definePageMeta({
    middleware: 'auth'
});
</script>

<template>
    <div class="dashboard-layout">
        <Header />

        <main class="dashboard-main">
            <header class="dashboard-header">
                <div class="dashboard-header__info">
                    <h2 class="dashboard-header__title">Multiverse Monitor</h2>
                    <p class="dashboard-header__subtitle">
                        Dimension: C-137 | Showing page {{ page }} of {{ paginationInfo?.pages || '...' }}
                    </p>
                </div>

                <div class="dashboard-header__actions">
                    <characterSearch v-model="searchQuery" />
                </div>
            </header>

            <section class="dashboard-content">
                <div v-if="isLoading" class="dashboard-loader">
                    <div class="portal-effect"></div>
                    <p>Scanning multiverse...</p>
                </div>

                <template v-else>
                    <div v-if="filteredCharacters.length > 0" class="character-grid">
                        <cardCharacter v-for="char in filteredCharacters" :key="char.id" :character="char" />
                    </div>

                    
                    <div v-else class="dashboard-empty">
                        <div class="empty-icon-wrapper">
                            <img src="https://unpkg.com/lucide-static@latest/icons/ghost.svg" alt="No results found"
                                class="empty-icon-svg" />
                        </div>
                        <p class="empty-text">
                            No life forms detected matching "<strong>{{ searchQuery }}</strong>"
                        </p>
                        <button @click="searchQuery = ''" class="btn-clear">
                            Clear Search
                        </button>
                    </div>
                </template>
            </section>

            <footer v-if="!isLoading && characters.length > 0 && !searchQuery" class="dashboard-footer">
                <nav class="pagination">
                    <button class="pagination__btn" @click="page--" :disabled="page <= 1">
                        &larr; Previous
                    </button>

                    <span class="pagination__current">Page {{ page }}</span>

                    <button class="pagination__btn" @click="page++" :disabled="!paginationInfo?.next">
                        Next &rarr;
                    </button>
                </nav>
            </footer>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.dashboard-layout {
    min-height: 100vh;
    background-color: $color-bg-dark;
    color: $color-text-main;
}

.dashboard-main {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
}

.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $color-card-bg;
    padding: 1.5rem 2.5rem;
    border-radius: 12px;
    border-left: 6px solid $color-rick-green;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    margin-bottom: 2.5rem;
    gap: 2rem;

    &__title {
        color: $color-rick-green;
        font-size: 1.5rem;
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    &__subtitle {
        color: $color-morty-blue;
        font-size: 0.85rem;
        margin-top: 0.2rem;
    }

    &__actions {
        flex: 1;
        max-width: 400px;

        :deep(.search-container) {
            margin-bottom: 0;
        }
    }
}

.dashboard-content {
    min-height: 50vh;
}

.character-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2.5rem;
    animation: fadeIn 0.5s ease-in-out;
}

.dashboard-loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8rem 0;
    color: $color-rick-green;
    font-size: 1.2rem;
    gap: 1.5rem;

    .portal-effect {
        width: 80px;
        height: 80px;
        border: 4px dashed $color-rick-green;
        border-radius: 50%;
        animation: rotate 2s linear infinite;
    }
}

.dashboard-empty {
    text-align: center;
    padding: 6rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.4s ease-out;

    .empty-icon-wrapper {
        width: 80px;
        height: 80px;
        background: rgba($color-rick-green, 0.05);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
    }

    .empty-icon-svg {
        width: 40px;
        height: 40px;
        // filter external svg to match theme colors filter
        filter: invert(71%) sepia(85%) saturate(350%) hue-rotate(65deg) brightness(95%) contrast(85%);
        opacity: 0.6;
    }

    .empty-text {
        color: $color-text-muted;
        font-size: 1.1rem;
        max-width: 400px;
        line-height: 1.5;

        strong {
            color: $color-rick-green;
            font-weight: 600;
        }
    }
}

.btn-clear {
    margin-top: 1.5rem;
    background: rgba($color-rick-green, 0.1);
    border: 1px solid $color-rick-green;
    color: $color-rick-green;
    padding: 0.6rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;

    &:hover {
        background: $color-rick-green;
        color: $color-bg-dark;
    }
}

.dashboard-footer {
    margin-top: 4rem;
    display: flex;
    justify-content: center;
}

.pagination {
    display: flex;
    align-items: center;
    gap: 2rem;
    background: $color-card-bg;
    padding: 0.8rem 2rem;
    border-radius: 50px;
    border: 1px solid rgba($color-rick-green, 0.2);

    &__btn {
        background: transparent;
        border: 1px solid $color-rick-green;
        color: $color-rick-green;
        padding: 0.5rem 1.5rem;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;

        &:hover:not(:disabled) {
            background: $color-rick-green;
            color: $color-bg-dark;
            box-shadow: 0 0 15px rgba($color-rick-green, 0.4);
        }

        &:disabled {
            opacity: 0.3;
            cursor: not-allowed;
        }
    }

    &__current {
        font-weight: bold;
        color: white;
    }
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 900px) {
    .dashboard-header {
        flex-direction: column;
        align-items: stretch;
        text-align: center;

        &__actions {
            max-width: 100%;
        }
    }
}
</style>