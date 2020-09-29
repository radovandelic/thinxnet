import { Issue } from '.'

let issue

beforeEach(async () => {
  issue = await Issue.create({ title: 'test', description: 'test', user: '12345', priority: 'low', status: 'open', assignedTo: '12345' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = issue.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(issue.id)
    expect(view.title).toBe(issue.title)
    expect(view.description).toBe(issue.description)
    expect(view.priority).toBe(issue.priority)
    expect(view.status).toBe(issue.status)
    expect(view.assignedTo).toBe(issue.assignedTo)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = issue.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(issue.id)
    expect(view.title).toBe(issue.title)
    expect(view.description).toBe(issue.description)
    expect(view.priority).toBe(issue.priority)
    expect(view.status).toBe(issue.status)
    expect(view.assignedTo).toBe(issue.assignedTo)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
