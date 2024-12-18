import axios from "axios";
const authBaseURL = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
const API_KEY = "AIzaSyB6CcMLthgcPSjEx7L696X4Hoi_gq2gB6I";

class API {

    constructor ()
    {

    }

    // Erro's code U
    user ()
    {
        // erro's code U100 to U199
        async function create (user) 
        {
            let status = {
                code: "",
                message: "",
            }
            
            //model 
            /* let user = {
                name: "",//string; "erick dias"
                mail: "",//string; "erick@mail.com"
                password: "",//string;"123456";min-length >= 6
                type: "PET_01",//string;"PET_01" for client or "PET_02" for owner
            }*/

            console.log("user: ", user);

            await axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`, {
                email: user.mail,
                password: user.password,
                returnSecureToken: true
            })
            .then(async (res) => {
                
                if (res.data.localId) {
                    
                    delete user.password;

                    await axios.put(`/users/${res.data.localId}.json`, {
                        ...user,
                        status: "ACTIVE"
                    })
                    .then(() => {
                        status.message = "Sucesso! Usuário criado com sucesso!";
                        status.code = 200;
                    })
                    .catch(err => {
                        console.log("U101 ", err);
                        status.message = "Opsssss, tivemos algum problema ao registrar o token! (U101)";
                        status.code = 400;
                    })
                }
                
            })
            .catch(async (err) => {
                console.log("U102 ", err);
                status.message = "Opsssss, tivemos algum problema ao registrar o usuário! Tente utilizar outro e-mail! (U102)";
                status.code = 400;
            });
 
            return status;
        }

        // erro's code U200 to U299
        async function login (mail, password)
        {
            let status = {
                code: "",
                message: "",
                user: {
                    id_user: "",
                    status: "",
                    name: "",
                    mail: "",
                    phone: "",
                    password: password,
                }
            }

            await axios.post(`${authBaseURL}/verifyPassword?key=${API_KEY}`, {
                email: mail,
                password: password,
                returnSecureToken: true
            })
            .then(async (res) => {
                if (res.data.localId) 
                {
                    let token = res.data.idToken
                    status.user.token = token;
                    status.user.id_user = res.data.localId; 

                    await axios.get(`/users/${res.data.localId}.json?auth=${token}`)
                    .catch(err => {
                        console.log("U201 ", err);
                        status.message = "Opsssss, tivemos algum problema ao conferir o usuário! (U201)";
                        status.code = 400;
                    })
                    .then(async (res) => {
                        status.user.status = res.data.status;
                        status.user.name = res.data.name;
                        status.user.mail = res.data.mail;
                        status.user.phone = res.data.phone;
                        status.user.type = res.data.type;

                        status.message = "Sucesso!";
                        status.code = 200;                        
                    })
                }
            })
            .catch(err => {
                console.log("U202 ",err);
                status.message = "Opsssss, e-mail e/ou senha errado(s)! Por favor, confira e tente novamente! (U202)";
                status.code = 400;
            });

            return status;
        }

        return {
            login,
            create
        }
    }

    // Erros code P
    petshop ()
    {
        // erro's code P100 to P199
        async function getAll (token)
        {
            let status = {
                code: "",
                message: "",
                data: null
            }
            
            await axios.get(`/petshops/.json?auth=${token}`)
            .then(res => {
                
                if (res.data)
                {
                    status.code = 200;
                    status.message = "Sucesso!";
                    status.data = res.data;
                }
            })
            .catch(err => {
                console.log("P100 ", err);
                status.code = 400;
                status.message = "Opsssss, tivemos algum problema ao recuperar os petshops! Tente fazer o login novamente! (P100)";
            })

            return status;
        }

        // erro's code P200 to P299
        async function post (token, idUser, data)
        {
            let status = {
                code: "",
                message: "",
                data: null
            }
            
            await axios.post(`/petshops/${idUser}/.json?auth=${token}`, {...data})
            .then(res => {
                
                if (res.data)
                {
                    status.code = 200;
                    status.message = "Sucesso!";
                }
            })
            .catch(err => {
                console.log("P200 ", err);
                status.code = 400;
                status.message = "Opsssss, tivemos algum problema ao cadastrar o petshop! Tente fazer o login novamente! (P200)";
            })

            return status;
        }

        // erro's code P300 to P399
        async function update (token, id, idUser, data)
        {
            let status = {
                code: "",
                message: "",
                data: null
            }
            
            await axios.patch(`/petshops/${idUser}/${id}/.json?auth=${token}`, {...data})
            .then(res => {
                
                if (res.data)
                {
                    status.code = 200;
                    status.message = "Sucesso!";
                }
            })
            .catch(err => {
                console.log("P300 ", err);
                status.code = 400;
                status.message = "Opsssss, tivemos algum problema ao atualizar o petshop! Tente fazer o login novamente! (P300)";
            })

            return status;
        }

        // erro's code P400 to P499
        async function del (token, idUser, id)
        {
            let status = {
                code: "",
                message: "",
                data: null
            }
            
            await axios.delete(`/petshops/${idUser}/${id}/.json?auth=${token}`)
            .then(res => {
                status.code = 200;
                status.message = "Sucesso!";
            })
            .catch(err => {
                console.log("P400 ", err);
                status.code = 400;
                status.message = "Opsssss, tivemos algum problema ao excluir o petshop! Tente fazer o login novamente! (P400)";
            })

            return status;
        }

        // erro's code P100 to P199
        async function getByUser(token, idUser)
        {
            let status = {
                code: 500,
                message: "",
                data: null
            }
            
            await axios.get(`/petshops/${idUser}.json?auth=${token}`)
            .then(res => {
                
                if (res.data)
                {
                    status.code = 200;
                    status.message = "Sucesso!";
                    status.data = res.data;
                }
            })
            .catch(err => {
                console.log("P100 ", err);
                status.code = 400;
                status.message = "Opsssss, tivemos algum problema ao recuperar os petshops! Tente fazer o login novamente! (P100)";
            })

            return status;
        }

        return {
            del,
            post,
            getAll,
            update,
            getByUser,
        }
    }

    // Erros code A
    animals ()
    {
        // erro's code PA100 to P199
        async function post (token, idUser, data)
        {
            let status = {
                code: "",
                message: "",
                data: null
            }
            
            await axios.post(`/animals/${idUser}/.json?auth=${token}`, {...data})
            .then(res => {
                
                if (res.data)
                {
                    status.code = 200;
                    status.message = "Sucesso!";
                }
            })
            .catch(err => {
                console.log("A100 ", err);
                status.code = 400;
                status.message = "Opsssss, tivemos algum problema ao cadastrar o animal! Tente fazer o login novamente! (A100)";
            })

            return status;
        }

        // erro's code P200 to P299
        async function getByUser(token, idUser)
        {
            let status = {
                code: 500,
                message: "",
                data: null
            }
            
            await axios.get(`/animals/${idUser}.json?auth=${token}`)
            .then(res => {
                
                if (res.data)
                {
                    status.code = 200;
                    status.message = "Sucesso!";
                    status.data = res.data;
                }
            })
            .catch(err => {
                console.log("P200 ", err);
                status.code = 400;
                status.message = "Opsssss, tivemos algum problema ao recuperar os animais! Tente fazer o login novamente! (P200)";
            })

            return status;
        }

        // erro's code P300 to P399
        async function update (token, id, idUser, data)
        {
            let status = {
                code: "",
                message: "",
                data: null
            }
            
            await axios.patch(`/animals/${idUser}/${id}/.json?auth=${token}`, {...data})
            .then(res => {
                
                if (res.data)
                {
                    status.code = 200;
                    status.message = "Sucesso!";
                }
            })
            .catch(err => {
                console.log("P300 ", err);
                status.code = 400;
                status.message = "Opsssss, tivemos algum problema ao atualizar o animal! Tente fazer o login novamente! (P300)";
            })

            return status;
        }

        // erro's code P400 to P499
        async function del (token, idUser, id)
        {
            let status = {
                code: "",
                message: "",
                data: null
            }
            
            await axios.delete(`/animals/${idUser}/${id}/.json?auth=${token}`)
            .then(res => {
                status.code = 200;
                status.message = "Sucesso!";
            })
            .catch(err => {
                console.log("P400 ", err);
                status.code = 400;
                status.message = "Opsssss, tivemos algum problema ao excluir o animal! Tente fazer o login novamente! (P400)";
            })

            return status;
        }

        return {
            del,
            post,
            update,
            getByUser
        }
    }

    // Erros code S
    scheduled ()
    {
        // erro's code S100 to S199
        async function post (token, idPetshop, data)
        {
            let status = {
                code: "",
                message: "",
                data: null
            }
            
            await axios.post(`/scheduled/${idPetshop}/.json?auth=${token}`, {...data})
            .then(res => {
                
                if (res.data)
                {
                    status.code = 200;
                    status.message = "Sucesso!";
                }
            })
            .catch(err => {
                console.log("S100 ", err);
                status.code = 400;
                status.message = "Opsssss, tivemos algum problema ao cadastrar a reserva! Tente fazer o login novamente! (S100)";
            })

            return status;
        }

        // erro's code S200 to S299
        async function getAll (token)
        {
            let status = {
                code: "",
                message: "",
                data: null
            }
            
            await axios.get(`/scheduled/.json?auth=${token}`)
            .then(res => {
                
                if (res.data)
                {
                    status.code = 200;
                    status.message = "Sucesso!";
                    status.data = res.data;
                }
            })
            .catch(err => {
                console.log("S200 ", err);
                status.code = 400;
                status.message = "Opsssss, tivemos algum problema ao recuperar as reservas! Tente fazer o login novamente! (S200)";
            })

            return status;
        }

        // erro's code S300 to S399
        async function del (token, idPethop, id)
        {
            let status = {
                code: "",
                message: "",
                data: null
            }
            
            await axios.delete(`/scheduled/${idPethop}/${id}/.json?auth=${token}`)
            .then(res => {
                status.code = 200;
                status.message = "Sucesso!";
            })
            .catch(err => {
                console.log("S300 ", err);
                status.code = 400;
                status.message = "Opsssss, tivemos algum problema ao excluir a reserva! Tente fazer o login novamente! (S300)";
            })

            return status;
        }

        // erro's code S400 to S499
        async function update (token, idPesthop, id, data)
        {
            let status = {
                code: "",
                message: "",
                data: null
            }
            
            await axios.patch(`/scheduled/${idPesthop}/${id}/.json?auth=${token}`, {...data})
            .then(res => {
                
                if (res.data)
                {
                    status.code = 200;
                    status.message = "Sucesso!";
                }
            })
            .catch(err => {
                console.log("S400 ", err);
                status.code = 400;
                status.message = "Opsssss, tivemos algum problema ao atualizar a reserva! Tente fazer o login novamente! (S400)";
            })

            return status;
        }

        return {
            del,
            post,
            update,
            getAll
        }
    }
}

module.exports = API;
