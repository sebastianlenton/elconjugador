//El Conjugador
//Sebastian Lenton 2013
//v0.2.2



/*


  /$$$$$$                          /$$                            /$$$$$$                                   
 /$$__  $$                        |__/                           /$$__  $$                                  
| $$  \__/  /$$$$$$  /$$$$$$/$$$$  /$$ /$$$$$$$   /$$$$$$       | $$  \__/  /$$$$$$   /$$$$$$  /$$$$$$$  /$$
| $$       /$$__  $$| $$_  $$_  $$| $$| $$__  $$ /$$__  $$      |  $$$$$$  /$$__  $$ /$$__  $$| $$__  $$|__/
| $$      | $$  \ $$| $$ \ $$ \ $$| $$| $$  \ $$| $$  \ $$       \____  $$| $$  \ $$| $$  \ $$| $$  \ $$    
| $$    $$| $$  | $$| $$ | $$ | $$| $$| $$  | $$| $$  | $$       /$$  \ $$| $$  | $$| $$  | $$| $$  | $$ /$$
|  $$$$$$/|  $$$$$$/| $$ | $$ | $$| $$| $$  | $$|  $$$$$$$      |  $$$$$$/|  $$$$$$/|  $$$$$$/| $$  | $$|__/
 \______/  \______/ |__/ |__/ |__/|__/|__/  |__/ \____  $$       \______/  \______/  \______/ |__/  |__/    
                                                 /$$  \ $$                                                  
                                                |  $$$$$$/                                                  
                                                 \______/                                                   


 - an all new, reprogrammed version of this which supports more verbs & tenses!




To-dos (current)
 - front end work needs doing

(future)
//BIG PROBLEM: DOESN'T HANDLE ACCENTED INPUT
//DOESN'T SUPPORT REFLEXIVE VERBS
//DOESN'T SUPPORT FORMAL CONJUGATION
//I NEED A BLOODY DATABASE

*/

/******************************
dictionaries of various things
******************************/

//spanish/english regular AR infinitives
//this list is ALL DONE re correct Eng endings
verbInfAR = new Array( [ 'crear', 'create' ],
					[ 'estar', 'be' ],
					[ 'cortar', 'cut' ],
					[ 'contestar', 'answer' ],
					[ 'dar', 'give' ],
					[ 'hablar', 'speak' ],
					[ 'llegar', 'arrive' ],
					[ 'pasar', 'pass' ],
					[ 'quedar', 'remain' ],
					[ 'llevar', 'bring' ],
					[ 'dejar', 'leave' ],
					[ 'encontrar', 'find' ],
					[ 'llamar', 'call' ],
					[ 'pensar', 'think' ],
					[ 'tomar', 'take' ],
					[ 'tratar', 'treat' ],
					[ 'mirar', 'watch' ],
					[ 'contar', 'count' ],
					[ 'empezar', 'start' ],
					[ 'esperar', 'hope' ],
					[ 'buscar', 'search' ],
					[ 'entrar', 'enter' ],
					[ 'trabajar', 'work' ],
					[ 'recordar', 'remember' ],
					[ 'terminar', 'finish' ],
					[ 'comenzar', 'begin' ],
					[ 'sacar', 'take out' ],
					[ 'necesitar', 'need' ],
					[ 'resultar', 'turn out' ],
					[ 'cambiar', 'change' ],
					[ 'presentar', 'present' ],
					[ 'considerar', 'consider' ],
					[ 'acabar', 'finish' ],
					[ 'ganar', 'gain' ],
					[ 'formar', 'form' ],
					[ 'aceptar', 'accept' ],
					[ 'realizar', 'achieve' ],
					[ 'lograr', 'get' ],
					[ 'explicar', 'explain' ],
					[ 'preguntar', 'ask' ],
					[ 'tocar', 'touch' ],
					[ 'estudiar', 'study' ],
					[ 'alcanzar', 'reach' ],
					[ 'utilizar', 'use' ],
					[ 'pagar', 'pay' ],
					[ 'ayudar', 'help' ],
					[ 'jugar', 'play' ],
					[ 'escuchar', 'listen' ],
					[ 'levantar', 'lift' ],
					[ 'intentar', 'try' ],
					[ 'usar', 'use' ]
);																					//re - what to do with ones which are slightly ambiguous, such as contestar which means "answer/respond/reply?
					
