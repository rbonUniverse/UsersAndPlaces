class Config {
  public connectionString: string;
  public port: number;

  constructor() {
    this.connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fqvbapr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    this.port = 5001;
  }
}

const config = new Config();

export default config;
