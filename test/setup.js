process.env.NODE_ENV = 'test';

require('dotenv').config();

process.env.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL
  || "postgresql://rugnard:shaman@localhost:9001/bism_test"

const { expect } = require('chai');
const supertest = require('supertest');

global.expect = expect;
global.supertest = supertest;