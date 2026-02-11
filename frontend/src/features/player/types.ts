/**
 * Subset of Song fields stored in the player.
 * Unlike Song, `_id` is not required because the player
 * can receive data without it (e.g. from previousSong/nextSong helpers).
 */
export interface CurrentSong {
  title: string;
  name: string;
  image: string;
  song: string;
  duration?: number;
}

export interface PlayerState {
  currentSong: CurrentSong | null;
}
