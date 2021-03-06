Apps = new Meteor.Collection('apps');

Meteor.startup(function() {
  if ( Meteor.isServer ) {
    Apps._ensureIndex({apiKey: 1});
    Apps._ensureIndex({userIds: 1});
  }
});

if (typeof Schema === 'undefined')
  Schema = {};

Schema.App = new SimpleSchema({
  apiKey: {
    type: String
  },
  name: {
    type: String
  },
  hostnames: {
    type: [String],
    optional: true
  },
  userIds: {
    type: [String]
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
  status: {
    type: String,
    optional: true
  },
  lastConnected: {
    type: Number,
    optional: true
  },
  lastDisconnected: {
    type: Number,
    optional: true
  },
  yoUserNames: {
    type: [String],
    optional: true
  }
});

Apps.attachSchema(Schema.App);