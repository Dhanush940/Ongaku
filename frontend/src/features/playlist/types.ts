import { Song } from "../song/types";

export interface Playlist {
  _id: string;
  name: string;
  songs: Song[];
  playlistSongs?: Song[]; // Backend uses this field name in some responses
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PlaylistState {
  playlists: Playlist[];
  loading: boolean;
  error: string | null;
  selectedPlaylist: Playlist | null;
  // ... other potential state properties
  createPlaylistLoading: boolean;
  createPlaylistError: string | null;
  deletePlaylistLoading: boolean;
  renamePlaylistLoading: boolean;
  addSongsLoading: boolean;
  removeSongsLoading: boolean;
}
