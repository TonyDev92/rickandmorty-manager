<script setup lang="ts">
import Header from '~/components/shared/header.vue';
import Logout from '~/components/ui/logout.vue';
import cardCharacter from '~/components/dashboard/cardCharacter.vue';

const { characters, paginationInfo, isLoading, page } = useCharacters();

// Debugging logs to verify data flow in the dashboard
console.log('Characters in Dashboard:', characters.value);
console.log('Loading state in Dashboard:', isLoading.value);
console.log('Current page in Dashboard:', page.value);

// Watch for changes in characters to confirm updates are received
watch(characters, (newVal) => {
    if (newVal.length > 0) {
        for (let i = 0; i < newVal.length; i++) {
            console.log(`Updated Character ${i + 1}:`, newVal[i]);
        }
        console.log('Received updated characters:', newVal);
    }
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
                <div class="dashboard-header__content">
                    <h2 class="dashboard-header__title">Multiverse Monitor</h2>
                    <p class="dashboard-header__subtitle">
                        Dimension: C-137 | Showing page {{ page }} of {{ paginationInfo?.pages || '...' }}
                    </p>
                </div>
                
            </header>

            <section class="dashboard-content">
                
                <div v-if="isLoading" class="dashboard-loader">
                    <div class="portal-effect"></div>
                    <p>Scanning multiverse...</p>
                </div>

                <div v-else-if="characters.length > 0" class="character-grid">
                    <cardCharacter
                        v-for="char in characters" 
                        :key="char.id" 
                        :character="char" 
                    />
                </div>

                <div v-else class="dashboard-empty">
                    <p>No life forms detected in this sector.</p>
                </div>
            </section>

            <footer v-if="!isLoading && characters.length > 0" class="dashboard-footer">
                <nav class="pagination">
                    <button 
                        class="pagination__btn" 
                        @click="page--" 
                        :disabled="page <= 1"
                    >
                        &larr; Previous
                    </button>
                    
                    <span class="pagination__current">Page {{ page }}</span>
                    
                    <button 
                        class="pagination__btn" 
                        @click="page++" 
                        :disabled="!paginationInfo?.next"
                    >
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

    &__title {
        color: $color-rick-green;
        font-size: 1.8rem;
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    &__subtitle {
        color: $color-morty-blue;
        font-size: 0.95rem;
        margin-top: 0.4rem;
        font-weight: 500;
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
    padding: 5rem 0;
    color: $color-rick-green;
    font-size: 1.2rem;
    gap: 1.5rem;
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
            border-color: $color-text-muted;
            color: $color-text-muted;
        }
    }

    &__current {
        font-weight: bold;
        color: $color-text-main;
        min-width: 80px;
        text-align: center;
    }
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

// Media queries para adaptabilidad
@media (max-width: 768px) {
    .dashboard-header {
        flex-direction: column;
        text-align: center;
        gap: 1.5rem;
        padding: 1.5rem;
    }

    .character-grid {
        grid-template-columns: 1fr;
    }
}
</style>