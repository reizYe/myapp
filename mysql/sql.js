var UserSQL = {
    insert: 'INSERT INTO login(name,password,status) VALUES(?,?,?)',
    queryAll: 'SELECT * FROM login',
    getUserById: 'SELECT * FROM login WHERE name = ? ',
};
module.exports = UserSQL;