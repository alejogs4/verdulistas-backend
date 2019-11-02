module.exports = function getUserModel({ database }) {
  return {
    async getAll() {
      const users = await database.query('SELECT id, name, lastname, email, admin, bond, referral_code FROM users');
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

      const userReferralCode = (`${userInformation.name} ${userInformation.lastname.toLowerCase()} ${user.rows[0].id}`).split(' ').map(
        (str) => str.toLowerCase(),
      ).join('-');

      await database.query('UPDATE users SET referral_code = $1 where id = $2', [userReferralCode, user.rows[0].id]);
      const userInfo = { ...user.rows[0], referral_code: userReferralCode };

      return userInfo;
    },
    async signIn(email, password) {
      const userInformation = [
        email,
        password,
      ];

      const user = await database.query(`
        SELECT id, name, lastname, email, admin, bond, referral_code FROM users WHERE email=$1 AND password=$2`, userInformation);
      return user.rows[0];
    },
    async getProfile(id) {
      const user = await database.query('SELECT id, name, lastname, email, admin, bond, referral_code FROM users WHERE id=$1', [id]);
      return user.rows[0];
    },
    async getUserByReferralCode(referralCode) {
      const user = await database.query('SELECT id FROM users WHERE referral_code=$1', [referralCode]);
      return user.rows[0];
    },
    async updateUserBond({ points = 0, userId, bond } = {}) {
      const userBond = Math.floor(points / 10);

      let user;
      if (typeof bond === 'number' && bond >= 0) {
        user = await database.query(`
        UPDATE users SET bond = $1 WHERE id = $2 returning *`, [bond, userId]);
      } else {
        user = await database.query(`
        UPDATE users SET bond = bond + $1 WHERE id = $2 returning *`, [userBond, userId]);
      }
      return user.rows[0];
    },
  };
};
