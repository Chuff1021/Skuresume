import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { temporal } from "zundo";
import type { ResumeData } from "@/types/resume";

export interface ResumeState {
  // Data
  id: string | null;
  name: string;
  data: ResumeData | null;

  // Status
  isReady: boolean;
  isDirty: boolean;
  isSaving: boolean;
  lastSavedAt: Date | null;

  // Actions
  initialize: (id: string, name: string, data: ResumeData) => void;
  setName: (name: string) => void;
  updateData: (updater: (data: ResumeData) => void) => void;
  markSaving: () => void;
  markSaved: () => void;
  markDirty: () => void;
}

export const useResumeStore = create<ResumeState>()(
  temporal(
    immer((set) => ({
      id: null,
      name: "",
      data: null,
      isReady: false,
      isDirty: false,
      isSaving: false,
      lastSavedAt: null,

      initialize: (id, name, data) => {
        set((state) => {
          state.id = id;
          state.name = name;
          state.data = data;
          state.isReady = true;
          state.isDirty = false;
        });
      },

      setName: (name) => {
        set((state) => {
          state.name = name;
          state.isDirty = true;
        });
      },

      updateData: (updater) => {
        set((state) => {
          if (state.data) {
            updater(state.data);
            state.isDirty = true;
          }
        });
      },

      markSaving: () => {
        set((state) => {
          state.isSaving = true;
        });
      },

      markSaved: () => {
        set((state) => {
          state.isSaving = false;
          state.isDirty = false;
          state.lastSavedAt = new Date();
        });
      },

      markDirty: () => {
        set((state) => {
          state.isDirty = true;
        });
      },
    })),
    {
      limit: 100,
      equality: (pastState, currentState) =>
        JSON.stringify(pastState.data) === JSON.stringify(currentState.data),
    }
  )
);
