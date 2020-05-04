export interface RegisterUser {
  firstname: String;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

export interface RegisterUserResponse {
  email: String;
  firstname: String;
  id: String;
  lastname: String;
  role: String;
  username: String;
}
