import { success, notFound } from '../../services/response/'
import { Agent } from '.'
import { Issue } from '../issue'

const assignIssue = async agent => {
  const openIssues = await Issue.find({ status: 'open', assignedTo: null })
  if (openIssues.length) {
    // assign first open issue to agent
    const firstOpenIssue = openIssues[0]
    firstOpenIssue.assignedTo = agent.id
    await firstOpenIssue.save()

    agent.issueId = firstOpenIssue.id
    agent.status = 'assigned'
    await agent.save()
  }
  return agent
}

const assignIssueIfAvailable = agent => agent && agent.status === 'available' ? assignIssue(agent) : agent

export const create = ({ bodymen: { body } }, res, next) =>
  Agent.create(body)
    .then(assignIssueIfAvailable)
    .then((agent) => agent.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Agent.count(query)
    .then(count => Agent.find(query, select, cursor)
      .then((agents) => ({
        count,
        rows: agents.map((agent) => agent.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Agent.findById(params.id)
    .then(notFound(res))
    .then((agent) => agent ? agent.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Agent.findById(params.id)
    .then(notFound(res))
    .then((agent) => agent ? Object.assign(agent, body).save() : null)
    .then(assignIssueIfAvailable)
    .then((agent) => agent ? agent.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Agent.findById(params.id)
    .then(notFound(res))
    .then((agent) => agent ? agent.remove() : null)
    .then(success(res, 204))
    .catch(next)
