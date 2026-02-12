// Composable for character-specific logic, such as favorite status and status color
export const useCharacterLogic = (character: any) => {
    const favStore = useFavoritesStore();
    
    const isFav = computed(() => favStore.isFavorite(character.id));
    
    const statusColor = computed(() => {
        switch (character.status?.toLowerCase()) {
            case 'alive': return '#55cc44';
            case 'dead': return '#d63d2e';
            default: return '#9e9e9e';
        }
    });

    const toggleFav = () => favStore.toggleFavorite(character);

    return { isFav, statusColor, toggleFav };
};