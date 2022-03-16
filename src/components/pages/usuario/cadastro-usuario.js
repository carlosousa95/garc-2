import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";
import VisualizacaoUsuario from '../usuario/visualizacao-usuario'
function CadastroUsuario() {

    const [values, setValues] = useState();
    const [listUsuarios, setlistUsuarios] = useState();

    console.log(listUsuarios)
    const handleChangeValues = (value) =>{
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    };
    const handleClickButoon = () =>{
        Axios.post("http://localhost:3000/cadastro-usuario",{
        nome: values.nome,
        descricao: values.descricao,
        carga: values.carga,
        totaulas: values.totaulas,
        ano: values.ano
        }).then((response) =>{
            console.log(response)
        })
    }

    useEffect(() =>{
        Axios.get("http://localhost:3000/visualizacao-usuario").then((response) =>{
            setlistUsuarios(response.data);
        })
    }, [])

    return (
        <div class="container p-5 mb-3 bg-light text-dark">
            <h2>Cadastro Usuário</h2>
            <form>
                <div class="row">
                    <div class="form-group col-md-1">
                        <label for="inputPassword4">Cod.</label>
                        <input class="form-control" name="idcurso" type="text" placeholder="COD " onChange={handleChangeValues}/>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputEmail4">Usuário:</label>
                        <input type="text" name="nome" class="form-control" id="inputEmail4" placeholder="Usuário" onChange={handleChangeValues} />
                    </div>
                    <div class="form-group col-md-5">
                        <label for="inputPassword4">Nome:</label>
                        <input type="text" name="descricao" class="form-control" id="inputPassword4" placeholder="Digite o Nome"onChange={handleChangeValues} />
                    </div>
                    <div class="col-md-3">
                        <label for="validationCustom04" class="form-label">Tipo Usuário</label>
                        <select class="form-select" id="validationCustom04" required>
                            <option selected disabled value="">Choose...</option>
                            <option>Administrador</option>
                            <option>Venda</option>
                        </select>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputEmail4">CPF:</label>
                        <input type="text" class="form-control" id="inputEmail4" placeholder="000.000.000-00" name="carga" onChange={handleChangeValues} />
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputPassword4">Telefone:</label>
                        <input type="text" class="form-control" id="inputPassword4" placeholder="(62)" name="totaulas" onChange={handleChangeValues} />
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputEmail4">E-mail:</label>
                        <input type="text" class="form-control" id="inputEmail4" placeholder="Digite o E-mail" name="ano" onChange={handleChangeValues} />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Observação:</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <div class="form-check form-switch col-md-3">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        <label class="form-check-label" for="flexSwitchCheckDefault">Ativo?</label>
                    </div>
                    <div class="d-md-block">
                        <button className="register-button" class="btn btn-primary" type="button" onClick={handleClickButoon}>Cadastrar</button>
                        
                        <button class="btn btn-primary" type="button">Cancelar</button>
                    </div>
                </div>


            </form>
            { typeof  listUsuarios !== "undefined" &&
            listUsuarios.map((value) =>{
                return <VisualizacaoUsuario/>
            })}
        </div>
    )
}

export default CadastroUsuario;