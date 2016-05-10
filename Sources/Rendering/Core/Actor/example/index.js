import Actor from '..';

// Create actor instance
const actor = Actor.newInstance();

console.log('visibility', actor.getVisibility());
actor.setVisibility(!actor.getVisibility());
console.log('visibility', actor.getVisibility());
console.log('mapper', actor.getMapper());
actor.setProperty(actor.makeProperty());
console.log('property', actor.getProperty());
