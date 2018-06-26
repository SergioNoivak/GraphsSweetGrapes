



     function inicialize_single_source(GrafoTeorico)
     {
        $.each(GrafoTeorico.vetor, function(index, value) {
            
            value.d =Number.MAX_VALUE;
            value.pi = undefined;
        });

        GrafoTeorico.vetor[parseInt(GrafoTeorico.noInicio)].d = 0;
        
}



    function fill_queue(GrafoTeorico){
        
        var queue = [];
        $.each(GrafoTeorico.vetor, function(index, value) {
            queue.push(value);
        });


        return queue.sort((ele1,ele2)=>{return ele1.d==ele2.d? 0:(ele1.d<ele2.d? -1:+1);});

    }

    function extract_min(queue){
        queue= queue.sort((ele1,ele2)=>{return ele1.d==ele2.d? 0:(ele1.d<ele2.d? -1:+1);});
        var min = queue[0];
        queue.splice(0,1);
        return min;
    }




    function Dijkstra(GrafoTeorico){

        inicialize_single_source(GrafoTeorico);
        var queue = fill_queue(GrafoTeorico);
       
        while(queue.length>0){
        var u = extract_min(queue);
        $.each(u.Adj, function(inicio, aresta) {

            if(GrafoTeorico.vetor[aresta.noFim].d> GrafoTeorico.vetor[parseInt( u.nome)].d +aresta.peso){
                GrafoTeorico.vetor[aresta.noFim].d =GrafoTeorico.vetor[parseInt( u.nome)].d +aresta.peso;
                GrafoTeorico.vetor[aresta.noFim].pi = parseInt( u.nome);
            }

        
        });

        
        
    }
    }





    function DFS(GrafoTeorico){

        inicialize_single_source(GrafoTeorico);
        let contadorDescobertas =0;
        let piCorrente = undefined;
        let stack =[];
        let descoberto ={};
    
        $.each(GrafoTeorico.vetor, function(key, value) {
        
            descoberto[parseInt(key)]=false;

        
        });
    
    
        stack.push(GrafoTeorico.noInicio);
    
        
        while(stack.length!=0){
                console.log('stack'+stack)
            let v = stack[stack.length-1];
            stack.splice(stack.length-1,1);
            contadorDescobertas++;
            GrafoTeorico.vetor[v].d = contadorDescobertas;
            

            if(!descoberto[v]){
                
                descoberto[v] =true;

                $.each(GrafoTeorico.vetor[v].Adj, (inicio)=>{
                    
                    if(!descoberto[inicio]){
                    stack.push(parseInt(inicio))
                    GrafoTeorico.vetor[inicio].pi =v;
                }
            });   
        }
            
        }
    

    
    
    



    }


    function decidirCor(indice,valor,GrafoTeorico,coresJaCriadas){

        var coresDaVizinhanca = [];

        $.each(GrafoTeorico.vetor[indice].Adj, (noFim,b)=>{

            if(GrafoTeorico.vetor[noFim].cor!=-1)
                if(!coresDaVizinhanca.includes(GrafoTeorico.vetor[noFim].cor))
                coresDaVizinhanca.push(GrafoTeorico.vetor[noFim].cor);
        });

        if(coresJaCriadas.length == coresDaVizinhanca.length){

            GrafoTeorico.vetor[indice].cor = coresJaCriadas.length+1;
            coresJaCriadas.push(coresJaCriadas.length+1);
            return;
        }


        for(var i=0 ; i<coresJaCriadas.length ; i++){
                if(!(coresDaVizinhanca.includes(coresJaCriadas[i]))){
                    var corEscolhida = coresJaCriadas[i];
                    GrafoTeorico.vetor[indice].cor = corEscolhida;
                    return;
                }

            }
    }




    function colorir(indice,valor,GrafoTeorico,coresJaCriadas)
    {

        if(coresJaCriadas.length==0){
            coresJaCriadas.push(coresJaCriadas.length+1);
            GrafoTeorico.vetor[indice].cor = coresJaCriadas.length;
            return;
        }

        decidirCor(indice,valor,GrafoTeorico,coresJaCriadas)
    }



    function ColoracaoGulosa(GrafoTeorico){


        var coresJaCriadas = [];
        $.each(GrafoTeorico.vetor, (indice, valor)=>{
       
            valor.cor = -1;
       
        });
        
        $.each(GrafoTeorico.vetor, (indice, valor)=>{

            colorir(indice,valor,GrafoTeorico,coresJaCriadas);

        });

        GrafoTeorico.cores = coresJaCriadas;
    }