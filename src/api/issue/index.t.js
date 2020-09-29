import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Issue } from '.'

const app = () => express(apiRoot, routes)

let issue

beforeEach(async () => {
  issue = await Issue.create({})
})

test('POST /issues 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ title: 'test', description: 'test', priority: 'test', status: 'test', assignedTo: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.priority).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.assignedTo).toEqual('test')
})

test('GET /issues 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /issues/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${issue.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(issue.id)
})

test('GET /issues/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /issues/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${issue.id}`)
    .send({ title: 'test', description: 'test', priority: 'test', status: 'test', assignedTo: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(issue.id)
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.priority).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.assignedTo).toEqual('test')
})

test('PUT /issues/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ title: 'test', description: 'test', priority: 'test', status: 'test', assignedTo: 'test' })
  expect(status).toBe(404)
})

test('DELETE /issues/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${issue.id}`)
  expect(status).toBe(204)
})

test('DELETE /issues/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
