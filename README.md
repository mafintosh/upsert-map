# upsert-map

A Map with an upsert method that is like a "get or set" method.
Also supports gc'ing empty upserts.

```
npm install upsert-map
```

## Usage

``` js
const UpsertMap = require('upsert-map')

const map = new UpsertMap(() => new Set(), set => !set.size)

map.upsert(10).add(1)
map.upsert(10).add(2)
console.log(...m.values()) // new Set(1, 2)
map.get(10).delete(1)
map.get(10).delete(1)
console.log(...m.values()) // <empty>
```

## API

#### `m = new UpsertMap(createValue, isEmpty)`

Make a new upsert map.

* `createValue(key)` should return a value to be upserted for a key.
* `isEmpty(val)` can optionally be added for auto gc of empty values.

#### `val = m.upsert(key)`

Returns the value for key if already exists, otherwise it is created
and inserted into the map.

#### `val = m.get(key)`

Similar to Map.get

#### `bool = m.has(key)`

Similar to Map.has

#### `m.delete(key)`

Similar to Map.delete

#### `size = m.size`

Similar to Map.size

#### `iterator = m.values()`

Similar to Map.values()

#### `iterator = m.keys()`

Similar to Map.keys()

#### `iterator = m[Symbol.iterator]()`

Similar to Map[Symbol.iterator]()

## License

MIT
