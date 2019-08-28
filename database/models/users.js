module.exports = function getUserModel({ database }) {
  return {
    async getAll() {
      const users = await database.query('SELECT id, name, lastname, email, admin FROM users');
      return users.rows;
    },
    async signUp(userInformation) {
      const userDataToInsert = [
        userInformation.name,
        userInformation.lastname,
        userInformation.email,
        userInformation.password,
      ];

      const user = await database.query(`
        INSERT INTO users(name, lastname, email, password) values($1, $2, $3, $4) returning *`, userDataToInsert);

      return user.rows[0];
    },
    async signIn(email, password) {
      const userInformation = [
        email,
        password,
      ];

      const user = await database.query(`
        SELECT id, name, lastname, email, admin FROM users WHERE email=$1 AND password=$2`, userInformation);

      return user.rows[0]
    },
  };
};
