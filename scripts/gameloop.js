/**
 * Created by Steven on 4/12/2017.
 */

module.exports = function(spec){
  var model = require('./model')()
  var that = {}



  model.initialize()

  that.gameLoop = function(elapsedTime){
    model.update(elapsedTime)
  }

}