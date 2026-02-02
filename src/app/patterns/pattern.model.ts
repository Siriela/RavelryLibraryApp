export interface Pattern {
  id: string;
  title: string;
  color: string,
  permalink: string;
  spectrum_order: number;
  free: boolean;
  first_photo: {
    medium_url: string,
    square_url: string
  };

  //current_user?: {name: string}
}

export interface User {
  id?: string;
  username?: string;
  tiny_photo_url?: string;
  small_photo_url?: string;
  photo_url?: string;
  large_photo_url?: string;
}