//spanish/english regular ER infinitives
//this list is ALL DONE re correct Eng endings
verbInfER = new Array( [ 'ser', 'be' ],
					[ 'hacer', 'do' ],
					[ 'comer', 'eat' ],
					[ 'beber', 'drink' ],
					[ 'vender', 'sell' ],
					[ 'tener', 'have' ],
					[ 'poder', 'be able' ],
					[ 'ver', 'see' ],
					[ 'saber', ' know'],
					[ 'querer', 'want'],
					[ 'deber', 'owe' ],
					[ 'poner', 'put' ],
					[ 'parecer', 'seem' ],
					[ 'creer', 'believe' ],
					[ 'volver', 'return' ],
					[ 'conocer', 'know' ],
					[ 'perder', 'lose' ],
					[ 'entender', 'understand' ],
					[ 'aparecer', 'appear' ],
					[ 'mantener', 'maintain' ],
					[ 'leer', 'read' ],
					[ 'caer', 'fall' ],
					[ 'traer', 'bring' ],
					[ 'suponer', 'suppose' ],
					[ 'comprender', 'understand' ],
					[ 'reconocer', 'recognise' ],
					[ 'nacer', 'be born' ],
					[ 'correr', 'run' ],
					[ 'ofrecer', 'offer' ]
);

//spanish/english regular IR infinitives
verbInfIR = new Array( [ 'abrir', 'open' ],
					[ 'ir', 'go' ],
					[ 'escribir', 'write' ],
					[ 'vivir', 'live' ],
					[ 'decir', 'say' ],
					[ 'seguir', 'follow' ],
					[ 'venir', 'come' ],
					[ 'salir', 'leave' ],
					[ 'sentir', 'feel' ],
					[ 'existir', 'exist' ],
					[ 'producir', 'produce' ],
					[ 'ocurrir', 'occur' ],
					[ 'pedir', 'request' ],
					[ 'recibir', 'receive' ],
					[ 'permitir', 'permit' ],
					[ 'conseguir', 'get' ],
					[ 'servir', 'serve' ],
					[ 'oir', 'hear' ],
					[ 'convertir', 'convert' ],
					[ 'partir', 'leave' ],
					[ 'morir', 'die' ],
					[ 'dirigir', 'direct' ],
					[ 'cumplir', 'fulfil' ],
					[ 'descubrir', 'discover' ]
);

//regular spanish infinitive endings - one for each group
//IR																				//these could be contained in another array for each ending perhaps
																					//also I could probably do away with pronoun repetition
infEndingsIR = new Array( 	[ 'Yo', 'o' ],
								[ 'T&uacute;', 'es' ],
								[ '&Eacute;l', 'e' ],
								[ 'Nosotros', 'imos' ],
								[ 'Vosotros', '&iacute;s' ],
								[ 'Ellos', 'en' ]
);

//AR
infEndingsAR = new Array( 	[ 'Yo', 'o' ],
								[ 'T&uacute;', 'as' ],
								[ '&Eacute;l', 'a' ],
								[ 'Nosotros', 'amos' ],
								[ 'Vosotros', '&aacute;is' ],
								[ 'Ellos', 'an' ]
);


infEndingsER = new Array( 	[ 'Yo', 'o' ],
								[ 'T&uacute;', 'es' ],
								[ '&Eacute;l', 'e' ],
								[ 'Nosotros', 'emos' ],
								[ 'Vosotros', '&eacute;is' ],
								[ 'Ellos', 'en' ]
);

//sp/eng pronouns
pronouns = new Array( 	[ 'Yo', 'I' ],										
							[ 'T&uacute;', 'You' ],
							[ '&Eacute;l', 'He/she' ],
							[ 'Nosotros', 'We' ],
							[ 'Vosotros', 'You all' ],
							[ 'Ellos', 'They' ]																					//some skipped as dupes of others
);

