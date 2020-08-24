const test = require('tape')

const UpsertMap = require('.')

test('get/has/delete', t => {
  const m = new UpsertMap(() => ({ world: 0 }))
  const x = m.upsert('hello')
  t.same(x.world, 0)
  t.true(m.has('hello'))
  m.delete('hello')
  t.false(m.has('hello'))
  t.end()
})
