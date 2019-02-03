import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();


const pool = new pg.Pool(
    {
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT
    }
);

pool.on('connect', () => {
    console.log('connected to the Database');
});

const users = async () => {
    const userTable = `
    CREATE TABLE IF NOT EXISTS 
    users(
        user_id SERIAL PRIMARY KEY,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        othernames VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        username VARCHAR(128) NOT NULL,
        phoneNumber VARCHAR(128) NOT NULL,
        is_admin BOOLEAN NOT NULL,
        passportUrl VARCHAR(128) NOT NULL,
        UNIQUE(username, email)
        );`;
    await pool.query(userTable)
        .then((res) => {
            // console.log('users table created!: ', res);
        }).catch((err) => {
            console.log('An error occured while creating users table: ', err);
            pool.end();
        });
};

const office = async () => {
    const officeTable = `
    CREATE TABLE IF NOT EXISTS 
    offices(
        office_id SERIAL PRIMARY KEY,
        type VARCHAR NOT NULL,
        name VARCHAR NOT NULL
        );`;
    await pool.query(officeTable)
        .then((res) => {
            // console.log('office table created!: ', res);
        }).catch((err) => {
            console.log('An error occured while creating office table: ', err);
            pool.end();
        });
};

const party = async () => {
    const partyTable = `
        CREATE TABLE IF NOT EXISTS 
        parties(
          party_id SERIAL PRIMARY KEY,
          name VARCHAR NOT NULL,
          hqAddress VARCHAR NOT NULL,
          logoUrl VARCHAR NOT NULL
        );`;
    await pool.query(partyTable)
        .then((res) => {
            // console.log('party table created!: ', res);
        }).catch((err) => {
            console.log('An error occured while creating party table: ', err);
            pool.end();
        });
};

const candidate = async () => {
    const candidateTable = `
    CREATE TABLE IF NOT EXISTS 
    candidates(
      candidate_id SERIAL NOT NULL UNIQUE,
      office INTEGER,
      qualification VARCHAR(29) NOT NULL,
      party INTEGER,
      createdBy INTEGER,
      FOREIGN KEY (party) REFERENCES parties(party_id),
      FOREIGN KEY (createdBy) REFERENCES users(user_id),
      FOREIGN KEY (office) REFERENCES offices(office_id),
      PRIMARY KEY (createdBy, office)
    );`;
    await pool.query(candidateTable)
        .then((res) => {
            console.log('candidate table created!: ', res);
        }).catch((err) => {
            console.log('An error occured while creating candidate table: ', err);
            pool.end();
        });
};

const vote = async () => {
    const voteTable = `
    CREATE TABLE IF NOT EXISTS 
    votes(
      vote_id SERIAL NOT NULL UNIQUE,
      createdOn DATE NOT NULL,
      createdBy INTEGER,
      candidate INTEGER,
      office INTEGER,
      FOREIGN KEY (createdBy) REFERENCES users(user_id),
      FOREIGN KEY (office) REFERENCES offices(office_id),
      FOREIGN KEY (candidate) REFERENCES candidates(candidate_id),
      PRIMARY KEY (office, createdBy)

    );`;
    await pool.query(voteTable)
        .then((res) => {
            console.log('vote table created!: ', res);
        }).catch((err) => {
            console.log('An error occured while creating vote table: ', err);
            pool.end();
        });
};


const petition = async () => {
    const petitionTable = `
    CREATE TABLE IF NOT EXISTS 
    petitions(
      petition_id SERIAL PRIMARY KEY,
      createdOn DATE NOT NULL,
      createdBy INTEGER REFERENCES users(user_id),
      office INTEGER REFERENCES offices(office_id),
      body VARCHAR NOT NULL,
      evidence VARCHAR
    );`;
    await pool.query(petitionTable)
        .then((res) => {
            console.log('petition table created!: ', res);
        }).catch((err) => {
            console.log('An error occured while creating petition table: ', err);
            pool.end();
        });
};


export default { pool, users, office, petition, party, vote, candidate };
