import express from 'express'

const porta = 3000
const host = '0.0.0.0'
const app = express()

var listaProdutos = []

function processaCadastroProduto(requisicao, resposta){
  const produto = {
                    cod: requisicao.query.cod,
                    nome: requisicao.query.nome,
                    quant: requisicao.query.quant,
                    compra: requisicao.query.compra,
                    venda: requisicao.query.venda,
                    fornecedor: requisicao.query.fornecedor,
                    descricao: requisicao.query.descricao
                  }
  
  listaProdutos.push(produto)

  let conteudoResposta = `
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

app.get('/cadastrarProduto', processaCadastroProduto)

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