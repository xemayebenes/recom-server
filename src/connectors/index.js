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