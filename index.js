import express from 'express'

const porta = 3000
const host = '0.0.0.0'
const app = express()

var listaProdutos = []

function processaCadastroProduto(requisicao, resposta){
  const dados = requisicao.body
  let conteudoResposta = ''

  if(!(dados.cod && dados.nome && dados.quant && dados.compra && dados.venda && dados.fornecedor)){
    conteudoResposta = `
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cadastrar Produto</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
        <header>
          <h1>Cadastrar Produto</h1>
        </header>

        <main>
          <form method="post" action="/cadastrarProduto">
            <label for="icod">Código: </label>
            <input type="number" name="cod" id="icod" placeholder="Digite o código do produto" value="${dados.cod}"><br> `
    
    if(!dados.cod){
      conteudoResposta += `<p>Informe o codigo!</p>`
    }

    conteudoResposta += `
            <label for="inome">Nome: </label>
            <input type="text" name="nome" id="inome" placeholder="Digite o nome do produto" value="${dados.nome}"><br> `

    if(!dados.nome){
      conteudoResposta += `<p>Informe o nome!</p>`
    }

    conteudoResposta += `
            <label for="iquant">Quantidade: </label>
            <input type="number" name="quant" id="iquant" placeholder="Digite a quantidade do produto" value="${dados.quant}"><br> `

    if(!dados.quant){
      conteudoResposta += `<p>Informe a quantidade!</p>`
    }

    conteudoResposta += `
            <label for="icompra">Preço de compra: </label>
            <input type="number" name="compra" id="icompra" placeholder="Digite o preço de compra do produto" value="${dados.compra}"><br> `

    if(!dados.compra){
      conteudoResposta += `<p>Informe o preço de compra!</p>`
    }

    conteudoResposta += `
            <label for="ivenda">Preço de venda: </label>
            <input type="number" name="venda" id="ivenda" placeholder="Digite o preço de venda do produto" value="${dados.venda}"><br> `

    if(!dados.venda){
      conteudoResposta += `<p>Informe o preço de venda!</p>`
    }

    conteudoResposta += `
            <label for="ifornecedor">Fornecedor: </label>
            <input type="text" name="fornecedor" id="ifornecedor" placeholder="Digite o fornecedor do produto" value="${dados.fornecedor}"><br> `

    if(!dados.fornecedor){
      conteudoResposta += `<p>Informe o fornecedor!</p>`
    }

    conteudoResposta += `
            <label for="idescricao">Descrição: </label>
            <input type="text" name="descricao" id="idescricao" placeholder="Digite uma descrição para o produto"><br>

            <button type="submit">Cadastrar Produto</button>
          </form>
        </main>
      </body>
      </html>`

    resposta.end(conteudoResposta)
  }
  else{
    const produto = {
      cod: dados.cod,
      nome: dados.nome,
      quant: dados.quant,
      compra: dados.compra,
      venda: dados.venda,
      fornecedor: dados.fornecedor,
      descricao: dados.descricao
    }

    listaProdutos.push(produto)

    conteudoResposta = `
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Lista de Cadastrados</title>  
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
      </head>
      <body>
      <h1>Lista de produtos cadastrados</h1>
      <table class="table table-dark table-hover">
      <thead>
      <tr>
        <th>Código</th>
        <th>Nome</th>
        <th>Quantidade</th>
        <th>Preço de compra</th>
        <th>Preço de venda</th>
        <th>Fornecedor</th>
        <th>Descrição</th>
      </tr>
      </thead>
      <tbody> `

    for(let i = 0; i < listaProdutos.length; i++){
    conteudoResposta += `
      <tr>
      <th>${produto.cod}</th>
      <th>${produto.nome}</th>
      <th>${produto.quant}</th>
      <th>${produto.compra}</th>
      <th>${produto.venda}</th>
      <th>${produto.fornecedor}</th>
      <th>${produto.descricao}</th>
      </th> `
    }

    conteudoResposta += `
      </tbody>
      </table>

      <a class="btn btn-primary" href="/" role="button">Voltar ao menu</a>
      <a class="btn btn-primary" href="/index.html" role="button">Continuar cadastrando</a>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
      </body>
      </html> `

    resposta.end(conteudoResposta)
  }
}

app.use(express.urlencoded({ extended: true }))

app.post('/cadastrarProduto', processaCadastroProduto)

app.get('/', (requisicao, resposta) => {
  resposta.end(`
    <!DOCTYPE html>
    <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Menu do Sistema</title>  
      </head>
      <body>
        <h1>MENU</h1>
        <ul>
          <li><a href="index.html">Cadastrar Produto</a></li>
        </ul>
      </body>
    </html>
  `
  )
})

app.use(express.static('./paginas'))

app.listen(porta, host, () => {
  console.log(`Servidor executado na url http://${host}:${porta}`)
})