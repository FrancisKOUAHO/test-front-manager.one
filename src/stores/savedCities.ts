import { defineStore } from 'pinia';

interface City {
    id: string;
    state: string;
    city: string;
    coords: {
        lat: string;
        lng: string;
    };
}

export const useSavedCitiesStore = defineStore('savedCities', {
    state: () => ({
        cities: [] as City[],
    }),
    getters: {
        getCityById: (state) => (id: string) => {
            return state.cities.find((city) => city.id === id);
        },
    },
    actions: {
        addCity(city: City) {
            this.cities.push(city);
        },
        removeCity(id: string) {
            const index = this.cities.findIndex((city) => city.id === id);
            if (index !== -1) {
                this.cities.splice(index, 1);
            }
        },
    },
});

export const useStore = () => {
    return useSavedCitiesStore();
};
