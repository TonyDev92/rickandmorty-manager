import { defineStore } from 'pinia';

interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    image: string;
    location: { name: string };
    origin: { name: string };
    
}
export const useFavoritesStore = defineStore('favorites', () => {
    const favorites = ref<Character[]>([]);

    // 1. Cargar datos al inicializar (Solo en el cliente)
    onMounted(() => {
        const saved = localStorage.getItem('rm_favorites');
        if (saved) {
            favorites.value = JSON.parse(saved);
        }
    });

    const toggleFavorite = (character: Character) => {
        const index = favorites.value.findIndex(fav => fav.id === character.id);

        if (index > -1) {
            favorites.value.splice(index, 1);
        } else {
            favorites.value.push(character);
        }

        // 2. Guardar en localStorage cada vez que cambie
        localStorage.setItem('rm_favorites', JSON.stringify(favorites.value));
    };

    const isFavorite = (id: number): boolean => {
        return favorites.value.some(fav => fav.id === id);
    };

    return { favorites, toggleFavorite, isFavorite };
});