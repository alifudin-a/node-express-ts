import psql from "../domain/databases/postgresql";

const login = async (username: String) => {
  try {
    const results = await psql.query("SELECT * FROM auth WHERE username = $1", [
      username,
    ]);
    return results.rows[0];
  } catch (err) {
    console.log(err);
  }
};

export { login };
