export default function(app){

    app.use("/api/user", require("./user"));
    app.use("/api/board", require("./board"));
    app.use("/api/festival", require("./festival"));

    app.route("*").get((req, res) => {
        res.status(200).send({
            message : "Server Started"
        })
    });
};
