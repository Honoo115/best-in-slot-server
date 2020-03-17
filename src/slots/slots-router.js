const express = require("express");
const xss = require("xss");
const SlotsService = require('./slots-service')
const jsonParser = express.json();
const slotsRoute = express.Router()

const serializeSlot = slot => ({
    ...slot,
    slot_name: xss(slot.slot_name)
})

slotsRoute
    .route('/:character_id/slots')
    .get((req, res, next) => {
        SlotsService.getSlots(req.app.get('db'))
            .then(slots => {
                res.json(slots.map(slot => {
                    return serializeSlot(slot)
                }))
            })
            .catch(next)
    })

slotsRoute
    .route('/:character_id/slots/:slot_id')
    .get((req, res) => {
        SlotsService.getSlot(req.app.get('db'))
            .then(slot => {
                res.json(slot.map(slot => {
                    return serializeSlot(slot)
                }))
            })
    })
    .post(jsonParser, (req, res) => {
        const { slot_name } = req.body
        const newContent = { slot_name }

        for (const [key, value] of Object.entries(newContent))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })
        SlotsService.addSlot(req.app.get('db'), newContent)
            .then(slot => {
                res
                    .status(201)
                    .location(`/:character_id/${slot.id}`)
                    .json(slot)
            })

    })
    .patch(jsonParser, (req, res, next) => {
        const knexInst = req.app.get('db');
        const {
            slot_name
        } = req.body;
        const slotnameInput = {
            slot_name
        }
        for (const [key, value] of Object.entries(slotnameInput))
            if (value == null)
                return res.status(400).json({
                    error: `missing ${key} in request body`
                });
        if (slot_name) {
            slotnameInput.slot_name = slot_name
        };
        SlotsService.patchSlot(
            knexInst,
            req.params.id,
            slotnameInput
        )
            .then(slot_id => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl + `/${slot_id}`))
                    .json(SlotsService.serializeSlot(slot_id))
            })
            .catch(next);
    })
module.exports = slotsRoute