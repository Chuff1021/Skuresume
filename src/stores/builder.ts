import { create } from "zustand";

interface BuilderState {
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  zoom: number;

  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  setZoom: (zoom: number) => void;
}

export const useBuilderStore = create<BuilderState>()((set) => ({
  leftSidebarOpen: true,
  rightSidebarOpen: true,
  zoom: 1,

  toggleLeftSidebar: () =>
    set((state) => ({ leftSidebarOpen: !state.leftSidebarOpen })),
  toggleRightSidebar: () =>
    set((state) => ({ rightSidebarOpen: !state.rightSidebarOpen })),
  setZoom: (zoom) => set({ zoom }),
}));
