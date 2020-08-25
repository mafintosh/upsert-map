module.exports = class UpsertMap {
  constructor (create, isEmpty) {
    this._create = create
    this._isEmpty = isEmpty || undefined
    this._map = new Map()
    this._gcKey = undefined
    this._gcVal = undefined
  }

  [Symbol.iterator] () {
    this.gc()
    return this._map[Symbol.iterator]()
  }

  get size () {
    this.gc()
    return this._map.size
  }

  values () {
    this.gc()
    return this._map.values()
  }

  keys () {
    this.gc()
    return this._map.keys()
  }

  upsert (key) {
    this.gc()
    let v = this._map.get(key)
    if (v !== undefined) return v
    v = this._create(key)
    this._map.set(key, v)
    if (this._isEmpty !== undefined) {
      this._gcKey = key
      this._gcVal = v
    }
    return v
  }

  set (key, val) {
    this.gc()
    this._map.set(key, val)
    if (this._isEmpty !== undefined) {
      this._gcKey = key
      this._gcVal = val
    }
  }

  get (key) {
    this.gc()
    const v = this._map.get(key)
    if (this._isEmpty !== undefined) {
      this._gcKey = key
      this._gcVal = v
    }
    return v
  }

  has (key) {
    this.gc()
    return this._map.has(key)
  }

  delete (key) {
    this.gc()
    this._map.delete(key)
  }

  gc () {
    if (this._gcVal !== undefined && this._isEmpty(this._gcVal)) {
      this._map.delete(this._gcKey)
      this._gcKey = this._gcVal = undefined
    }
  }
}
