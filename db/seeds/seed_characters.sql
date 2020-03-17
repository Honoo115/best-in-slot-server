BEGIN;

    TRUNCATE
characters,
slots
RESTART
IDENTITY CASCADE;

    INSERT INTO characters
        (char_name, class_name)
    VALUES
        ('rugnard', 'shaman');

    INSERT INTO slots
        (slot_name, checked, char_id, slot_id)
    VALUES
        ('Mishundare, Circlet of the Mind Flayer', true, 1, 1),
        ('Choker of the Fire Lord', true, 1, 2),
        ('Deep Earth Spaulders', true, 1, 3),
        ('Cloak of the Brood Lord', true, 1, 4),
        ('Robe of Volatile Power', true, 1, 5),
        ('Bracers of Arcane Accuracy', true, 1, 6),
        ('Flarecore Leggings', true, 1, 7),
        ('Gauntlets of Ten Storms', true, 1, 8),
        ('Firemaw`s Clutch', true, 1, 9),
        ('Snowblind Shoes', true, 1, 10),
        ('Ring of Spellpower', true, 1, 11),
        ('Band of Forced Concentration', true, 1, 12),
        ('Neltharions Tear', true, 1, 13),
        ('Tailisman of Ephermeral Power', true, 1, 14),
        ('High Warlord`s Spellblade', true, 1, 15),
        ('Therazane`s Touch', true, 1, 16),
        (NULL, false, 1, 17);

    COMMIT;