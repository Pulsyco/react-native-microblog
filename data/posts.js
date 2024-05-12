import { USERS } from "./users";
export const POSTS =[
    {
    imageUrl: require('../assets/ajoy.jpg'),
    user: USERS [0].user,
    likes: 55  ,
    caption : 'Train Ride to hoogwarts.',
    profile_picture : USERS[0].image,
    coments:[
        {
            user: 'Pulak',
            comment: 'hey look good',

        },
        {
            user: 'Boikuntha',
            comment: 'hey look good',

        },
    ],

},
{
    imageUrl: require('../assets/satan.jpg'),
    user: USERS[1].user,
    likes: 7870,
    caption : "React Native is very similar to React JS. So if you don't know React Native, it's relatively easy to pick up as you'll learn here",
    profile_picture : USERS[1].image,
    coments:[
        {
            user: 'rajarshree',
            comment: 'hey look good',

        },
        {
            user: 'Gaurav',
            comment: 'hey look good',

        },
    ],
},
]