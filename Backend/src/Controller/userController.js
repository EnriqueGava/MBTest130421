const User = require("../Model/user");
const db = require("../Config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const controllers = {};
process.env.SECRET_KEY = "secret";
db.sync(); // Migrate tables if do not exist

// REGISTER
controllers.register = async (req, res) => {
    const userData = {
        User_ID: req.body.email,
        Nombre: req.body.nombre,
        Apellido: req.body.lastname,
        Pwd: req.body.password,
        Perfil: req.body.perfil,
        Role: req.body.role
    };
    const key = Buffer.from('419336459035a6d4f8d1a6964e8a0d752fe696d4eba72debdfbc5e22040add95', 'hex');
    const iv = Buffer.from('6b84e425ee0875a3e203b4ff291b3e06', 'hex');
    function encrypt(text) {
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
       }

    User.findOne({
        where: { User_ID: userData.User_ID },
    })
        .then((user) => {
            if (!user) {
                const hw=encrypt(userData.Perfil);
                userData.Perfil = hw.encryptedData;
                const hash = bcrypt.hashSync(userData.Pwd, 10);
                userData.Pwd = hash;
                User.create(userData)
                    .then((user) => {
                        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1440,
                        });
                        res.json({ success: true, token: token });
                    })
                    .catch((err) => {
                        res.send("Error >:" + err);
                    });
            } else {
                res.json({ error: "User already exist!" });
            }
        })
        .catch((err) => {
            res.send("Error >:" + err);
        });
};

