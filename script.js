class Produtos {
  constructor() {
    this.id = 1;
    this.arrayInven = [];
  }

  Adicionar() {
    let produtos = this.Lerdados();

    if (this.ValidaCampo(produtos) == true) {
      this.AdicionarNoArray(produtos);
      this.exibirProdutos(this.arrayInven); // ADICIONE ISSO: para atualizar a tela ao cadastrar
    }
  }
  AdicionarNoArray(produtos) {
    this.arrayInven.push(produtos);
    this.id++;
  }

  ValidaCampo(produtos) {
    let msg = "";

    const listaDeCategorias = ["casa", "moda", "eletronicos"];
    if (produtos.nomeProdut == "") {
      msg += "-informe o nome do Produto\n";
    }
    if (produtos.valorProdut == "") {
      msg += "- Informe o valor do produto\n";
    }
    if (produtos.quantidadeProdut == "") {
      msg += "- Informe o quantidade do produto\n";
    }

    let categoriaDigitada = produtos.categoriaProdut.toLowerCase();

    if (categoriaDigitada == "") {
      msg += "- Informe a categoria do Produto \n";
    } else if (!listaDeCategorias.includes(categoriaDigitada)) {
      msg += "- Informe uma categoria valida (casa, moda, eletronicos) \n";
    }

    if (msg != "") {
      alert(msg);
      return false;
    }

    return true;
  }

  Lerdados() {
    let produtos = {};
    produtos.idProdut = this.id;
    produtos.nomeProdut = document.getElementById("nomePro").value;
    produtos.valorProdut = document.getElementById("valorPro").value;
    produtos.quantidadeProdut = document.getElementById("quantidadePro").value;
    produtos.categoriaProdut = document
      .getElementById("categoriaPro")
      .value.toLowerCase();
    return produtos;
  }

  BuscaProduto() {
    let nomeDigitado = document
      .getElementById("buscaPro")
      .value.toLowerCase()
      .trim();

    let produtosFiltrados = this.arrayInven.filter((prod) => {
      return prod.nomeProdut.toLowerCase().includes(nomeDigitado);
    });

    this.exibirProdutos(produtosFiltrados);
  }

  exibirProdutos(lista) {
  
    let resultadoDaLista = document.querySelector("div.produtos");

    resultadoDaLista.innerHTML = "";

  

    for (let i = 0; i < lista.length; i++) {
      resultadoDaLista.innerHTML += `
          <div class="cheio">
        <div class="produto-card">
          <h1>${lista[i].nomeProdut}</h1>
          <h2>R$ ${lista[i].valorProdut}</h2>
          <h4>Estoque: <span>${lista[i].quantidadeProdut}</span></h4>
          <div class="botoes-modificar">
            <button>Editar</button>
            <button>Excluir</button>
          </div>
      `;
    }
  }
}
let produtos = new Produtos();
