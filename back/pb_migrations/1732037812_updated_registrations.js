/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g18s7krl4xurtcn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gycjyk6y",
    "name": "arrivedAt",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g18s7krl4xurtcn")

  // remove
  collection.schema.removeField("gycjyk6y")

  return dao.saveCollection(collection)
})
