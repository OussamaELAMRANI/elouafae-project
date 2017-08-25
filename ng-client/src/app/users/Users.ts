export interface IUsers {
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  active: Boolean,
  group: [String],
  createdAt: Date,
  updatedAp: Date
};

export interface ISignUp {
  firstName: String,
  lastName: String,
  username: String,
  password: String,
}

export interface ILogIn {
  username: String,
  password: String,
}
