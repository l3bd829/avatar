import { create } from 'zustand';
import PocketBase from 'pocketbase';

const pocketBaseUrl = import.meta.env.VITE_POCKETBASE_URL;
if (!pocketBaseUrl) {
    throw new Error("VITE_POCKETBASE_URL is required");
}

export const pb = new PocketBase(pocketBaseUrl);

export const useConfiguratorStore = create((set) => ({
    categories: [],
    currentCategory: null,
    assets: [],
    customization: {},
    fetchCategories: async () => {
        try {
            const categories = await pb.collection('CustomizationGroups').getFullList({
                sort: "+position",
            });
            const assets = await pb.collection('CustomizationAssets').getFullList({
                sort: "-created",
            });
            const customization = {};
            categories.forEach((category) => {
                category.assets = assets.filter((asset) => asset.group === category.id);
                customization[category.name] = {};
            });

            set({ categories, currentCategory: categories[0], assets, customization });
        } catch (error) {
            console.error("Failed to fetch categories or assets:", error);
        }
    },
    setCurrentCategory: (category) => set({ currentCategory: category }),
    changeAsset: (category, asset) => 
        set((state) => ({
            customization: {
                ...state.customization,
                [category]: {
                    ...state.customization[category],
                    asset,
                },
            },
        })),
}));