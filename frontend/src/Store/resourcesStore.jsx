import { create } from "zustand";
import { resources as mockData } from "../Data/resources.jsx";

const useResourcesStore = create((set, get) => ({
  resources: [],
  filteredResources: [],
  loading: false,
  error: null,
  filters: {
    query: "",
    type: [], // Start with an empty array, no filters initially
    language: null,
  },

  fetchResources: async () => {
    set({ loading: true, error: null });
    try {
      set({
        resources: mockData,
        filteredResources: mockData,
        loading: false,
      });
      get().applyFilters(); // Apply filters after fetching data
    } catch (error) {
      set({
        error: "Failed to fetch resources",
        loading: false,
      });
    }
  },

  getResourceById: (id) => {
    return get().resources.find((resource) => resource.id === id);
  },

  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }));
    get().applyFilters(); // Reapply filters after setting new filter
  },

  resetFilters: () => {
    set({
      filters: {
        query: "",
        type: [], // Reset type filters
        language: null,
      },
    });
    get().applyFilters(); // Reapply filters after resetting
  },

  applyFilters: () => {
    const { resources, filters } = get();

    console.log("Applying filters with:", filters);

    let filtered = [...resources];

    // Apply query filter
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query)
      );
    }

    // Apply type filter
    if (filters.type.length > 0) {
      filtered = filtered.filter((resource) => {
        console.log("Checking resource type:", resource.type); // Debug the resource type
        return filters.type.includes(resource.type.toLowerCase()); // Ensure lowercase comparison
      });
    }

    // Apply language filter
    if (filters.language) {
      filtered = filtered.filter((resource) =>
        resource.languages.includes(filters.language)
      );
    }

    console.log("Filtered result:", filtered); // Debug filtered result
    set({ filteredResources: filtered });
  },
}));

export default useResourcesStore;