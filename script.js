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

    this.TotalDeItens();
  }
  TotalDeItens() {
    let TotalDeItens = document.querySelector("span.TotalDeItens");
    TotalDeItens.innerHTML = this.arrayInven.length;
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
    let resultadoDaLista = document.querySelector("div.resultado");

    resultadoDaLista.innerHTML = "";

    if (lista.length === 0) {
      resultadoDaLista.innerHTML = `
            
                <h3>Nenhum Produto Encontrado</h3>
              
            `;
      return;
    }

    for (let i = 0; i < lista.length; i++) {
      resultadoDaLista.innerHTML += `
    <div class="produto-card">
        <h1>${lista[i].nomeProdut}</h1>
        <h2>R$ ${lista[i].valorProdut}</h2>
      <h4>Estoque: <span>${lista[i].quantidadeProdut}</span></h4>
        <div class="botoes-modificar">
            <button onclick="produtos.Editar(${lista[i].idProdut})">Editar</button>
            <button onclick="produtos.Excluir(${lista[i].idProdut})">Excluir</button>
        </div>
    </div>
 `;
    }
  }

  FiltroTipo(tipo) {
    // 1. Se for 'Todos', mostra o array original
    if (tipo === "todos") {
      this.exibirProdutos(this.arrayInven);
      return;
    }

    // 2. Filtra comparando a categoria do produto com o 'tipo' recebido
    let categoriaSelecionada = this.arrayInven.filter((prod) => {
      // Usamos 'tipo' que é o nome do que veio do botão
      return prod.categoriaProdut.toLowerCase() === tipo.toLowerCase();
    });

   

    // 3. Envia o ARRAY filtrado para a tela, não apenas o texto
    this.exibirProdutos(categoriaSelecionada);
  }

  Excluir(id) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      // Filtra o array: mantém apenas quem tem o ID DIFERENTE do que eu cliquei
      this.arrayInven = this.arrayInven.filter((prod) => prod.idProdut !== id);

      // Atualiza a tela com o novo array (já sem o item)
      this.exibirProdutos(this.arrayInven);
    }
  }

  Editar(id) {
    // 1. Localiza o produto no array pelo ID
    let produto = this.arrayInven.find((p) => p.idProdut === id);

    if (produto) {
      this.editId = id; // Guarda o ID para saber quem salvar depois

      // 2. Preenche os inputs do MODAL com os dados atuais
      document.getElementById("editNome").value = produto.nomeProdut;
      document.getElementById("editValor").value = produto.valorProdut;
      document.getElementById("editQuantidade").value =
        produto.quantidadeProdut;
      document.getElementById("editCategoria").value = produto.categoriaProdut;

      // 3. Mostra o modal na tela
      document.getElementById("modalEdicao").style.display = "block";
    }
  }

  SalvarEdicao() {
    // 1. Pega os valores novos que o usuário digitou no modal
    let novoNome = document.getElementById("editNome").value;
    let novoValor = document.getElementById("editValor").value;
    let novaQtd = document.getElementById("editQuantidade").value;
    let novaCat = document.getElementById("editCategoria").value;

    // 2. Procura o produto no array original e atualiza os dados
    for (let i = 0; i < this.arrayInven.length; i++) {
      if (this.arrayInven[i].idProdut === this.editId) {
        this.arrayInven[i].nomeProdut = novoNome;
        this.arrayInven[i].valorProdut = novoValor;
        this.arrayInven[i].quantidadeProdut = novaQtd;
        this.arrayInven[i].categoriaProdut = novaCat;
      }
    }

    // 3. Fecha o modal e atualiza a exibição
    this.FecharModalEdicao();
    this.exibirProdutos(this.arrayInven);
  }

  FecharModalEdicao() {
    document.getElementById("modalEdicao").style.display = "none";
    this.editId = null;
  }
}
let produtos = new Produtos();
