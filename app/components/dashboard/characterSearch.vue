<script setup lang="ts">
// Component for searching characters in the dashboard
const emit = defineEmits(['update:modelValue', 'search']);

// Props for the search input
defineProps<{
    modelValue: string;
    placeholder?: string;
}>();

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
};

const clearSearch = () => {
    emit('update:modelValue', '');
};
</script>

<template>
    <div class="search-container">
        <div class="search-wrapper">
            <img 
                src="https://unpkg.com/lucide-static@latest/icons/search.svg" 
                class="search-icon" 
                alt="Search" 
            />
            
            <input
                type="text"
                :value="modelValue"
                @input="handleInput"
                :placeholder="placeholder || 'Search characters...'"
                class="search-input"
            />

            <button 
                v-if="modelValue" 
                @click="clearSearch" 
                class="clear-button"
                title="Clear search"
            >
                <img src="https://unpkg.com/lucide-static@latest/icons/x.svg" alt="Clear" />
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.search-container {
    width: 100%;
    max-width: 500px;
    margin-bottom: 2rem;
}

.search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.search-icon {
    position: absolute;
    left: 12px;
    width: 18px;
    height: 18px;
    opacity: 0.5;
    filter: invert(1); 
}

.search-input {
    width: 100%;
    padding: 0.8rem 2.5rem 0.8rem 2.8rem;
    background: rgba($color-card-bg, 0.5);
    border: 1px solid rgba($color-rick-green, 0.2);
    border-radius: 10px;
    color: white;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: $color-rick-green;
        box-shadow: 0 0 10px rgba($color-rick-green, 0.2);
        background: $color-card-bg;
    }

    &::placeholder {
        color: $color-text-muted;
    }
}

.clear-button {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0;
    
    img {
        width: 16px;
        height: 16px;
        filter: invert(0.5);
        transition: filter 0.2s;
    }

    &:hover img {
        // Lighten the clear icon on hover for better visibility
        filter: invert(1) sepia(1) saturate(5) hue-rotate(340deg);
    }
}
</style>