///testencript
controllers.register2 = async (req, res) => {
    const userData = {
        User_ID: req.body.email,
        Nombre: req.body.nombre,
        Apellido: req.body.lastname,
        Pwd: req.body.password,
        Perfil: req.body.perfil,
        Role: req.body.role
    };
    const key = Buffer.from('419336459035a6d4f8d1a6964e8a0d752fe696d4eba72debdfbc5e22040add95', 'hex');
    const iv = Buffer.from('6b84e425ee0875a3e203b4ff291b3e06', 'hex');
    function encrypt(text) {
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
       }
    User.findOne({
        where: { User_ID: userData.User_ID },
    })
        .then((user) => {
            if (!user) {
                //const hash = bcrypt.hashSync(userData.Pwd, 10);
                const hw=encrypt(userData.Pwd);
                userData.Pwd = hw.encryptedData;
                User.create(userData)
                    .then((user) => {
                        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1440,
                        });
                        res.json({ success: true, token: token,contra:hw.encryptedData });
                    })
                    .catch((err) => {
                        res.send("Error >:" + err);
                    });
            } else {
                res.json({ error: "User already exist!" });
            }
        })
        .catch((err) => {
            res.send("Error >:" + err);
        });
};
///desencript
controllers.desencriptimagen = async (req, res) => {
    const userData = {
        User_ID: req.body.email,
        Pwd: req.body.password
    };
    const key = Buffer.from('419336459035a6d4f8d1a6964e8a0d752fe696d4eba72debdfbc5e22040add95', 'hex');
    const iv = Buffer.from('6b84e425ee0875a3e203b4ff291b3e06', 'hex');
    const pass = createbuf(userData.Pwd);
    function createbuf(text) {
        return { iv: iv.toString('hex'), encryptedData: text.toString('hex') };
       }

    function decrypt(text) {
        let iv = Buffer.from(text.iv, 'hex');
        let encryptedText = Buffer.from(text.encryptedData, 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
       }
    
    User.findOne({
        where: { User_ID: userData.User_ID },
    })
        .then((user) => {
            if (!user) {
                //const hash = bcrypt.hashSync(userData.Pwd, 10);
                res.json({ error: "User not exist!" });
            } else {
                //const hw=encrypt(userData.Pwd);
                const des=decrypt(pass);
                res.json({ success: true,pass: des,key: key,iv:iv });
            }
        })
        .catch((err) => {
            res.send("Error >:" + err);
        });
};
// LOGIN
controllers.login = async (req, res) => {
    User.findOne({ where: { User_ID: req.body.email } })
        .then(user => {
            if (bcrypt.compareSync(req.body.password, user.Pwd)) {
                console.log(true);
                let token = jwt.sign({ user: user.User_ID }, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                let nombre = user.Nombre + " " + user.Apellido;
                let cargo = user.Role;
                let estado = user.estado;
                let expi = new Date(Number(new Date()) + (4 * 60 * 60000));
                console.log(expi + " " + estado);
                if (estado) {
                    res.cookie('Nombre', nombre, { expires: expi, MaxAge: (4 * 60 * 60000) })
                    res.cookie('Role', cargo, { expires: expi, MaxAge: (4 * 60 * 60000) })
                    res.cookie('Token', token, { expires: expi, MaxAge: (4 * 60 * 60000) })
                    res.json({ success: true, token: token, nombre: nombre, cargo: cargo, estado: estado })
                }
                else
                    res.json({ success: false, token: token, nombre: nombre, cargo: cargo, estado: estado })
            }

            else {
                res.json({ success: false, message: "user not exist" });
            }
        })
        .catch((err) => {
            res.send("Error >: " + err);
        });
};

// PROFILE
controllers.profile = async (req, res) => {
    var decoded = jwt.verify(req.headers['Authorization'], process.env.SECRET_KEY);
    let issuccefully;
    const profile = await User.findOne({
        where: { id: decoded.id }
    })
        .then(userProfile => {
            if (userProfile) {
                // res.json(userProfile);
                issuccefully = true;
                return userProfile;
            } else {
                issuccefully = false;
                res.send("User does not exist!");
            }
        })
        .catch(err => {
            res.send("Error >: " + err)
        });

    res.json({ success: issuccefully, data: profile });
};


// USERS LIST
controllers.list = async (_, res) => {
    const users = await User.findAll()
        .then(users => {
            if (users) {
                return users;
            } else {
                res.send("There are not users!");
            }
        })
        .catch(err => {
            res.send("Error >: " + err);
        });
    res.json({ success: true, data: users });
};


// USER BY ID
controllers.oneUser = async (req, res) => {
    const userbyid = await User.findOne({
        where: { User_ID: req.params.id }
    })
        .then(user => {
            return user;
        })
        .catch(err => {
            res.send("Error >: " + err);
        });
    res.json({ success: true, data: userbyid });
};
//Update 
controllers.editar = async (req, res) => {
    const userData = {
        User_ID: req.body.email,
        Nombre: req.body.nombre,
        Apellido: req.body.lastname,
        Perfil: req.body.perfil,
    };
    console.log(typeof(userData.Perfil))
    const key = Buffer.from('419336459035a6d4f8d1a6964e8a0d752fe696d4eba72debdfbc5e22040add95', 'hex');
    const iv = Buffer.from('6b84e425ee0875a3e203b4ff291b3e06', 'hex');
    function encrypt(text) {
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
       }
       const hw=encrypt(userData.Perfil);
       if(userData.Perfil[userData.Perfil.length-1]=="=") {
       userData.Perfil = hw.encryptedData;
    User.update({ Nombre: req.body.nombre, Apellido: req.body.lastname, Perfil: hw.encryptedData }, { where: { User_ID: userData.User_ID } })
        .then((user) => {

            res.json({ success: true, user });
        })
        .catch((err) => {
            res.send("Error >:" + err);
        });
    }
        else{
            User.update({ Nombre: req.body.nombre, Apellido: req.body.lastname }, { where: { User_ID: userData.User_ID } })
            .then((user) => {
    
                res.json({ success: true, user });
            })
            .catch((err) => {
                res.send("Error >:" + err);
            });
        }

};

//Photo
controllers.photo = async (req, res) => {
    const photo = await User.findAll({
        attributes: ["Perfil"],
        where: { USer_ID: req.params.id }
    })
        .then((users => {
            return users;
        }))
        .catch(err => {
            res.send("Error >: " + err);
        })

    re.json({ success: true, data: photo });
}

//Listar Usuarios ah validar

controllers.validate = async (req, res) => {
    console.log(req.body);
    await User.update({ estado: req.body.state }, { where: { User_ID: req.body.User_ID } })
        .then((user) => {
            res.json({ success: true, data: user });
        })
        .catch((err) => {
            res.send({ sucess: false, data: "Error >:" + err });
        });
}

controllers.user = async (req, res) => {
    try {
        var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    } catch (err) {
        res.clearCookie("Token");
        res.clearCookie("User_ID");
        res.clearCookie("Nombre");
        res.clearCookie("Role");
        res.redirect(req.originalUrl);
    }
    console.log(decoded);
    res.send(decoded);

}

controllers.ValidatePass = async (req, res) => {
    
    try {
        var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
        
    } catch (err) {

    }

    User.findOne({ where: { User_ID: decoded.user } })
            .then(user => {
                if (bcrypt.compareSync(req.body.password, user.Pwd)) {
                    res.json({ success: true, email: user.User_ID })
                }

                else {
                    res.json({ success: false, message: "contraseña erronea" });
                }
            })
            .catch((err) => {
                res.send("Error >: " + err);
            });

}

controllers.changePass = async (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 10);
    User.update(
        {Pwd: hash}, 
        { where: { User_ID: req.body.email} }
    )
    .then(result => {
        res.send({success: true, data: result})
    })
}



module.exports = controllers;