//irregular infinitive overrides
irregOverrides = new Array( 	
							[ 'ser',
								[ 'Yo', 'soy' ], [ 'T&uacute;', 'eres' ], [ '&Eacute;l', 'es' ], [ 'Nosotros', 'somos' ], [ 'Vosotros', 'sois' ], [ 'Ellos', 'son' ]
							],
							[ 'estar',
								[ 'Yo', 'estoy' ], [ 'T&uacute;', 'est&aacute;s' ], [ '&Eacute;l', 'est&aacute;' ], [ 'Ellos', 'est&aacute;n' ]
							],
							[ 'hacer',
								[ 'Yo', 'hago' ]
							],
							[ 'tener',
								[ 'Yo', 'tengo' ]
							],
							[ 'decir',
								[ 'Yo', 'digo' ]
							],
							[ 'ir',
								[ 'Yo', 'voy' ], [ 'T&uacute;', 'vas' ], [ '&Eacute;l', 'va' ], [ 'Nosotros', 'vamos' ], [ 'Vosotros', 'va&iacute;s' ], [ 'Ellos', 'van' ]
							],
							[ 'ver',
								[ 'Yo', 'veo' ]
							],
							[ 'dar',
								[ 'Yo', 'doy' ]
							],
							[ 'saber',
								[ 'Yo', 's&eacute;' ]
							],
							[ 'querer',
								[ 'Yo', 'quiero' ], [ 'T&uacute;', 'quieres' ], [ '&Eacute;l', 'quiere' ], [ 'Ellos', 'quieren' ]
							],
							[ 'poner',
								[ 'Yo', 'pongo' ]
							],
							[ 'parecer',
								[ 'Yo', 'parezco' ]
							],
							[ 'seguir',
								[ 'Yo', 'sigo' ]					//some of these run to a pattern
							],
							[ 'venir',
								[ 'Yo', 'vengo' ]
							],
							[ 'conseguir', 
								[ 'Yo', 'consigo' ]
							],
							[ 'salir',
								[ 'Yo', 'salgo' ]
							],
							[ 'conocer', 						//pattern with these too
								[ 'Yo', 'conozco' ]
							],
							[ 'producir', 
								[ 'Yo', 'produzco' ]
							],
							[ 'aparecer', 
								[ 'Yo', 'aparezco' ]
							],
							[ 'mantener',
								[ 'Yo', 'mantengo' ]
							],
							[ 'caer',
								[ 'Yo', 'caigo' ]
							],
							[ 'oir',
								[ 'Yo', 'oigo' ], [ 'T&uacute;', 'oyes' ], [ '&Eacute;l', 'oye' ], [ 'Ellos', 'oyen' ]
							],
							[ 'traer',
								[ 'Yo', 'traigo' ]
							],
							[ 'suponer',
								[ 'Yo', 'supongo' ]
							],
							[ 'reconocer',
								[ 'Yo', 'reconozco' ]
							],
							[ 'nacer',
								[ 'Yo', 'nazco' ]
							],
							[ 'dirigir',
								[ 'Yo', 'dirijo' ]
							],
							[ 'ofrecer',
								[ 'Yo', 'ofrezco' ]
							]
);

stemChangers = new Array(				//this could be improved as it shouldn't have to store the stem change with the verb. But, if structured like irregular overrides, it might need ridiculous for loops and things to access
	[ 'decir', 'e-i' ],
	[ 'seguir', 'e-i' ],
	[ 'pedir', 'e-i' ],
	[ 'conseguir', 'e-i'],
	[ 'servir', 'e-i' ],
	[ 'poder', 'o-ue' ],
	[ 'encontrar', 'o-ue' ],
	[ 'volver', 'o-ue' ],
	[ 'contar', 'o-ue' ],
	[ 'recordar', 'o-ue' ],
	[ 'morir', 'o-ue' ],
	[ 'sentir', 'e-ie' ],
	[ 'comenzar', 'e-ie' ],
	[ 'empezar', 'e-ie' ],
	[ 'perder', 'e-ie' ],
	[ 'tener', 'e-ie' ],
	[ 'venir', 'e-ie' ],
	[ 'pensar', 'e-ie' ],
	[ 'entender', 'e-ie' ],
	[ 'mantener', 'e-ie' ],
	[ 'convertir', 'e-ie' ],
	[ 'jugar', 'u-ue' ]
);

