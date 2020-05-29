module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'cloudcomputing',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
