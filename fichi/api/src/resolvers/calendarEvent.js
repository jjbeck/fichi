require('dotenv').config();

function createCalendarEvent(obj, args, context, info) {
  const session = context.driver.session();
  let response;
  return session
    .run(`CREATE (c:CalendarEvent) SET c += $args, c.id = randomUUID(), c.ownerId = $ownerId return c`, { args, ownerId: context.cypherParams.userId })
    .then((res) =>{
      session.close();
      response = res.records[0].get('c').properties;
      const session2 = context.driver.session();
      
      return session2
    .run("MATCH (u:User {id: $userId}) MATCH (c:CalendarEvent {id: $id}) MERGE (c)-[:CREATED_BY]->(u)", { userId: context.cypherParams.userId, id: response.id })
    .then((res) => {
        
        session2.close();
        console.log(response);
        return response;
        
        
    })
    });
}

module.exports = { createCalendarEvent };
