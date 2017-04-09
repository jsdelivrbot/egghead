export interface Person {
  name: String;
}

export interface SocialNetwork {
  getUsers(): Person[];
}
