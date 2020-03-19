const express = require("express");
const xss = require("xss");
const CharacterService = require('./characters-service')
const SlotsService = require('../slots/slots-service')
const jsonParser = express.json();
const charactersRoute = express.Router()




charactersRoute
    .route('/character')
    .get((req, res, next) => {
        CharacterService.getCharacters(req.app.get('db'))
            .then(characters => {
                console.log(characters);
                SlotsService.getSlots(req.app.get('db'))
                    .then(slots => {
                        characters.forEach(character => {
                            // Mapping over each character

                            // We're going to filter and only return the slots for the character
                            let char_slots = slots.filter(slot => {
                                return slot.char_id === character.id
                            });

                            // If these values are updated, they get returned out of order via the query
                            // We run a basic sort on the ID of them to make sure they always return numerically sorted by ID
                            char_slots.sort((a, b) => {
                                return a.id - b.id;
                            });
                            character.slots = char_slots;
                        });
                        res.json(characters);
                    })
            })
            .catch(next)
    })



    .post(jsonParser, (req, res, next) => {
        const { char_name, class_name } = req.body
        const newNames = { char_name, class_name }
        CharacterService.addCharacter(req.app.get('db'), newNames)
            .then(character => {
                for (let i = 1; i <= 17; i++) {
                    const slot = {
                        slot_name: null,
                        checked: false,
                        char_id: character.id,
                        slot_id: i
                    };
                    SlotsService.addSlot(
                        req.app.get('db'),
                        slot
                    );
                }
                res
                    .status(201)
                    .location(`/character/${character.id}`)
                    .json(character)
            })
    })
charactersRoute
    .route('/character/:id')
    .get((req, res, next) => {
        CharacterService.getCharacter(req.app.get('db'), req.params.id)
            .then(character => {
                if (!character) {
                    return res.status(404).json({
                        error: { message: `Character doesn't exist` }
                    });
                }
                SlotsService.getSlots(req.app.get('db'))
                    .then(slots => {
                        const char_slots = slots.filter(slot => {
                            return slot.char_id === character.id
                        })
                        character.slots = char_slots
                        res.json(character)
                        next();
                    })
            })
            .catch(next)
    })
    .patch((req, res, next) => {
        CharacterService.patchCharacter(req.app.get('db'),
            req.params.character_id, characterToPatch)
            .then(res.status(204).end())
            .catch(next)
    })
    .delete((req, res, next) => {
        CharacterService.deleteCharacter(req.app.get('db'),
            req.params.id)
            .then(res.status(204).end())
            .catch(next)
    });
module.exports = charactersRoute