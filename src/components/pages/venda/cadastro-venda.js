import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import mapValues from "lodash/mapValues";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style.css"




 function CadastroServico() {
     

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
            Axios.post("http://localhost:3000/cadastro-venda", data).then((response) => {
                navigate('/cadastro-venda')
                alert("Pedido Feito!")


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

   

         


    return (
        <div className="container p-5 mb-3 bg-light text-dark">
            <h2>{id ? 'Alterar Venda' : 'Cabeçalho Venda'}</h2>
            <form onSubmit={handleSubmit(Salvar)}>
                <div className="row">
                    <div className="form-group col-md-1">
                        <label htmlFor="inputEmail4">Cod.</label>
                        <input className="form-control" type="text" {...register("id")} id="id" readonly />
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputEmail4">Cliente:</label>
                        <input type="text" className="form-control" id="id_cliente" placeholder="Digite aqui.." {...register("id_cliente")} />
                    </div>
                    <div className="form-group col-md-5">
                        <label htmlFor="inputEmail4">Cliente Final:</label>
                        <input type="text" className="form-control" id="nome_cliente_final" placeholder="Digite aqui.." {...register("nome_cliente_final")}/>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputEmail4">Vendedor:</label>
                        <input type="text"  className="form-control" id="id_usuario" placeholder="Digite aqui.." {...register("id_usuario")} />
                    </div>
                       <div className="mb-3">
                            <label htmlFor="inputEmail4">Descrição:</label>
                            <textarea className="form-control" id="descri" {...register("descri")} rows="3"></textarea>
                        </div>
                    <div className="btnCadastrar">
                        <button className="btn btn-primary col-md-2" >{id ? 'Alterar' : 'Abrir Pedido'}</button>
                    </div>
                </div>
            </form>

            <h3>{idd ? 'Alterar Venda' : 'Selecionar Produtos'}</h3>
            <section>
            <form  onSubmit={handleSubmit(Salvarr)}>
                <div className="row">
                    <div className="form-group col-md-1">
                        <label for="nome">Cod.</label>
                        <input className="form-control" type="text" {...register("id")}  id="id" readonly />
                    </div>
                    <div className="form-group col-md-3">
                        <label for="nome">Produto:</label>
                        <input type="text" className="form-control"  id="id_produto"  placeholder="Digite aqui.." {...register("id_produto")} />
                    </div>
                    <div className="form-group col-md-3">
                        <label for="nome">Quantidade:</label>
                        <input type="text"  className="form-control"  id="quantidade"  placeholder="Digite aqui.." {...register("quantidade")}/>
                    </div>
                    <div className="form-group col-md-3">
                        <label for="nome">Valor:</label>
                        <input type="text"  className="form-control"  id="valor"  placeholder="Digite aqui.." {...register("valor")} />
                    </div>
                    <div className="btnCadastrar">
                        <button className="btn btn-primary col-md-2" >{idd ? 'Alterar' : 'Adicionar Produto'}</button>
                    </div>
   
                    </div>
            </form>
            </section>
        </div>

        

    )
    }
    
   
    

    export default  CadastroServico;


