import type { User } from "./User";

// Ett gränssnitt som representerar inloggningssvaret
export interface Login {
    success: boolean;
    expiry: number | undefined; // Profil returnerar ingen expiry vid förfrågan.
    user: User;
}