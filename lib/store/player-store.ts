import { create } from 'zustand'
import { Song } from '@/lib/models/song'

interface PlayerState {
  songs: Song[]
  currentSongIndex: number
  setSongs: (songs: Song[]) => void
  setCurrentSongIndex: (index: number) => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  songs: [],
  currentSongIndex: 0,
  setSongs: (songs) => set({ songs }),
  setCurrentSongIndex: (currentSongIndex) => set({ currentSongIndex }),
}))
