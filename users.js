var users = [{
    "id": 1,
    "name": "Elamaran",
    "email": "elamran@gamail.com",
    "dob": "1997-12-06",
},
{
    "id": 2,
    "name": "Ravi",
    "email": "Ravi@gamail.com",
    "dob": "1999-12-06",
},

]
const checkEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
const checkDate = (dateStr) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (dateStr.match(regex) === null) {
        return false;
    }

    const date = new Date(dateStr);

    const timestamp = date.getTime();

    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
        return false;
    }

    return date.toISOString().startsWith(dateStr);
}
module.exports = {
    async getUsers(req, res) {
        if (!req.params.id) res.status(404).json({ error: "Bad request" })
        else {
            const user = users.find(el => el.id == req.params.id);
            //const user =db.find({id:req.params.id});
            if (Object.keys(user || {}).length == 0) res.json({ message: "user not found" })
            else res.json({ status: 1, message: "Sucess", data: user })
        }

    },
    async addUsers(req, res) {
        var { name, email, dob } = req.body;
        console.log(typeof (name) )
        if (typeof (name) !== 'string') {
            res.json({ message: "Invalid name format only string allowed" })
        }
        else if (!checkEmail(email)) {
            res.json({ message: "Invalid email format" })
        }
        else if (!checkDate(dob)) {
            res.json({ message: "Invalid date format only allowed YYYY-MM-DD" });
        } else {
            var data = {
                name: name,
                email: email,
                dob: dob
            };
            users.push(data);
            // await db.create(data)
            res.json({ status: 1, message: "User Added", data: users })
        }

    },
    async deleteUsers(req, res) {
        if (!req.params.id) res.status(404).json({ error: "Bad request" })
        else {
            let newList = users.filter(el => el.id != req.params.id);
            res.json({ status: 1, message: "User deleted", data: newList })
        }
    }
}