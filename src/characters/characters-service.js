const CharactersService = {
    getCharacters(knex) {
        return knex.select("*").from("characters")
    },
    getCharacter(knex, id) {
        return knex
            .select("*")
            .from("characters")
            .where("id", id)
            .first();

    },
    addCharacter(knex, character) {
        return knex
            .insert(character)
            .into('characters')
            .returning("*")
            .then(characters => {
                return characters[0]
            });
    },
    patchCharacter(knex, id, character) {
        return knex("characters")
            .where({ id })
            .patch(character)
    },
    deleteCharacter(knex, id) {
        return knex("characters")
            .where({ id })
            .delete()
    }
}
module.exports = CharactersService;