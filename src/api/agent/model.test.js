import { Agent } from '.'

let agent

beforeEach(async () => {
  agent = await Agent.create({ name: 'test', email: 'test@byom.de', status: 'available', issueId: '12345' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = agent.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(agent.id)
    expect(view.name).toBe(agent.name)
    expect(view.email).toBe(agent.email)
    expect(view.status).toBe(agent.status)
    expect(view.issueId).toBe(agent.issueId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = agent.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(agent.id)
    expect(view.name).toBe(agent.name)
    expect(view.email).toBe(agent.email)
    expect(view.status).toBe(agent.status)
    expect(view.issueId).toBe(agent.issueId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
