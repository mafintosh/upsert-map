const UpsertMap = require('./')

const u = new UpsertMap(() => new Set(), s => !s.size)

u.upsert(10)
u.upsert(42).add(1)
u.upsert(40).add(2)

console.log(...u.values())
