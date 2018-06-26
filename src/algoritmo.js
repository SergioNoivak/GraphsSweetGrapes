function exibirListaAdjacencia(GrafoTeorico) {

    $.each(GrafoTeorico.vetor, function (index, value) {
        console.log(index + " {");
        $.each(value.Adj, function (indice, valor) {
            console.log("( " + indice + " , " + valor.peso + ', ' + valor.d +","+ valor.pi+ ")");
        });
        console.log("}");
    });

}



function construirGrafoTeorico(cy, noInicio,naoDir) {

    var GrafoTeorico = {
    vetor: {},
        noInicio: {}
    }



    GrafoTeorico.noInicio = noInicio == undefined ? cy.nodes().first().data('label') : parseInt(noInicio.data('label'));

    cy.nodes().map(noDaTela => {

        var noTeorico = {
            Adj: {},
            nome: ""
        }

        var nomeNo = noDaTela.data('label');
        noTeorico.nome = parseInt(nomeNo);
        GrafoTeorico.vetor[parseInt(nomeNo)] = noTeorico;
    });


    cy.edges().map(arestaDaTela => {
        var arestaTeorica = {
            noFim: -1,
            peso: -1,
        }
        var valorSourceDaTela = parseInt(arestaDaTela.source().data('label'));
        var valorTargetDaTela = parseInt(arestaDaTela.target().data('label'));
        var valorPeso = parseFloat(arestaDaTela.data('label'));


        arestaTeorica.noFim = valorTargetDaTela;
        arestaTeorica.peso = valorPeso;

        GrafoTeorico.vetor[valorSourceDaTela].Adj[valorTargetDaTela] = arestaTeorica;
        if(naoDir){
            arestaTeorica.noFim = valorSourceDaTela;
            arestaTeorica.peso = valorPeso;
            GrafoTeorico.vetor[valorTargetDaTela].Adj[valorSourceDaTela] = arestaTeorica;
        }
            
    
    
    })



    return GrafoTeorico;

}




function getNoAleatorio(GrafoTeorico) {

    var vetorNos = [];
    $.each(GrafoTeorico.vetor, index => {

        vetorNos.push(parseInt(index));
    })

    var indiceSorteado = Math.ceil((Math.random() * vetorNos.length - 1) + 0);
    if (indiceSorteado < 0)
        indiceSorteado = 0;
    return vetorNos[indiceSorteado];

}

function pintarSolucao(GrafoTeorico,cy){
$.each(GrafoTeorico.vetor, function(key, value) {
    var TeoricoSource = parseInt( value.pi);
    var TeoricoTarget =  parseInt( value.nome);

    if(TeoricoSource!=undefined &&!isNaN(TeoricoSource) &&TeoricoTarget!=undefined&&!isNaN(TeoricoTarget)){

        var source = cy.nodes('[label='+TeoricoSource+']');
        var target = cy.nodes('[label='+TeoricoTarget+']');
        if(source!=undefined &&source!=NaN &&target!=undefined&&target!=NaN){


        var arestas= source.edgesTo(target);
        
        var Animacao  = arestas.animation({
          style:{'line-color':'red'},
          duration: 1000
        })
        
        Animacao.play();
        }
    }

  });
  
  
}
  



