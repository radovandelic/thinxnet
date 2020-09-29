import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Agent } from '.'

const app = () => express(apiRoot, routes)

let agent

beforeEach(async () => {
  agent = await Agent.create({})
})

test('POST /agents 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', email: 'test', status: 'test', issueId: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.issueId).toEqual('test')
})

test('GET /agents 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /agents/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${agent.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(agent.id)
})

test('GET /agents/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /agents/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${agent.id}`)
    .send({ name: 'test', email: 'test', status: 'test', issueId: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(agent.id)
  expect(body.name).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.issueId).toEqual('test')
})

test('PUT /agents/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', email: 'test', status: 'test', issueId: 'test' })
  expect(status).toBe(404)
})

test('DELETE /agents/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${agent.id}`)
  expect(status).toBe(204)
})

test('DELETE /agents/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
