import axios from 'axios';

// module.exports = {
//     fetchOnBoardingContent: function (tag) {
//         var encodedURI = window.encodeURI('http://localhost:1337/onboardings');

//         return axios.get(encodedURI)
//             .then(function(response) {
//                 return response.data;
//             });
//     }
// };


// export function fetchOnBoardingContent () {
//     const strapiURL = 'http://localhost:1337/onboardings';
//     return (
//         axios
//         .get(strapiURL, {
//             params: {
//                 _sort: 'createdAt:desc'
//             }
//         })
//         .then(response =>  response.data)
//         .catch(error => {
//             console.log('An error occured when fetching OnBoarding Conent', error);
//         })
//     )

// }


// export function fetchOnBoardingContent () {
//     const strapiURL = 'http://localhost:1337/onboardings';
//     return (
//         axios
//             .get(strapiURL, {
//                 params: {
//                     _sort: 'createdAt:desc'
//                 }
//             })
//             .then( response => response)
//     )
// }


// OLD API: replaced with GraphQL
export function fetchOnBoardingContent () {
    const strapiURL = 'http://localhost:1337/onboardings';
    return (
        axios
            .get(strapiURL, {
                params: {
                    _sort: 'createdAt:desc'
                }
            })
            .then( function (response) {
                return response
            })
    )
}


function strapiLogin () {
    const strapiLoginURL = 'http://localhost:1337/auth/local';
    return (
        axios
        .post('http://localhost:1337/auth/local', {
            identifier: 'user@strapi.io',
            password: 'strapiPassword'
        })
        .then(response => {
          // Handle success.
          console.log('Well done!');
          console.log('User profile', response.data.user);
          console.log('User token', response.data.jwt);
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        })        
    )
}

