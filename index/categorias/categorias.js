const transacoes = [
    { categoria: "Alimentação", valor: 50 },
    { categoria: "Transporte", valor: 20 },
    { categoria: "Moradia", valor: 800 },
    { categoria: "Saúde", valor: 100 },
    { categoria: "Educação", valor: 200 },
    { categoria: "Lazer", valor: 150 },
    { categoria: "Outros", valor: 75},
    { categoria: "Alimentação", valor: 30 },
    { categoria: "Transporte", valor: 10},
    { categoria: "Moradia", valor: 1200 },
    { categoria: "Saúde", valor: 50 },
    { categoria: "Educação", valor: 100 },
    { categoria: "Lazer", valor: 50 },
    { categoria: "Outros", valor: 25},
  ];
  
  // Adiciona o valor de cada transação à categoria correspondente na tabela
  transacoes.forEach((transacao) => {
    switch (transacao.categoria) {
      case "Alimentação":
        document.getElementById("alimentacao-total").innerText =
          parseFloat(document.getElementById("alimentacao-total").innerText) +
          transacao.valor;
        break;
      case "Transporte":
        document.getElementById("transporte-total").innerText =
          parseFloat(document.getElementById("transporte-total").innerText) +
          transacao.valor;
        break;
      case "Moradia":
        document.getElementById("moradia-total").innerText =
          parseFloat(document.getElementById("moradia-total").innerText) +
          transacao.valor;
        break;
      case "Saúde":
        document.getElementById("saude-total").innerText =
          parseFloat(document.getElementById("saude-total").innerText) +
          transacao.valor;
        break;
      case "Educação":
        document.getElementById("educacao-total").innerText =
          parseFloat(document.getElementById("educacao-total").innerText) +
          transacao.valor;
        break;
      case "Lazer":
        document.getElementById("lazer-total").innerText =
          parseFloat(document.getElementById("lazer-total").innerText) +
          transacao.valor;
        break;
      case "Outros":
        document.getElementById("outros-total").innerText =
          parseFloat(document.getElementById("outros-total").innerText) +
          transacao.valor;
        break;
      default:
        break;
    }
  });