Meteor.methods({
  eventComplete: function(apikey, eventId) {
    if ( apikey && data && typeof data === 'object' ) {
      var app = Apps.findOne({
        apiKey: apikey
      });

      var event = Events.findOne(eventId);

      if ( app && app._id && event && event.appId === app._id ) {
        try {
          return Events.update(eventId, {
            $set: {
              completed: true
            }
          });
        } catch (e) {
          return e;
        }
      }
    }
  }
});