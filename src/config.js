module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL:
        process.env.DATABASE_URL || 'postgresql://rugnard:shaman@localhost:9001/bism',

    TEST_DATABASE_URL:
        process.env.TEST_DATABASE_URL || 'postgresql://rugnard:shaman@localhost:9001/bism_test'
}