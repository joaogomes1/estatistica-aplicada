function fErroAmostral() {
	
	var erroObjeto = document.getElementById('erroToleravelId');
	var erroAmostral = Number(erroObjeto.value);
	
	if ( erroAmostral == 0 ) {	/* empty box evaluates to 0 */
		alert("Informe o erro máximo tolerável.");
		erroObjeto.focus();

	} 
	else {

		if ( erroAmostral > 100 ) { 
			alert("O erro máximo tolerável deve ser:\n\n- maior que 0;\n- menor ou igual a 100.");
	
			erroObjeto.focus();
		}
		else {
			return [0, erroAmostral];
		}
	}
	
}

function fTamanhoAmostra() {
	
	var rErroAmostral = fErroAmostral();
	var rErroAmostralIsArray = Array.isArray(rErroAmostral);
	var k;
	var tamanhoIntervalo;

	k = 0;
	
	if ( rErroAmostralIsArray ) {

		tamanhoPopulacaoObjeto = document.getElementById('tamanhoPopulacaoId');
		tamanhoPopulacaoValor = Number(tamanhoPopulacaoObjeto.value);

		/* checa se o tamanho da população foi informado */
		if ( tamanhoPopulacaoValor == 0 ) {
			alert("Informe o tamanho da população.");
			tamanhoPopulacaoObjeto.focus();
		}

		else {
			/* Calcula n0 */
			var erroDecimal = rErroAmostral[1]/100;
			
			var tamanhoAmostraInicial = 1/Math.pow(erroDecimal, 2);
			var tamanhoAmostraInicial = Math.ceil(tamanhoAmostraInicial);
			
			/* carrega fórmulas N0 p/ exibição */
			document.getElementById("spanN0ErroDecimal").innerHTML=erroDecimal;
			document.getElementById("spanN0tamanhoAmostra").innerHTML=tamanhoAmostraInicial;
			
			/* Corrige N0 */
			var numerador = tamanhoPopulacaoValor * tamanhoAmostraInicial;
			var denominador = tamanhoPopulacaoValor + tamanhoAmostraInicial;
			
			var tamanhoAmostraCorrigido = numerador / denominador;
			
			tamanhoAmostraCorrigido = Math.ceil(tamanhoAmostraCorrigido);
			var tamanhoAmostraFinal = tamanhoAmostraCorrigido;
			tamanhoIntervalo = Math.floor(tamanhoPopulacaoValor/tamanhoAmostraCorrigido);
			// alert(Math.floor(tamanhoPopulacaoValor/tamanhoAmostraCorrigido));
			// alert(tamanhoIntervalo);

			/* Exibe tamanho da amostra */
			document.getElementById('divTamanhoAmostraOutput').style.display='block';
			document.getElementById('tamanhoAmostraOutput').style.display='block';
			document.getElementById('tamanhoAmostra').innerHTML = tamanhoAmostraFinal;
			
			/* determina e exibe a proporção entre o tamanho da amostra e o tamanho da população */
			var porcentagemPopulacao = (tamanhoAmostraFinal / tamanhoPopulacaoValor) * 100;
			porcentagemPopulacao = Math.round((porcentagemPopulacao + Number.EPSILON) * 100) / 100;
			document.getElementById('porcentagemPopulacaoPId').style.display = "block";
			document.getElementById('porcentagemPopulacaoSpanId').innerHTML = porcentagemPopulacao;
			
			/* primeiro elemento */
			document.getElementById('divPrimeiroElemento').style.display='block';
			document.getElementById('divListaEscolhidos').style.display='block';
			
			/* se 'primeiroElementoId' possui dados, apague-os, p/ que o usuário informe um novo valor */
			if ( document.getElementById("primeiroElementoId").value != 0 ) {
				document.getElementById("primeiroElementoId").value == "";
			}

			document.getElementById("primeiroElementoId").focus();
			
			/* carrega fórmulas da correção de n0 p/ exibição */
			document.getElementById("spanN").innerHTML=tamanhoPopulacaoValor;
			document.getElementById("spanN2").innerHTML=tamanhoPopulacaoValor;
			document.getElementById("spanN3").innerHTML=tamanhoPopulacaoValor;
			document.getElementById("spanTamanhoAmostraInicial").innerHTML=tamanhoAmostraInicial;
			document.getElementById("spanTamanhoAmostraInicial2").innerHTML=tamanhoAmostraInicial;
			document.getElementById("spanTamanhoAmostraCorrigido").innerHTML=tamanhoAmostraCorrigido;
			document.getElementById("spanTamanhoAmostraCorrigido2").innerHTML=tamanhoAmostraCorrigido;
			document.getElementById("tamanhoAmostraId").value=tamanhoAmostraCorrigido;
			document.getElementById("spanTamanhoIntervalo").innerHTML=tamanhoIntervalo;

			/* reseta 'divListaEscolhidos' */
			// if ( document.getElementById("divListaEscolhidos").style.display=="none" ) {
			// 	document.getElementById("divListaEscolhidos").style.display="block";
			// }

		}
		
	}

}

