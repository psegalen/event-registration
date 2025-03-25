/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g18s7krl4xurtcn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kc7ycwi7",
    "name": "eventId",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "bxmto3w3ijl1e88",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g18s7krl4xurtcn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kc7ycwi7",
    "name": "event",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "bxmto3w3ijl1e88",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
