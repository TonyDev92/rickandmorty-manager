<script setup lang="ts">
import Header from '~/components/shared/header.vue';
import cardCharacter from '~/components/dashboard/cardCharacter.vue';
import characterSearch from '~/components/dashboard/characterSearch.vue'; 
import { useCharacters } from '~/composables/useCharacters';

const searchQuery = ref('');
const { characters, paginationInfo, isLoading, page } = useCharacters();
// Computed to filter characters based on search query
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
                        Dimension: C-137 | Page {{ page }} of {{ paginationInfo?.pages || '...' }}
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
                        <cardCharacter 
                            v-for="char in filteredCharacters" 
                            :key="char.id" 
                            :character="char" 
                        />
                    </div>

                    <div v-else class="dashboard-empty">
                        <div class="empty-icon-wrapper">
                            <img src="https://unpkg.com/lucide-static@latest/icons/ghost.svg" alt="No results"
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
                    <button class="pagination__btn" @click="page--" :disabled="page <= 1" aria-label="Previous">
                        &larr; <span class="btn-text">Previous</span>
                    </button>

                    <div class="pagination__info">
                        <span class="pagination__current">{{ page }}</span>
                        <span class="pagination__divider">/</span>
                        <span class="pagination__total">{{ paginationInfo?.pages }}</span>
                    </div>

                    <button class="pagination__btn" @click="page++" :disabled="!paginationInfo?.next" aria-label="Next">
                        <span class="btn-text">Next</span> &rarr;
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
    padding: 1rem;
    
    @media (min-width: 768px) { 
        padding: 2rem 1.5rem; 
    }
}

.dashboard-header {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: $color-card-bg;
    padding: 1.5rem;
    border-radius: 12px;
    border-left: 6px solid $color-rick-green;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    margin-bottom: 2.5rem;
    align-items: center;

    @media (min-width: 900px) {
        flex-direction: row;
        justify-content: space-between;
        padding: 1.2rem 2.5rem;
    }

    &__info {
        text-align: center;
        @media (min-width: 900px) { text-align: left; }
    }

    &__title {
        color: $color-rick-green;
        font-size: clamp(1.2rem, 5vw, 1.4rem);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin: 0;
    }

    &__subtitle {
        color: $color-morty-blue;
        font-size: 0.8rem;
        margin: 0;
    }

    &__actions {
        width: 100%;
        display: flex;
        align-items: center;
        @media (min-width: 900px) { 
            max-width: 400px;
        }

        :deep(.search-container) {
            margin: 0; 
            width: 100%;
        }
    }
}

.character-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    
    @media (min-width: 600px) {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 2rem;
    }
}

.dashboard-footer {
    margin-top: 4rem;
    padding-bottom: 2rem;
    display: flex;
    justify-content: center;
}

.pagination {
    display: flex;
    align-items: center;
    background: color-mix(in srgb, $color-card-bg, white 3%);
    padding: 0.5rem;
    border-radius: 100px;
    border: 1px solid rgba($color-rick-green, 0.3);
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    width: 100%;
    max-width: 380px;

    &__info {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        padding: 0 1rem;
        color: white;
        font-weight: 700;
        font-size: 0.9rem;
    }

    &__divider { 
        opacity: 0.4; 
        font-weight: 300; 
    }

    &__total { 
        color: $color-text-muted; 
    }

    &__btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba($color-rick-green, 0.1);
        border: none;
        color: $color-rick-green;
        padding: 0.8rem 1rem;
        border-radius: 100px;
        cursor: pointer;
        font-weight: 700;
        font-size: 0.85rem;
        transition: all 0.2s ease;

        &:hover:not(:disabled) {
            background: $color-rick-green;
            color: $color-bg-dark;
        }

        &:disabled {
            opacity: 0.2;
            cursor: not-allowed;
            filter: grayscale(1);
        }

        .btn-text {
            display: none;
            @media (min-width: 480px) { 
                display: inline; 
                margin: 0 0.5rem; 
            }
        }
    }
}

.dashboard-empty {
    text-align: center;
    padding: 6rem 1.5rem;
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
        margin-bottom: 2rem;
        border: 1px solid rgba($color-rick-green, 0.1);
    }

    .empty-icon-svg {
        width: 40px;
        height: 40px;
        filter: invert(71%) sepia(85%) saturate(350%) hue-rotate(65deg) brightness(95%) contrast(85%);
        opacity: 0.7;
    }

    .empty-text {
        color: $color-text-muted;
        font-size: clamp(1rem, 4vw, 1.2rem);
        max-width: 450px;
        line-height: 1.6;
        margin-bottom: 2rem;

        strong {
            color: $color-rick-green;
            font-weight: 600;
            background: rgba($color-rick-green, 0.1);
            padding: 0.1rem 0.5rem;
            border-radius: 4px;
        }
    }
}

.btn-clear {
    background: transparent;
    border: 1px solid $color-rick-green;
    color: $color-rick-green;
    padding: 0.8rem 2rem;
    border-radius: 100px;
    cursor: pointer;
    font-weight: 700;
    font-size: 0.9rem;
    transition: all 0.3s ease;

    &:hover {
        background: $color-rick-green;
        color: $color-bg-dark;
        box-shadow: 0 0 20px rgba($color-rick-green, 0.3);
    }
}

@keyframes rotate { 
    from { transform: rotate(0deg); } 
    to { transform: rotate(360deg); } 
}

@keyframes fadeIn { 
    from { opacity: 0; transform: translateY(10px); } 
    to { opacity: 1; transform: translateY(0); } 
}

.dashboard-loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6rem 0;
    color: $color-rick-green;

    .portal-effect {
        width: 60px; 
        height: 60px;
        border: 4px dashed $color-rick-green;
        border-radius: 50%;
        animation: rotate 2s linear infinite;
        margin-bottom: 1rem;
    }
}
</style>