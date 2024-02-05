
class HabitsDB {
  static viewHabits() {
    return [
      {
        name: "Meditate",
        isPositive: true,
        pngUrl: "https://oasis-images.s3.ca-central-1.amazonaws.com/meditate.png"
      },
      {
        name: "Drink water",
        isPositive: true,
        pngUrl: "https://oasis-images.s3.ca-central-1.amazonaws.com/drink-water.png"
      },
      {
        name: "Read",
        isPositive: true,
        pngUrl: "https://oasis-images.s3.ca-central-1.amazonaws.com/read.png"
      },     
      {
        name: "Run",
        isPositive: true,
        pngUrl: "https://oasis-images.s3.ca-central-1.amazonaws.com/run.png"
      },      
      {
        name: "No junk food",
        isPositive: false,
        pngUrl: "https://oasis-images.s3.ca-central-1.amazonaws.com/no-junk-food.png"
      },      
      {
        name: "Walk dog",
        isPositive: true,
        pngUrl: "https://oasis-images.s3.ca-central-1.amazonaws.com/dog-walk.png"
      },     
      {
        name: "Stretch",
        isPositive: true,
        pngUrl: "https://oasis-images.s3.ca-central-1.amazonaws.com/stretch.png"
      },      
      {
        name: "Exercise",
        isPositive: true,
        pngUrl: "https://oasis-images.s3.ca-central-1.amazonaws.com/workout.png"
      },      
      {
        name: "Bike ride",
        isPositive: true,
        pngUrl: "https://oasis-images.s3.ca-central-1.amazonaws.com/cycling.png"
      },     
      {
        name: "No phone",
        isPositive: false,
        pngUrl: "https://oasis-images.s3.ca-central-1.amazonaws.com/no-phone.png"
      },      
      {
        name: "Go on a walk",
        isPositive: true,
        pngUrl: "https://oasis-images.s3.ca-central-1.amazonaws.com/walk.png"
      },      
      {
        name: "Cold shower",
        isPositive: true,
        pngUrl: "https://oasis-images.s3.ca-central-1.amazonaws.com/shower.png"
      },      
      {
        name: "Journal",
        isPositive: true,
        pngUrl: "https://oasis-images.s3.ca-central-1.amazonaws.com/journal.png"
      },      
      {
        name: "Eat food",
        isPositive: true,
        pngUrl: "https://oasis-images.s3.ca-central-1.amazonaws.com/time-to-eat.png"
      },      
      {
        name: "No alcohol",
        isPositive: false,
        pngUrl: "https://oasis-images.s3.ca-central-1.amazonaws.com/no-alcohol.png"
      },      
      {
        name: "Play music",
        isPositive: true,
        pngUrl: "https://oasis-images.s3.ca-central-1.amazonaws.com/guitar.png"
      },      
      {
        name: "Drink tea",
        isPositive: true,
        pngUrl: "https://oasis-images.s3.ca-central-1.amazonaws.com/tea.png"
      },      
      {
        name: "Be outdoors",
        isPositive: true,
        pngUrl: "https://oasis-images.s3.ca-central-1.amazonaws.com/outdoors.png"
      },      
      {
        name: "Swim",
        isPositive: true,
        pngUrl: "https://oasis-images.s3.ca-central-1.amazonaws.com/swimming.png"
      },      
      {
        name: "No drugs",
        isPositive: false,
        pngUrl: "https://oasis-images.s3.ca-central-1.amazonaws.com/recreational-drugs.png"
      },
      
    ];
  }
  static async getHabitImages() {
    return [    
    "https://oasis-images.s3.ca-central-1.amazonaws.com/meditate.png", 
    "https://oasis-images.s3.ca-central-1.amazonaws.com/drink-water.png", 
    "https://oasis-images.s3.ca-central-1.amazonaws.com/read.png", 
    "https://oasis-images.s3.ca-central-1.amazonaws.com/run.png", 
    "https://oasis-images.s3.ca-central-1.amazonaws.com/no-junk-food.png", 

    "https://oasis-images.s3.ca-central-1.amazonaws.com/dog-walk.png", 
    "https://oasis-images.s3.ca-central-1.amazonaws.com/stretch.png", 
    "https://oasis-images.s3.ca-central-1.amazonaws.com/workout.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/cycling.png", 

    "https://oasis-images.s3.ca-central-1.amazonaws.com/no-phone.png", 
    "https://oasis-images.s3.ca-central-1.amazonaws.com/walk.png", 
    "https://oasis-images.s3.ca-central-1.amazonaws.com/shower.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/journal.png",

    "https://oasis-images.s3.ca-central-1.amazonaws.com/time-to-eat.png", 
    "https://oasis-images.s3.ca-central-1.amazonaws.com/no-alcohol.png", 
    "https://oasis-images.s3.ca-central-1.amazonaws.com/guitar.png", 
    "https://oasis-images.s3.ca-central-1.amazonaws.com/tea.png", 

    "https://oasis-images.s3.ca-central-1.amazonaws.com/outdoors.png", 
    "https://oasis-images.s3.ca-central-1.amazonaws.com/swimming.png", 
    "https://oasis-images.s3.ca-central-1.amazonaws.com/recreational-drugs.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/jumpsuit.png",

    "https://oasis-images.s3.ca-central-1.amazonaws.com/herbs.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/drum.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/piano.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/console.png",

    "https://oasis-images.s3.ca-central-1.amazonaws.com/audio-jack.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/party-music.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/eco-idea.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/flipflop.png",

    "https://oasis-images.s3.ca-central-1.amazonaws.com/multimedia.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/music-note.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/add-to-cart.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/gym.png",

    "https://oasis-images.s3.ca-central-1.amazonaws.com/electric-guitar.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/news.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/runner.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/yoga.png",
    
    "https://oasis-images.s3.ca-central-1.amazonaws.com/exercise.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/smoking.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/no-food.png",
    ];
  }
}
export default HabitsDB;
