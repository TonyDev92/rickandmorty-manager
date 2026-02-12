import axios from 'axios';

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
export const useCharacters = () => {
    const characters = ref<Character[]>([]);
    const paginationInfo = ref({ count: 0, pages: 0, next: null, prev: null });
    const isLoading = ref(false);
    const page = ref(1);

    // function to fetch characters from the Rick and Morty API with pagination support
    const fetchCharacters = async () => {
        isLoading.value = true;
        try {
            const { data } = await axios.get(`https://rickandmortyapi.com/api/character`, {
                params: { page: page.value }
            });


            characters.value = data.results;
            paginationInfo.value = data.info;

        } catch (error) {
            console.error('Error fetching characters:', error);
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(fetchCharacters);
    watch(page, fetchCharacters);

    return {
        characters,
        paginationInfo,
        isLoading,
        page,
        fetchCharacters
    };
};