function fBotaoAleatorio() {

	var tamanhoPopulacaoValor = Number(document.getElementById('tamanhoPopulacaoId').value);
	var erroToleravelObjeto =  document.getElementById("erroToleravelId");

	if ( erroToleravelObjeto.value == 0 ) {
		alert("Informe o erro máximo tolerável.");
		erroToleravelObjeto.focus();
	}
	else {
		if ( tamanhoPopulacaoValor == 0 ) { /* empty box evaluates to 0 */
		
		alert('Informe o tamanho da população.');
		document.getElementById('tamanhoPopulacaoId').focus();
		
		}
		else {

			n = Math.floor( Math.random() * tamanhoPopulacaoValor ) + 1;
			
			document.getElementById('primeiroElementoId').value = n;	
			
			// document.getElementById('divListaEscolhidos').style.display='block';
		}

	}
	

}

function fListaEscolhidos() {

	if ( document.getElementById("primeiroElementoId").value == 0 )	{
		alert("Informe o primeiro elemento a ser selecionado para a amostragem:");
		document.getElementById("primeiroElementoId").focus();
	}
	else {

		var tamanhoPopulacaoValor = (document.getElementById("tamanhoPopulacaoId").value);
		var primeiroElementoValor = Number(document.getElementById("primeiroElementoId").value);

		if ( primeiroElementoValor > tamanhoPopulacaoValor ) {
			alert("O primeiro elemento precisa ser:\n- maior que 0;\n- menor ou igual ao tamanho da população (" + tamanhoPopulacaoValor + ").");
			document.getElementById("primeiroElementoId").value = "";
			document.getElementById("primeiroElementoId").focus();

		}
		else {

			document.getElementById("divBotaoMostrarFormulasId").style.display="block";
		

			// let tamanhoPopulacao = Number(document.getElementById('tamanhoPopulacaoId').value);
			// let amostra = Number(document.getElementById('tamanhoAmostraId').value);
			// let pulo = tamanhoPopulacao/amostra

			// if (pulo <= 1){
			// 	pulo = 1
			// } else {
			// 	pulo = Math.floor(pulo);
			// }
			
			// document.getElementById("spanTamanhoIntervalo").innerHTML=pulo;

			// let valores = [];
			// let numeros = [];

			// for (let index = 1; index <= tamanhoPopulacao; index++)
			// 	valores.push(index);

			// pulo -= 1;
			// let j = (Number(document.getElementById("primeiroElementoId").value)-1);

			// while (valores.length > 1) {
			// 	while (j < valores.length) {
			// 		if (j > valores.length) {
			// 			j += pulo;
			// 			break;
			// 		} else {
			// 			numeros.push(valores[j]);
			// 			valores.splice(j, 1);
			// 		}
			// 		j += pulo;
			// 	}
			// 	j = j % valores.length;
			// }

			// let resultado = "";

			// for (let i = 0; i < amostra; i++)
			// 	resultado += "|" + numeros[i] + "| ";

			// let divResultado = document.getElementById("divListaEscolhidos2");
			// divResultado.innerHTML = resultado;
			

			var N = document.getElementById('tamanhoPopulacaoId').value;	
			var n = document.getElementById('tamanhoAmostraId').value;
			var k;

			k = Math.floor(N/n);

			var primeiroElemento = document.getElementById('primeiroElementoId').value;
			var pickedNumbers;
			var ac;
			var j;
			var populacao = new Array (N + 1); /* contém um elemento extra, que está "fora" da lista */
			var resultado = new Array (n);

			var i;

			/* carregar vetor */
			for ( i = 0; i < N; i++ ) {
				populacao[i] = i + 1;
			}
			populacao[i] = 9999; /* elemento extra, que está "fora" da lista */

			/* processamento */
			ac = 0;
			pickedNumbers = 0;
			j = 0;

			for ( i = primeiroElemento - 1; pickedNumbers < n; i++ ) {

				if ( populacao[i] == 9999 ) {
					i = -1;
				}
				else {
					if ( ac % k == 0 ) {
						resultado[j] = populacao[i];
						pickedNumbers++;
						j++;
					}

					ac++;
				}
			}


			// lista de números escolhidos 
			var list;
			var listItem;
			
			list = document.getElementById("listaEscolhidos");
			// limpa child nodes
			while ( list.hasChildNodes() ) {
				list.removeChild(list.firstChild);
			}
			
			// carrega lista
			for ( i = 0; i < resultado.length; ++i ) {
				
				listItem = document.createElement('li');
				listItem.innerHTML = resultado[i];
				list.appendChild(listItem);
			}

			// let divResultado = document.getElementById("divListaEscolhidos2");
			// divResultado.innerHTML = resultado;


			if ( document.getElementById("divListaEscolhidos2").style.display == "none" ) {
				document.getElementById("divListaEscolhidos2").style.display = "block";
			}

			
			
			
			
			
			
		}
	}
	
}



