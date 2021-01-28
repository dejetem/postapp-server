const {ApolloServer, PubSub} = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers');
const {MONGODB} = require('./config.js');
const port = process.env.PORT||8000

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req}) => ({req, pubsub})
});

mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
   .then(() => {
       console.log('MONGODB CONNECTED');
       return server.listen({port});
   })
   .then(res => {
       console.log(`Server running on port ${res.url}`)
   })
   .catch(err => {
       console.error(err)
   })

//3Rp5yTga4y6eDoKx