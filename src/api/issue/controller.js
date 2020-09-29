import { success, notFound } from '../../services/response/'
import { Issue } from '.'
import { Agent } from '../agent'

const assignIssue = async issue => {
  const availableAgents = await Agent.find({ status: 'available' })
  if (availableAgents.length) {
    // assign issue to first available agent if any agent is available
    const firstAvailableAgent = availableAgents[0]
    issue.assignedTo = availableAgents[0].id
    await issue.save()

    firstAvailableAgent.issueId = issue.id
    firstAvailableAgent.status = 'assigned'
    await firstAvailableAgent.save()
  }
  return issue
}

const assignIssueIfUnassigned = issue => issue && !issue.assignedTo ? assignIssue(issue) : issue

const assignNextIssue = async issue => {
  const agent = await Agent.findById(issue.assignedTo)
  const openIssues = await Issue.find({ status: 'open', assignedTo: null })
  if (openIssues.length) {
    // assign first open issue to agent
    const firstOpenIssue = openIssues[0]
    firstOpenIssue.assignedTo = agent.id
    await firstOpenIssue.save()

    agent.issueId = firstOpenIssue.id
    agent.status = 'assigned'
    await agent.save()
    return issue
  }
  // mark agent as available if there are no open issues
  agent.status = 'available'
  await agent.save()

  return issue
}

const assignNextIssueIfClosed = issue => issue && issue.status === 'closed' ? assignNextIssue(issue) : issue

export const create = ({ bodymen: { body } }, res, next) =>
  Issue.create(body)
    .then(assignIssueIfUnassigned)
    .then((issue) => issue.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Issue.count(query)
    .then(count => Issue.find(query, select, cursor)
      .then((issues) => ({
        count,
        rows: issues.map((issue) => issue.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Issue.findById(params.id)
    .then(notFound(res))
    .then((issue) => issue ? issue.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Issue.findById(params.id)
    .then(notFound(res))
    .then((issue) => issue ? Object.assign(issue, body).save() : null)
    .then(assignNextIssueIfClosed)
    .then((issue) => issue ? issue.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Issue.findById(params.id)
    .then(notFound(res))
    .then((issue) => issue ? issue.remove() : null)
    .then(success(res, 204))
    .catch(next)
