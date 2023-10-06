class Config {
  public connectionString: string;
  public port: number;

  constructor() {
    this.connectionString =
      "mongodb+srv://robbyzigi:HDW1cQUSuIWzJRqz@cluster0.fqvbapr.mongodb.net/UsersAndPlaces?retryWrites=true&w=majority";
    this.port = 5001;
  }
}

const config = new Config();

export default config;
