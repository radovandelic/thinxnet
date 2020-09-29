import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Issue, { schema } from './model'

const router = new Router()
const { title, description, user, priority, status, assignedTo } = schema.tree

/**
 * @api {post} /issues Create issue
 * @apiName CreateIssue
 * @apiGroup Issue
 * @apiDescription Creates a new issue and immediately assigns it to the first available agent, if any are available
 * @apiParam {string} title Issue's title.
 * @apiParam {string} description Issue's description.
 * @apiParam {string} user Id of user reporting issue
 * @apiParam {string="low","medium","high"} priority Issue's priority.
 * @apiParam {string="open","closed"} status  Issue's status.
 * @apiParam {string} [assignedTo] Id of the agent the issue is assigned to.
 * @apiSuccess {Object} issue Issue's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Issue not found.
 */
router.post('/',
  body({ title, description, user, priority, status, assignedTo }),
  create)

/**
 * @api {get} /issues Retrieve issues
 * @apiName RetrieveIssues
 * @apiGroup Issue
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of issues.
 * @apiSuccess {Object[]} rows List of issues.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /issues/:id Retrieve issue
 * @apiName RetrieveIssue
 * @apiGroup Issue
 * @apiSuccess {Object} issue Issue's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Issue not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /issues/:id Update issue
 * @apiName UpdateIssue
 * @apiGroup Issue
 * @apiDescription Updates an issue, if the issue is closed the assigned agent is assigned to the next open issue, if any
 * @apiParam {string} title Issue's title.
 * @apiParam {string} description Issue's description.
 * @apiParam {string} user Id of user reporting issue
 * @apiParam {string="low","medium","high"} priority Issue's priority.
 * @apiParam {string="open","closed"} status  Issue's status.
 * @apiParam {string} [assignedTo] Id of the agent the issue is assigned to.
 * @apiSuccess {Object} issue Issue's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Issue not found.
 */
router.put('/:id',
  body({ title, description, priority, status, assignedTo }),
  update)

/**
 * @api {delete} /issues/:id Delete issue
 * @apiName DeleteIssue
 * @apiGroup Issue
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Issue not found.
 */
router.delete('/:id',
  destroy)

export default router
