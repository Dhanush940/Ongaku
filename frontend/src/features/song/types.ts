export interface Song {
  _id: string;
  title: string;
  name: string; // Artist name
  image: string; // Cover image URL
  song: string; // Audio file URL
  duration?: number;
  public_id?: string; // Cloudinary public_id?
  createdAt?: string;
  artist?: string; // Sometimes APIs return artist instead of name
}

export interface SongState {
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  deleteLoading: boolean;
  deleteError: string | null;
  successMessage: string | null;
}
