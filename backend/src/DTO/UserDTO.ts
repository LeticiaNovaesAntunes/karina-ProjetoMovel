export interface UserDTO {
  email: string;
  senha: string;
}

export interface UpdateUserDTO {
  senha?: string;
  email?: string;
}
 
