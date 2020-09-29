import { assignIssueIfUnassigned, __RewireAPI__ as controller } from './controller'

const testAgent = {
  name: 'testagent',
  id: 'someid',
  status: 'available',
  save: () => {}
}

const testIssue = {
  name: 'test',
  id: 'someid2',
  status: 'open',
  save: () => {}
}

beforeAll(done => {
  controller.__Rewire__('Agent', {
    find: () => [testAgent]
  })

  done()
})

test('assignIssueIfUnassigned should assign an agent if one is unassigned', async done => {
  const res = await assignIssueIfUnassigned({ ...testIssue })
  expect(res.title).toEqual(testIssue.title)
  expect(res.assignedTo).toEqual(testAgent.id)
  expect(testAgent.issueId).toEqual(testIssue.id)
  done()
})

test('assignIssueIfUnassigned should return unchanged issue if agent if already assigned', async done => {
  const res = await assignIssueIfUnassigned({ ...testIssue, assignedTo: 'someotheragentid' })
  expect(res.title).toEqual(testIssue.title)
  expect(res.assignedTo).not.toEqual(testAgent.id)
  expect(res.assignedTo).toEqual('someotheragentid')
  done()
})
