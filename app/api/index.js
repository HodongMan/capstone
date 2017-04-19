export default function(app){

    app.use("/api/user", require("./user"));

    app.route("*").get((req, res) => {
        res.status(200).send({
            message : "Server Started"
        })
    });
};
