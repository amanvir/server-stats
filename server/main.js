Data = new Mongo.Collection('data');
os = Meteor.npmRequire('os');

if (Meteor.isServer) {

  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    //grab the cpu data
    'grabCpu': function() {
      cpu_interval = Meteor.setInterval(function(){
        var cpu_data = os.cpus();
        //timestamp needed for sorting
        //calculate cpu usage
        Data.insert({"cpu_data": cpu_data, "timestamp": Date.now()});
        console.log('Collecting data');
      },1000);
    },

    'stopgrabCpu': function(){
      Meteor.clearInterval(cpu_interval);
      console.log('Stopped collecting data');
    },

    'clearCpu': function(){
      Data.remove({});
      console.log('cleared data');
    }
  });

  Meteor.publish('data', function(){
    return Data.find({});
  }); 

}
