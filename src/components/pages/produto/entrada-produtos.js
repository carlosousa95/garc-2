import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import mapValues from "lodash/mapValues";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style.css"

function EntradaProduto() {
    
  const [phones, setPhones] = useState([])
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        shouldUnregister: false
    });


    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            Axios.get("http://localhost:3000/obter-venda/" + id, { id: id }).then((response) => {
                mapValues(response.data[0], (value, key) => setValue(key, value));
            })
        }

    }, [id])



    // const Obter = (value) => {

    //     setValues((prevValue) => ({
    //         ...prevValue,
    //         [value.target.name]: value.target.value,
    //     }))
    // };

    const Salvar = (data) => {
        if (id) {
            Axios.put("http://localhost:3000/alterar-venda", {
                id: id,
                ...data
            }).then((response) => {
                navigate('/consulta-venda')
            })
        } else {
            Axios.post("http://localhost:3000/entrada-produtos", data).then((response) => {
                navigate('/entrada-produtos')
                alert("Produto lançado!!")


            })
        }

    }

    const { idd } = useParams();

    useEffect(() => {
        if (idd) {
            Axios.get("http://localhost:3000/obter-venda/" + idd, { id: idd }).then((response) => {
                mapValues(response.data[0], (value, key) => setValue(key, value));
            })
        }

    }, [idd])

    const Salvarr = (data) => {
        if (idd) {
            Axios.put("http://localhost:3000/alterar-venda", {
                id: idd,
                ...data
            }).then((response) => {
                navigate('/consulta-venda')
            })
        } else {
            Axios.post("http://localhost:3000/cadastro-itens-produtos", data).then((response) => {
                navigate('/cadastro-venda')
                alert("Produto Adicionado!")


            })
        }

    }

    const addInputButton = (e) => {
     e.preventDefault();
     
     setPhones([...phones , ""]);
 };
    return (
        <div className="container p-5 mb-3 bg-light text-dark" style={{ marginTop: 30}}>
            <h2>{'Entrada Produto'}</h2>
            <form onSubmit={handleSubmit(Salvar)}>
                <div className="row">
                </div>
               <row>
                 <colgroup>
                 <button color="secundary" onClick={addInputButton}>
                   <i className="fa fa-fw fa-phone" aria-hidden="true"></i>
                 </button>
                 </colgroup>
               </row>
               <row>
               {  phones.map((phone, index) =>(
                  <colgroup key={index} sm = {12} lg = {4}>
                  <label for = {`phone-${index+1}`}>{`telefone ${index+1}`}</label>
                  <input
                  type="text"
                  name = "phone"
                  id={`phone-${index+1}`}
                  value={phone}
                  placeholder={`Informe o telefone ${index+1}`}/>
                  </colgroup>
                 ))
               }
               </row>
            </form>
            
        </div>


    )
}




export default EntradaProduto;
