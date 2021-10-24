const db = require("../../data/db-config");
const request = require("supertest");
const server = require('../server')
const Users = require('./usersmodel')

const listOfUsers= [{ id: 1,  email: "test1@123.com", name: "test", password: "1234", role: "instructor" },
{
  id: 2,
  email: "test2@123.com",
  name: "Drew",
  password: "1234",
  role: "client"
},]

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
  })
  beforeEach(async () => {
    await db('users').truncate()
  })
  afterAll(async () => {
    await db.destroy()
  })

//Model test
describe('Users', () => {
    describe('sanity', () => {
        test('Users is defined', () => {
          expect(Users).toBeDefined()
        })
      }) 
      describe('findAll()', () => {
        it('resolves to list of users', async () => {
          let users = await Users.findAll()
          expect(users).toHaveLength(0)
          await db('users').insert({ email: 'testUser@gmail.com',password:'1234' })
          users = await Users.findAll()
          expect(users).toHaveLength(1)
          await db('users').insert({ email: 'testUser2@gmail.com',password: '1234' })
          users = await Users.findAll()
          expect(users).toHaveLength(2)
        })
        it('resolves to users of the correct shape, password not returned', async () => {
          await db('users').insert({ email: 'testUser@gmail.com',password: '1234' })
          let users = await Users.findAll()
          expect(users).toMatchObject([{ email: 'testUser@gmail.com', id: 1}])
        })
      })


});



//API test
describe('GET /users', () => {
    beforeEach(async () => {
        await db('users').insert(listOfUsers)
      })
      it('responds with a 200 OK', async () => {
        const res = await request(server).get('/api/users')
        expect(res.status).toBe(200)
      })
});

// restricted middleware is working and will return 401 when it is included in the route. it has been removed for testing. It could be tested fully by duplicating the tests in auth.test in the test here before the request is sent
