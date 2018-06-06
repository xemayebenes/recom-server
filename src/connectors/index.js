// const FortuneCookie = {
//     getOne() {
//         return fetch('http://fortunecookieapi.herokuapp.com/v1/cookie')
//             .then(res => res.json())
//             .then(res => {
//                 return res[0].fortune.message;
//             });
//     },
// };

export default ({
    movieDataBaseService,
    omdbService,
    dataBaseService,
}) => {
    return {
        movieDataBaseService: {
            ...movieDataBaseService,
        },
        omdbService: {
            ...omdbService,
        },
        dataBaseService: {
            ...dataBaseService,
        }
    }
};