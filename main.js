'use strict'

var Commands = require('./commands.js')
var Cli = require('./cli.js')
var JSONBuilder = require('./JSONBuilder.js')
var DataObject = require('./dataObject.js')

var dataObject = new DataObject()
var builder = new JSONBuilder(dataObject)
var commands1 = new Commands(builder)
var cli = new Cli(commands1.JSONrouter)



cli.JSCli(builder, dataObject, "key: ")
cli.JSCli(builder, dataObject, "value: ")