function construirTabela(GrafoTeorico,algoritmoCores) {


    if($('#tableDijkstra')!=undefined)
        $('#tableDijkstra').remove();




    $('#modal_body').prepend(`<table id="tableDijkstra" class="table table-hover">
                             
                    </table>`);
    $('#tableDijkstra').prepend(' <thead id="cabecalhoTabelaDijkstra"> </thead>');
    $('#cabecalhoTabelaDijkstra').prepend(`
        <tr id="linhaCabecalhoTabelaDijkstra">
        </tr> 
        `);


    let linhaCabecalhoTabelaDijkstra = $('#linhaCabecalhoTabelaDijkstra');
    linhaCabecalhoTabelaDijkstra.append(`
        <th scope="col">` + '#' + `</th>
        `);

    $.each(GrafoTeorico.vetor, (index, value) => {


        linhaCabecalhoTabelaDijkstra.append(`
        <th scope="col">` + index + `</th>
        `);

    });


    $('#cabecalhoTabelaDijkstra').after(`<tbody id="bodyTableDijkstra"></tbody>`);
 

    if(algoritmoCores){

        $('#bodyTableDijkstra').prepend(`<tr id="linhaCores"></tr>`);
        let linhaCores =  $('#linhaCores');
    
        linhaCores.append(`
        <th scope="col"><b>color</b></th>
        `);
        $.each(GrafoTeorico.vetor, (index, value) => {
    
    
            linhaCores.append(`
            <th scope="col">` +((value.cor==-1)?'(not discovered)' : value.cor )+ `</th>
            `);
        });

        return;



    }


    $('#bodyTableDijkstra').prepend(`<tr id="linhaD"></tr>`);
    let linhaD =  $('#linhaD');

    linhaD.append(`
    <th scope="col"><b>D</b></th>
    `);
    $.each(GrafoTeorico.vetor, (index, value) => {


        linhaD.append(`
        <th scope="col">` +((value.d==1.7976931348623157e+308)?'( not discovered)' : value.d )+ `</th>
        `);
    });

    


    $('#bodyTableDijkstra').append(`<tr id="linhaPI"></tr>`);
    let linhaPI =  $('#linhaPI');

    linhaPI.append(`
    <th scope="col"><b>PI</b></th>
    `);
    $.each(GrafoTeorico.vetor, (index, value) => {


        linhaPI.append(`
        <th scope="col">` + (value.pi==undefined? 'Nil':value.pi )+ `</th>
        `);
    });




}




function pintarSolucaoCores(cy,GrafoTeorico){

    let vetor_cores = [];

    for(var i = 0; i< GrafoTeorico.cores.length;i++ ){
            
            var corRandomica =-1;
            
            while(corRandomica==-1|| vetor_cores.includes(corRandomica) )
            corRandomica = getRandomColor();

            vetor_cores.push(corRandomica);
   
        }
    
        
        $.each(GrafoTeorico.vetor, (indice, valor)=>{



            cy.nodes("[label="+indice+"]").map(no=>{
                          
                no.style({

                    'background-color': vetor_cores[valor.cor-1],'color':'white','font-size':'24px', 'border-width': 4,'border-color': 'white'

                    

                })
    
    

            })
            
            

        });



        
}

function construirSaidaCores(GrafoTeorico,cy){



    pintarSolucaoCores(cy,GrafoTeorico);
    construirTabela(GrafoTeorico,true);



}



function prepararInterfaceDaSolucao(GrafoTeorico,cy){

    pintarSolucao(GrafoTeorico,cy);
    construirTabela(GrafoTeorico);
}



function AlgoritmoDFSInterface(inputInicioDijkstra, cy){
    var valorDijkstra=inputInicioDijkstra.value;
    if(inputInicioDijkstra.value<0)
    return;
    var noInicio =cy.nodes('[label='+valorDijkstra +']');
    var GrafoTeorico  = construirGrafoTeorico(cy,noInicio);
    DFS(GrafoTeorico);
    prepararInterfaceDaSolucao(GrafoTeorico,cy)

}


function AlgoritmoDijkstraInterface(inputInicioDijkstra,cy){

    var valorDijkstra=inputInicioDijkstra.value;
        if(inputInicioDijkstra.value<0)
        return;
        var noInicio =cy.nodes('[label='+valorDijkstra +']');
        var GrafoTeorico  = construirGrafoTeorico(cy,noInicio);
        Dijkstra(GrafoTeorico);
        prepararInterfaceDaSolucao(GrafoTeorico,cy)

}


function AlgoritmoColoracaoInterface(inputInicioDijkstra,cy){
    var valorDijkstra=inputInicioDijkstra.value;
    var noInicio =cy.nodes('[label='+valorDijkstra +']');
    var GrafoTeorico  = construirGrafoTeorico(cy,noInicio,true);
    ColoracaoGulosa(GrafoTeorico);

    construirSaidaCores(GrafoTeorico,cy)


}



