import psql from "../domain/databases/postgresql";

const getTodos = async (): Promise<any> => {
  try {
    const results = await psql.query("SELECT * FROM todos");
    return results.rows;
  } catch (err) {
    console.log(err);
  }
};

const getTodo = async (id: Number): Promise<any> => {
  try {
    const results = await psql.query("SELECT * FROM todos WHERE id = $1", [id]);
    return results.rows[0]
  } catch (err) {
    console.log(err);
  }
};

const deleteTodo = async (id: Number) => {
  try {
    await psql.query("DELETE FROM todos WHERE id = $1", [id]);
  } catch (err) {
    console.log(err);
  }
};

const createTodo = async (
  task: String,
  isDone: Boolean,
  Owner: Number
): Promise<any> => {
  try {
    const results = await psql.query(
      "INSERT INTO todos (task, is_done, owner) values ($1, $2, $3) RETURNING *",
      [task, isDone, Owner]
    );
    return results.rows[0];
  } catch (err) {
    console.log(err);
  }
};

const updateTodo = async (
  Id: Number,
  task: String,
  isDone: Boolean
): Promise<any> => {
  try {
    const results = await psql.query(
      "UPDATE todos SET task = $1, is_done = $2 WHERE id = $3 RETURNING *",
      [task, isDone, Id]
    );
    return results.rows[0];
  } catch (err) {
    console.log(err);
  }
};

export { getTodos, getTodo, deleteTodo, createTodo, updateTodo };
