var kafka = require('kafka-node');
var moment = require('moment-timezone');

Producer = kafka.Producer;
client = new kafka.KafkaClient({kafkaHost: 'kafka:9092', connectTimeout: 3000, requestTimeout: 6000});
producer = new Producer(client);

/**
 * Facade to the Toto event bus publishing functionalities
 */
class TotoEventPublisher {

  constructor() {
    this.topics = [];
  }

  /**
   * Publishes the specified event to the specified topic.
   * Note that :
   * - Topics must be REGISTERED previously through the 'registerTopic()' method
   *
   * If the provided topic or event haven't been registered, the call will fail
   */
  publishEvent(topic, event) {

    return new Promise((success, failure) => {

      // 1. Check if the topic has been previously registered
      let found = false;

      for (var i = 0; i < this.topics.length; i++) {

        if (this.topics[i].topicName == info.topic) {found = true; break;}

      }

      // If no topic has been register, break
      if (!found) {failure({code: 404, message: 'Sorry, the topic "' + topic + '" has not been registered. Please register it first with the registerTopic() method'}); return;}

      // Send the event to the producer
      producer.send([{topic: topic, messages: JSON.stringify(event)}], function(err, data) {

        // If there's an error
        if (err != null) {

          // Log the error
          console.log(err);

          // Invoke a failure
          failure(err);

          // Break
          return;
        }

        // If it's a success
        success();

      })
    })
  }

  /**
   * This method registers the topic to be used to produce events.
   * The 'info' object requires the following fields:
   * - topicName  :     the name of the Kafka topic being used
   * - microservice :   the nane of the microservice (e.g. expenses)
   */
  registerTopic(info) {

    return new Promise((success, failure) => {

      // 1. Validate the data
      if (info.topicName == null) {failure({code: 400, message: 'Missing field "topicName" in the input object.'}); return; }
      if (info.microservice == null) {failure({code: 400, message: 'Missing field "microservices" in the input object. The microservice should be the id of the MS (e.g. toto-nodems-expenses)'}); return; }

      // 2. Check if the topic has already been registered
      for (var i = 0; i < this.topics.length; i++) {

        if (this.topics[i].topicName == info.topicName) {success(this.topics[i]); return;}

      }

      // 3. Add the topic
      let topic = {
        topicName: info.topicName,
        microservice: info.microservice,
        role: 'producer'
      };

      this.topics.push(topic);

      success(topic);

    });
  }

  /**
   * Returns the registered topics as an [] of topics objects ({topicName, microservice, role})
   */
  getRegisteredTopics() {

    return this.topics;

  }
}

module.exports = new TotoEventPublisher();