engEndOverrides = new Array(													//this needs finishing and implementing!
	[ 'pass',
		[ 'He/she', 'passes' ]
	],
	[ 'search',
		[ 'He/she', 'searches' ]
	],
	[ 'finish',
		[ 'He/she', 'finishes' ]
	],
	[ 'take out',
		[ 'He/she', 'takes out' ]
	],
	[ 'turn out',
		[ 'He/she', 'turns out' ]
	],
	[ 'watch',
		[ 'He/she', 'watches' ]
	],
	[ 'touch',
		[ 'He/she', 'touches' ]
	],
	[ 'study',
		[ 'He/she', 'studies' ]
	],
	[ 'reach',
		[ 'He/she', 'reaches' ]
	],
	[ 'try',
		[ 'He/she', 'tries' ]
	],
	[ 'do',
		[ 'He/she', 'does' ]
	],
	[ 'have',
		[ 'He/she', 'has' ]
	],
	[ 'be',
		[ 'I', 'am' ], [ 'You', 'are' ],[ 'He/she', 'is' ],[ 'We', 'are' ],[ 'You all', 'are' ],[ 'They', 'are' ]
	],
	[ 'be able',
		[ 'I', 'can' ], [ 'You', 'can' ],[ 'He/she', 'can' ],[ 'We', 'can' ],[ 'You all', 'can' ],[ 'They', 'can' ]
	],
	[ 'be born',
		[ 'I', 'am born' ], [ 'You', 'are born' ],[ 'He/she', 'is born' ],[ 'We', 'are born' ],[ 'You all', 'are born' ],[ 'They', 'are born' ]
	],
	[ 'go',
		[ 'He/she', 'goes' ]
	]
);

//el codigo

//verb object
function Verb( spanishInf ) {
	this.spanishInf = spanishInf;
	this.englishInf = false;
	this.ending = false,
	this.stem = false,
	this.stemChangeType = false,
	this.conjugations = false
}

