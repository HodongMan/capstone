import User from './user';
import Board from './board';
import Festival from './festival';

export default function(app){

    app.use("/api/user", User);
    app.use("/api/board", Board);
    app.use("/api/festival", Festival);

    app.route("*").get((req, res) => {
        res.status(200).send({
            message : "Server Started"
        })
    });
};
