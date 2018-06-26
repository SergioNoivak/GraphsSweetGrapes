fetch('cy-style.json', {
    mode: 'no-cors'
  })
  .then(function (res) {
    return res.json()
  })
  .then(function (style) {

    var cy = window.cy = cytoscape({
      container: document.getElementById('cy'),

      boxSelectionEnabled: false,
      autounselectify: true,

      layout: {
        name: 'grid',
        cols: 3

      },

      style: style,

      elements: []
    });


    var configuracoesDeCriacao = {
      point: {
        first: -1,
        second: -1
      },
      contador: 0,
      estaEmUmNo: false,
      passivelDeSerFeitoAresta: false,
      passivelDeEscolherOutroNo: false,
      estaEmUmaAresta: false,
      noAnterior: undefined,
      paridadeNoAnterior: 0
    };





    cy.on("tap", evt => {

      if (!configuracoesDeCriacao.estaEmUmNo)
        desenharNo(evt, configuracoesDeCriacao, cy);

        configuracoesDeCriacao.paridadeNoAnterior=0;




    });





    let botaoRemoverNo = document.getElementById("botaoRemoverNo");
    let botaoAdicionarPeso = document.getElementById('botaoAdicionarPeso');
    let botaoExecutar = document.getElementById('botaoExecutar');
    let botaoRemoverAresta = document.getElementById('botaoRemoverAresta');

    
    let inputNoRemover = document.getElementById("noRemover");
    let inputInicioDijkstra = document.getElementById("InicioDjikstra");




    
          var opcoesDeAlgoritmo = {
            Dijkstra: 1,
            DFS: 2,
            Coloracao:3
          }



    botaoExecutar.addEventListener("click", evt => {

      if(cy.nodes().size()==0)
        return;

      var opcaoDeAlgoritmo = -1;
      cy.edges().map(edge => {

        edge.style({
          'line-color': '#ccc'
          
        })
      })
 
 
 
 
      switch (parseInt($('#algoritmo').val())) {

        case opcoesDeAlgoritmo.Dijkstra:
          AlgoritmoDijkstraInterface(inputInicioDijkstra, cy);
          break;

          case opcoesDeAlgoritmo.DFS:
          AlgoritmoDFSInterface(inputInicioDijkstra, cy);
          break;

          case 3:
          AlgoritmoColoracaoInterface(inputInicioDijkstra,cy);
          break;

      }








    })



    $("#algoritmo").change(function () {
      if($('option:selected').val()==opcoesDeAlgoritmo.Coloracao){


        $("#FormDijs").hide();
  

      }

      else{

        $("#FormDijs").show();

          }



      
  });
   

    botaoRemoverNo.addEventListener("click", evt => {

      var inteiroNoRemover = inputNoRemover.value;
      var collection = cy.elements("node[label=" + inteiroNoRemover + "]");
      cy.remove(collection)
    })


    var geradorDeAresta = {
      contadorParidade: 0,
      idNoInicio: '',
      idNoFim: ''
    };


    botaoAdicionarPeso.addEventListener("click", evt => {
      var valor_noInicio = document.getElementById("noInicio").value;
      var valor_noFim = document.getElementById("noFim").value;
      var valor_peso = document.getElementById("peso").value;

      let NoInicio = cy.collection("node[label=" + valor_noInicio + "]")[0];
      let NoFim = cy.collection("node[label=" + valor_noFim + "]")[0];

      var arestaNova = NoInicio.edgesTo(NoFim)[0];
      NoInicio.edgesTo(NoFim).map(ele => {
        ele.data("label", valor_peso);
      })


    });


    botaoRemoverAresta.addEventListener("click", evt => {
      var valor_noInicio = document.getElementById("noInicio").value;
      var valor_noFim = document.getElementById("noFim").value;
      var valor_peso = document.getElementById("peso").value;
  
      let NoInicio = cy.collection("node[label=" + valor_noInicio + "]")[0];
      let NoFim = cy.collection("node[label=" + valor_noFim + "]")[0];
  
      var arestaNova = NoInicio.edgesTo(NoFim)[0];
      NoInicio.edgesTo(NoFim).map(ele => {
        ele.remove();
        configuracoesDeCriacao.estaEmUmNo=false;
      })
  
  
    });
  





  });


