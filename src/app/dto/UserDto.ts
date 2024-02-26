export interface UserDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age?: number; // le '?' rend ce champ optionnel
  }