import Sequelize from 'sequelize';

const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'postgres',
  database: 'e2_left_kitty',
  username: 'postgres',
  password: null,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

const db = {
  Housemate: sequelize.import('./housemate')
}

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

// User.findAll().then(users => {
//   console.log(users)
// })

// needed to run the sequelize.sync in index
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db