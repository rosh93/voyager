Thresholds = new Meteor.Collection('thresholds');

if (typeof Schema === 'undefined')
  Schema = {};

Schema.Threshold = new SimpleSchema({
  appId: {
    type: String
  },
  createdAt: {
    type: Number,
    autoValue: function() {
      if (this.isInsert) {
        return +moment();
      } else if (this.isUpsert) {
        return {$setOnInsert: +moment()};
      } else {
        this.unset();
      }
    }
  },
  type: {
    type: String,
    allowedValues: ['cpu', 'memory', 'loadAvg']
  },
  value: {
    type: Number
  },
  eventName: {
    type: String
  },
  active: {
    type: Boolean,
    autoValue: function() {
      return true;
    }
  } 
});

Thresholds.attachSchema(Schema.Threshold);