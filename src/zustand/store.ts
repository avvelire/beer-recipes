import { create } from 'zustand';

type BeerProduction = {
  name: string;
  amount: {
    value: number;
    unit: string
  };
}

interface Ingredients{
  malt: BeerProduction[];
  hops: BeerProduction[];
  yeast: string,
}


export interface Beer {
  id: number;
  name: string;
  description: string;
  image_url: string;
  abv: number;
  first_brewed: string;
  ingredients: Ingredients;
  contributed_by: string;
  brewers_tips: string;
}

interface BeerStore{
  beers: Beer[];
  selectedBeers: Beer[];
  visibleItems: Beer[],
  page: number;
  fetchBeers: (page?: number) => Promise<void>;
  status: string;
  setSelectedBeers: (selectedBeers: Beer[]) => void
  setVisibleItems: (visibleItems: Beer[]) => void;
  setPage: (page: number) => void;
}

const useBeerStore = create<BeerStore>((set) => ({
  beers: [],
  selectedBeers: [],
  visibleItems: [],
  page: 1,
  status: 'loading',
  setVisibleItems: (visibleItems) => set(() => ({ visibleItems })),
  setSelectedBeers: selectedBeers => set(() => ({ selectedBeers})),
  setPage: (page) => set(() => ({ page })),

  fetchBeers: async (page?: number) => {
    try {
      const response = await fetch(`https://api.punkapi.com/v2/beers?page=${page ? page : 1}`);
      const data = await response.json();
      set({ beers: data });
      set({status: 'success'})
    } catch (error) {
      throw new Error('Something going wrong')
    }
  },
}));

export const useStore = useBeerStore;