function tableToCSV() {

	var csv_data = [];

	list = document.getElementById('listaEscolhidos');
	list2 = list.getElementsByTagName("li");
	
	var list3 = [];
	for (var i = 0; i < list2.length; i++) {
		list3[i] = list2[i].innerHTML;
	}
	
	for (var i = 0; i < list3.length; i++) {
		csv_data[i] = list3[i];
	}
	
	// Combine each row data with new line character
	csv_data = csv_data.join('\n');
	
	// Call this function to download csv file 
	downloadCSVFile(csv_data);

}

function downloadCSVFile(csv_data) {

	// Create CSV file object and feed our csv_data into it
	CSVFile = new Blob([csv_data], {
		type: "text/csv"
	});

	// Create to temporary link to initiate download process
	var temp_link = document.createElement('a');

	// Download csv file
	temp_link.download = "lista-sistemática.csv";
	var url = window.URL.createObjectURL(CSVFile);
	temp_link.href = url;

	// This link should not be displayed
	temp_link.style.display = "none";
	document.body.appendChild(temp_link);

	// Automatically click the link to trigger download
	temp_link.click();
	document.body.removeChild(temp_link);
}

function fMostrarFormulas() {
	document.getElementById("divBotaoMostrarFormulasId").style.display = "none";
	document.getElementById("divBotaoEsconderFormulasId").style.display="block";
	document.getElementById('divMostrarFormulasN0').style.display="block";
	document.getElementById("spanN0ErroDecimal").style.display="inline-block";
	
	if ( document.getElementById('tamanhoPopulacaoId').value != 0 ) {
		document.getElementById('porcentagemPopulacaoPId').style.display='block';
		document.getElementById('divMostrarFormulasN').style.display="block";
		document.getElementById('divMostrarFormulasN1').style.display="block";
		document.getElementById("spanN").style.display="inline-block";
		document.getElementById("spanN2").style.display="inline-block";
		document.getElementById("spanTamanhoAmostraInicial").style.display="inline-block";
		document.getElementById("spanTamanhoAmostraInicial2").style.display="inline-block";
		document.getElementById("spanTamanhoAmostraCorrigido").style.display="inline-block";
		document.getElementById("spanTamanhoIntervalo").style.display="inline-block";
		
	}
}

function fEsconderFormulas() {
	document.getElementById("divMostrarFormulasN0").style.display="none";
	document.getElementById("divMostrarFormulasN").style.display="none";
	document.getElementById('divMostrarFormulasN1').style.display="none";
	document.getElementById("divBotaoMostrarFormulasId").style.display="block";
	document.getElementById("divBotaoEsconderFormulasId").style.display="none";
}


function fRedefinir() {

	var erroObjeto = document.getElementById('erroToleravelId');
	erroObjeto.value="";
	erroObjeto.focus();

	var tamanhoPopulacaoObjeto = document.getElementById('tamanhoPopulacaoId');
	tamanhoPopulacaoObjeto.value="";

	document.getElementById('divTamanhoAmostraOutput').style.display='none';
	document.getElementById("divListaEscolhidos").style.display="none";
	document.getElementById("divPrimeiroElemento").style.display="none";
	document.getElementById("divBotaoMostrarFormulasId").style.display="none";
	document.getElementById("divBotaoEsconderFormulasId").style.display="none";
	document.getElementById("primeiroElementoId").value="";
	document.getElementById("divListaEscolhidos2").style.display="none";
	
	
	document.getElementById("divMostrarFormulasN0").style.display="none";
	document.getElementById("divMostrarFormulasN1").style.display="none";
	document.getElementById("divMostrarFormulasN").style.display="none";
}
