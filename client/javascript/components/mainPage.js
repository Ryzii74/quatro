const mainPage = {
    template: '<h1>Привет</h1>',
    created() {
        APP.Connection.send("getGameOffers", {}, (err, data) => {
            console.log(data);
        });
    }
};