Verb.prototype = {
	constructor:Verb,
	getStemAndEnding: function() {
		this.ending = this.spanishInf.substring( this.spanishInf.length - 2 );
		this.stem = this.spanishInf.substring( 0, this.spanishInf.length - 2 );
		
		for( var q = 0; q < stemChangers.length; q++ ) {	//check if on stem changers list
			if( this.spanishInf == stemChangers[ q ][ 0 ] ) {
				this.stemChangeType = stemChangers[ q ][ 1 ];
			}
		}
	},
	getEngInf: function() {
		switch( this.ending ) {
			case "ir" :
				this.englishInf = searchDictByKey( verbInfIR, this.spanishInf );
			break;
			case "er":
				this.englishInf = searchDictByKey( verbInfER, this.spanishInf );
			break;
			case "ar":
				this.englishInf = searchDictByKey( verbInfAR, this.spanishInf );
			break;
			default:
				return false;
		}
		return this.englishInf;
	},
	getConjugation: function() {
		var conjugations;
		switch( this.ending ) {
			case "ir":
				conjugations = this.conjugateStandard( infEndingsIR );
			break;
			case "er":
				conjugations = this.conjugateStandard( infEndingsER );
			break;
			case "ar":
				conjugations = this.conjugateStandard( infEndingsAR );
			break;
			default:
				return false;
		}
		
		conjugations = this.getIrregOverrides( conjugations );
		this.conjugations = conjugations;
	},
	stemChange: function( stem, pronoun ) {							//I think I could avoid doing this so many times
		if( pronoun != 'Nosotros' && pronoun != 'Vosotros' ) {
			if( this.stemChangeType ) {
				if( this.stemChangeType == 'e-ie' ) {
					if( stem.indexOf( 'e' ) != 0 ) {
						stem = stem.replace( 'e', 'ie' );
					} else {
						//cut the string down as it begins with e
						var cutDownStem = stem.substring( this.spanishInf.length - ( this.spanishInf.length - 1 ) );
						cutDownStem = cutDownStem.replace( 'e', 'ie' );
						stem = 'e' + cutDownStem;
					}
				} else if( this.stemChangeType == 'e-i' ) {
					stem = stem.replace( 'e', 'i' );
				} else if( this.stemChangeType == 'o-ue' ) {
					stem = stem.replace( 'o', 'ue' );
				} else if( this.stemChangeType == 'u-ue' ) {
					stem = stem.replace( 'u', 'ue' );
				}
			}
		}
		return stem;
	},
	getIrregOverrides: function( conjugations ) {
		for( var i = 0; i < irregOverrides.length; i++ ) {
			if( this.spanishInf == irregOverrides[ i ][ 0 ] ) {
				for( var k = 1; k < irregOverrides[ i ].length; k++ ) {
					for( var j = 0; j < pronouns.length; j++ ) {
						if( pronouns[ j ][ 0 ] == irregOverrides[ i ][ k ][ 0 ] ) {
							conjugations[ j ] = irregOverrides[ i ][ k ][ 1 ];
						}
					}	
				}
				break;
			}
		}
		return conjugations;
	},
	conjugateStandard: function( rules ) {
		var output = [];
		for( var i = 0; i < rules.length; i++ ) {
			output.push( this.stemChange( this.stem, rules[ i ][ 0 ] ) + rules[ i ][ 1 ] );
		}
		return output;
	},
	addEngEnding: function( engPronoun, engInf ) {
		var ending = this.getIrregEnding( engPronoun, engInf );
		if( ending ) {
			return ending;			
		} else {
			if( engPronoun == 'He/she' ) {
				return engInf + 's';
			} else {
				return engInf;
			}	
		}
	},
	getIrregEnding: function( engPronoun, engInf ) {
		for( var x = 0; x < engEndOverrides.length; x++  ) {
			if( engInf == engEndOverrides[ x ][ 0 ] ) {
				for( var t = 1; t < engEndOverrides[ x ].length; t++  ) {
					if( engEndOverrides[x][t][0] == engPronoun ) {
						return engEndOverrides[x][t][1];
						break;
					}
				}
			}
		}
	},
	displayOutput: function() {
		var outputStr = '';
		if( this.conjugations.length > 0 ) {
			outputStr = '<h2>' + this.spanishInf + ' - to ' + this.englishInf + '</h2>';
			for( var i = 0; i < this.conjugations.length; i++ ) {
				outputStr += '<li>' + pronouns[i][0] + ' ' + this.conjugations[i] + ' - ' + pronouns[i][1] + ' ' + this.addEngEnding( pronouns[i][1], this.englishInf ) + '</li>';
			}
			return '<ul>' + outputStr + '</ul>';
		}
		return false;
	}
}

//helpers for operation, front end, etc
function searchDictByKey( dict, key ) {
	for( var i = 0; i < dict.length; i++ ) {
		if( key == dict[ i ][ 0 ] ) {
 			return dict[ i ][ 1 ];
		}
	}
	return false;
}

function bindInputBtnClick() {
	$( '.verbInput' ).on( 'submit', function( e ) {
		e.preventDefault();
		var theVerb = getInputVerb();
		if( theVerb ) {
			theVerb = new Verb( theVerb );
			theVerb.getStemAndEnding()
			if( theVerb.getEngInf() ) {						//if there is an eng inf found
				theVerb.getConjugation();
				displayOutput( theVerb.displayOutput() );
			} else {
				displayOutput( '<p>Este verbo no est&aacute; en nuestra baso de datos.</p>' );
			}
		} else {
			displayOutput( '<p>Escriba un infinitivo del verbo, por favor.</p>' );
		}
	} );
}

function getInputVerb() {
	var input = $( '.verbInput input' ).val().trim();			//trim off whitespace
	$( '.verbInput input[type=text]' ).val( input );			//make input field be trimmed whitespace
	$( '.verbInput input[type=text]' ).focus();					//focus back, for ease of use
	if( input.length > 0 ) {
		return input;
	}
}

function displayOutput( output ) {
	$( '.output' ).html( output );
}

//main!
$( document ).ready( function() {
	bindInputBtnClick();
	$( '.verbInput input.enterVerb' ).focus();
} );