require('dotenv').config();
const app = require('../src/app');
const knex = require('knex');
// describe('App tests', () => {

//   it(`GET / responds with 200 containing 'Hello, world!'`, () => {
//     return (
//       supertest(app)
//         .get('/')
//         .expect(200, "Hello, world!")
//     );
//   });

// });

describe(`Character Endpoints`, () => {

    let db;

    // This runs before any tests
    before(`connect to db`, () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        });
        app.set('db', db);
    });




    // Before any test runs, clean the database
    before(`clean up database`, () => {
        return (
            db.raw(
                `TRUNCATE
            characters,
            slots
          `
            )
        )
    });

    // After every test 
    afterEach(`clean up database`, () => {
        return (
            db.transaction(transaction => {
                transaction.raw(
                    `TRUNCATE
            characters,
            slots
          `
                )
            })
        );
    });

    const character = [{
        char_name: "Test name",
        class_name: "Test class"
    }];


    beforeEach(`seed the database`, () => {
        return db.transaction(async trx => {
            const transactionResult = await trx.into('characters').insert(character);
            console.log(transactionResult.rows[0]);
            await trx.raw(
                `SELECT setval('characters_id_seq', ?)`,
                [character[character.length [1]].id]           // undefined
            );
        });
    });
    it(`Responds with 200 with an array of characters`, () => {
        const expectedCharacters = [
            {
                "id": 1,
                "char_name": "Test name",
                "class_name": "Test class",
                "slots": [
                    {
                        "id": 1,
                        "slot_name": null,
                        "checked": false,
                        "char_id": 1,
                        "slot_id": 1
                    },
                    {
                        "id": 2,
                        "slot_name": null,
                        "checked": false,
                        "char_id": 1,
                        "slot_id": 2
                    },
                    {
                        "id": 3,
                        "slot_name": null,
                        "checked": false,
                        "char_id": 1,
                        "slot_id": 3
                    },
                    {
                        "id": 4,
                        "slot_name": null,
                        "checked": false,
                        "char_id": 1,
                        "slot_id": 4
                    },
                    {
                        "id": 5,
                        "slot_name": null,
                        "checked": false,
                        "char_id": 1,
                        "slot_id": 5
                    },
                    {
                        "id": 6,
                        "slot_name": null,
                        "checked": false,
                        "char_id": 1,
                        "slot_id": 6
                    },
                    {
                        "id": 7,
                        "slot_name": null,
                        "checked": false,
                        "char_id": 1,
                        "slot_id": 7
                    },
                    {
                        "id": 8,
                        "slot_name": null,
                        "checked": false,
                        "char_id": 1,
                        "slot_id": 8
                    },
                    {
                        "id": 9,
                        "slot_name": null,
                        "checked": false,
                        "char_id": 1,
                        "slot_id": 9
                    },
                    {
                        "id": 10,
                        "slot_name": null,
                        "checked": false,
                        "char_id": 1,
                        "slot_id": 10
                    },
                    {
                        "id": 11,
                        "slot_name": null,
                        "checked": false,
                        "char_id": 1,
                        "slot_id": 11
                    },
                    {
                        "id": 12,
                        "slot_name": null,
                        "checked": false,
                        "char_id": 1,
                        "slot_id": 12
                    },
                    {
                        "id": 13,
                        "slot_name": null,
                        "checked": false,
                        "char_id": 1,
                        "slot_id": 13
                    },
                    {
                        "id": 14,
                        "slot_name": null,
                        "checked": false,
                        "char_id": 1,
                        "slot_id": 14
                    },
                    {
                        "id": 15,
                        "slot_name": null,
                        "checked": false,
                        "char_id": 1,
                        "slot_id": 15
                    },
                    {
                        "id": 16,
                        "slot_name": null,
                        "checked": false,
                        "char_id": 1,
                        "slot_id": 16
                    },
                    {
                        "id": 17,
                        "slot_name": null,
                        "checked": false,
                        "char_id": 1,
                        "slot_id": 17
                    }
                ]
            }
        ];
        return (
            supertest(app)
                .get('/character')
                .expect(200, expectedCharacters)
        )
    });

    // This runs after everything is done
    after(`disconnect from db`, () => {
        return db.destroy();
    });

});
