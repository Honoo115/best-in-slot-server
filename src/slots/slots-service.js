const SlotsService = {
    getSlots(knex) {
        return knex.select("*").from("slots")
    },
    getSlot(knex, id) {
        return knex
            .select("*")
            .from("slots")
            .where("id", id)
            .first();
    },
    addSlot(knex, slot) {
        return knex
            .insert(slot)
            .into('slots')
            .returning("*")
            .then(slots => {
                return slots[0]
            });
    },
    patchSlot(knex, id, slot) {
        return knex("slots AS slot")
            .where("slot.id", id)
            .update(slot)
    },
    deleteSlot(knex, id, ) {
        return knex("slots")
            .where({ id })
            .delete();
    }
}
module.exports = SlotsService;