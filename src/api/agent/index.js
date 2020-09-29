import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Agent, { schema } from './model'

const router = new Router()
const { name, email, status, issueId } = schema.tree

/**
 * @api {post} /agents Create agent
 * @apiName CreateAgent
 * @apiGroup Agent
 * @apiDescription Creates an agent and immediately assigns him to the first open issue if any
 * @apiParam {string} name Agent's name.
 * @apiParam {string} email Agent's email.
 * @apiParam {string="offline","available","assigned"} status Agent's status.
 * @apiParam {string} issueId Id of issue assigned to Agent (if any)
 * @apiSuccess {Object} agent Agent's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Agent not found.
 */
router.post('/',
  body({ name, email, status, issueId }),
  create)

/**
 * @api {get} /agents Retrieve agents
 * @apiName RetrieveAgents
 * @apiGroup Agent
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of agents.
 * @apiSuccess {Object[]} rows List of agents.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /agents/:id Retrieve agent
 * @apiName RetrieveAgent
 * @apiGroup Agent
 * @apiSuccess {Object} agent Agent's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Agent not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /agents/:id Update agent
 * @apiName UpdateAgent
 * @apiGroup Agent
 * @apiDescription Updates an agent and if his status is "available", he is immediately assigned to the first open issue
 * @apiParam {string} name Agent's name.
 * @apiParam {string} email Agent's email.
 * @apiParam {string="offline","available","assigned"} status Agent's status.
 * @apiParam {string} issueId Id of issue assigned to Agent (if any)
 * @apiSuccess {Object} agent Agent's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Agent not found.
 */
router.put('/:id',
  body({ name, email, status, issueId }),
  update)

/**
 * @api {delete} /agents/:id Delete agent
 * @apiName DeleteAgent
 * @apiGroup Agent
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Agent not found.
 */
router.delete('/:id',
  destroy)

export default router
