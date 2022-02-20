function fErroAmostral() {
	
	var erroObjeto = document.getElementById('erroToleravelId');
	var erroAmostral = Number(erroObjeto.value);
	
	if ( erroAmostral == 0 ) {	/* empty box evaluates to 0 */
		alert("Informe o erro máximo tolerável.");
		erroObjeto.focus();

	} 
	else {

		if ( erroAmostral < 0 || erroAmostral > 100 ) { 
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

	k = 0;
	
	if ( rErroAmostralIsArray ) {
		
		/* Calcula n0 */
		var erroDecimal = rErroAmostral[1]/100;
		
		var tamanhoAmostraInicial = 1/Math.pow(erroDecimal, 2);
		var tamanhoAmostraInicial = Math.ceil(tamanhoAmostraInicial);
		
		/* Até aqui, esse é o tamanho final da amostra */
		var tamanhoAmostraFinal = tamanhoAmostraInicial;
		
		/* carrega fórmulas N0 p/ exibição */
		document.getElementById("spanN0ErroDecimal").innerHTML=erroDecimal;
		document.getElementById("spanN0tamanhoAmostra").innerHTML=tamanhoAmostraInicial;

		/* se a divMostrarFormulasN estiver exposta, esconda-a */
		if ( document.getElementById('divMostrarFormulasN').style.display == "block" ) {
			document.getElementById('divMostrarFormulasN').style.display = "none";
		}

		/* se a gerarNumero estiver exposta, esconda-a */
		if ( document.getElementById('gerarNumero').style.display == "block" ) {
			document.getElementById('gerarNumero').style.display = "none";
		}
		
		/* Se tamanho da população estiver disponível, corrija n0 */
		var tamanhoPopulacao = Number(document.getElementById('tamanhoPopulacaoId').value);

		if ( tamanhoPopulacao != 0 ) {
			
			var numerador = tamanhoPopulacao * tamanhoAmostraInicial;
			var denominador = tamanhoPopulacao + tamanhoAmostraInicial;
			
			var tamanhoAmostraCorrigido = numerador / denominador;
			
			tamanhoAmostraCorrigido = Math.ceil(tamanhoAmostraCorrigido);
			tamanhoAmostraFinal = tamanhoAmostraCorrigido;
			
			/* determina a proporção entre o tamanho da amostra e o tamanho da população */
			var porcentagemPopulacao = (tamanhoAmostraFinal / tamanhoPopulacao) * 100;
			porcentagemPopulacao = Math.round((porcentagemPopulacao + Number.EPSILON) * 100) / 100;
			
			/* exibe a porcentagem */
			document.getElementById('porcentagemPopulacaoPId').style.display = "block";
			document.getElementById('porcentagemPopulacaoSpanId').innerHTML = porcentagemPopulacao;
			
			
			/* carrega fórmulas da correção de n0 p/ exibição */
			document.getElementById("spanN").innerHTML=tamanhoPopulacao;
			document.getElementById("spanN2").innerHTML=tamanhoPopulacao;
			document.getElementById("spanTamanhoAmostraInicial").innerHTML=tamanhoAmostraInicial;
			document.getElementById("spanTamanhoAmostraInicial2").innerHTML=tamanhoAmostraInicial;
			document.getElementById("spanTamanhoAmostraCorrigido").innerHTML=tamanhoAmostraCorrigido;

			/* se a divMostrarFormulasN estiver escondida, mostre-a */
			if ( document.getElementById('divMostrarFormulasN0').style.display == "block" && document.getElementById('divMostrarFormulasN').style.display == "none" ) {
				document.getElementById('divMostrarFormulasN').style.display = "block";
			}
			


			k = 1;
		}

		document.getElementById('divTamanhoAmostraOutput').style.display='block';
		document.getElementById('tamanhoAmostraOutput').style.display='block';

		/* span */
		document.getElementById('tamanhoAmostra').innerHTML = tamanhoAmostraFinal;
		
		if ( document.getElementById('divBotaoEsconderFormulasId').style.display == "none" ) {
			document.getElementById("divBotaoMostrarFormulasId").style.display="block";
		}

		if ( tamanhoPopulacao == 0 ) {
			/* se o tamanho da amostra for desconhecido, esconda o parágrafo 'porcentagemPopulacaoPId' */
			document.getElementById("porcentagemPopulacaoPId").style.display="none";
		}
		
		
		return [k, tamanhoAmostraFinal, tamanhoPopulacao, erroDecimal, tamanhoAmostraInicial];
	}

	
	
}

function fAleatoria() {
	
	var rTamanhoAmostra;
	var rTamanhoAmostra = fTamanhoAmostra();
		
	if ( rTamanhoAmostra[0] == 1 ) {
		
		
		document.getElementById('gerarNumero').style.display='block';
		document.getElementById('divListaAleatorios').style.display='none';
		
	}
	

	

}

function fMostrarFormulas() {

	/* botões */
	document.getElementById("divBotaoMostrarFormulasId").style.display = "none";
	document.getElementById("divBotaoEsconderFormulasId").style.display="block";
	
	/* fórmulas */
	/* n0 */
	document.getElementById('divMostrarFormulasN0').style.display="block";
	document.getElementById("spanN0ErroDecimal").style.display="inline-block";
	

	
	if ( document.getElementById('tamanhoPopulacaoId').value != 0 ) {
		
		document.getElementById('porcentagemPopulacaoPId').style.display='block';
		
		document.getElementById('divMostrarFormulasN').style.display="block";
		document.getElementById("spanN").style.display="inline-block";
		document.getElementById("spanN2").style.display="inline-block";
		document.getElementById("spanTamanhoAmostraInicial").style.display="inline-block";
		document.getElementById("spanTamanhoAmostraInicial2").style.display="inline-block";
		document.getElementById("spanTamanhoAmostraCorrigido").style.display="inline-block";

		
	}



}

function fEsconderFormulas() {


	document.getElementById("divMostrarFormulasN0").style.display="none";
	document.getElementById("divMostrarFormulasN").style.display="none";
	// document.getElementById('porcentagemPopulacaoPId').style.display='block';

	
	// document.getElementById("botaoMostrarFormulasId").style.display="inline-block";

	document.getElementById("divBotaoMostrarFormulasId").style.display="block";
	document.getElementById("divBotaoEsconderFormulasId").style.display="none";




	


}

function fRedefinir() {

	var erroObjeto = document.getElementById('erroToleravelId');
	erroObjeto.value="";
	erroObjeto.focus();

	var tamanhoPopulacaoObjeto = document.getElementById('tamanhoPopulacaoId');
	tamanhoPopulacaoObjeto.value="";

	document.getElementById('tamanhoAmostraOutput').style.display='none';
	document.getElementById('divTamanhoAmostraOutput').style.display='none';
	document.getElementById('gerarNumero').style.display='none';
	document.getElementById('divListaAleatorios').style.display='none';

	document.getElementById("divMostrarFormulasN0").style.display="none";
	document.getElementById("divMostrarFormulasN").style.display="none";
	document.getElementById("porcentagemPopulacaoPId").style.display="none";

	document.getElementById("divBotaoEsconderFormulasId").style.display="none";



}



function fGerarNumeros() {

	var rTamanhoAmostra;
	rTamanhoAmostra = fTamanhoAmostra();

	var tamanhoAmostra;
	tamanhoAmostra = rTamanhoAmostra[1];

	var tamanhoPopulacao;
	tamanhoPopulacao = rTamanhoAmostra[2];

	const listaAmostras = [];
	var n;
	var i;
	var k;

	document.getElementById('gerarNumero').style.display = "block";

	while ( listaAmostras.length < tamanhoAmostra ) {

		n = Math.floor( Math.random() * tamanhoPopulacao ) + 1;

		if ( listaAmostras.length == 0 ) {

			listaAmostras.push(n);
		}
		else {

			i = 0;
			k = 0;
			while ( i < listaAmostras.length ) {

				if ( n == listaAmostras[i] ) {

					k = 1;
					break;
				}

				i++;
			}

			if ( k == 0 ) {

				listaAmostras.push(n);
			}
		}
	}

	listaAmostras.sort(function(a, b){return a-b});

	document.getElementById('divListaAleatorios').style.display='block'

	// lista de números aleatórios 
	var list;
	var listItem;

	list = document.getElementById('listaAleatorios');
	
	// limpa child nodes
	while ( list.hasChildNodes() ) {
		list.removeChild(list.firstChild);
	}

	// carrega lista
	for ( i = 0; i < listaAmostras.length; ++i ) {

		listItem = document.createElement('li');
		listItem.innerHTML = listaAmostras[i];
		list.appendChild(listItem);
	}

}

function tableToCSV() {

	var csv_data = [];

	list = document.getElementById('listaAleatorios');
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
	temp_link.download = "lista-aleatoria.csv";
	var url = window.URL.createObjectURL(CSVFile);
	temp_link.href = url;

	// This link should not be displayed
	temp_link.style.display = "none";
	document.body.appendChild(temp_link);

	// Automatically click the link to trigger download
	temp_link.click();
	document.body.removeChild(temp_link);
}