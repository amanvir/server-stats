Data = new Mongo.Collection('data');
if(Meteor.isClient){

  Template.home.events({
    'click #start': function(){
      Meteor.call('grabCpu');
      console.log('started recording');
    },

    'click #stop': function(){
      Meteor.call('stopgrabCpu');
      console.log('stopped recording');
    },

    'click #clear': function(){
      Meteor.call('clearCpu');
      console.log('cleared cpu data');
    }
  });

  Template.home.helpers({
    list_data: function(){
      return Data.find({}, {sort: {timestamp: -1}, limit:1});
    },
    data_collected: function(){
      return Data.find().count();
    },
    cpu_usage: function(usr,sys,idle){
      // calculating cpu usage is tedious
      // http://stackoverflow.com/a/23376195
      // attempt: usage = (this.times.user + this.times.sys + this.times.idle)/this.times.idle
      // todo: implement this
      usage = _.random(1,100); 
      return usage;
    }
  });
}
