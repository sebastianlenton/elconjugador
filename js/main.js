//El Conjugador
//Sebastian Lenton, 21/04/2013
//v0.15

/******************************
dictionaries, endings, etc
******************************/

//spanish/english regular IR infinitives
verbInfIR = new Array( [ 'abrir', 'open' ],										//abrir is a regular verb, except for an irregular past participle, abierto
					[ 'ir', 'go' ],
					[ 'escribir', 'write' ],
					[ 'vivir', 'live' ],
					[ 'decir', 'say' ]
);

//spanish/english regular AR infinitives
verbInfAR = new Array( [ 'crear', 'create' ],
					[ 'cortar', 'cut' ],
					[ 'contestar', 'answer' ],
					[ 'dar', 'give' ],
					[ 'hablar', 'speak' ]
);																					//re - what to do with ones which are slightly ambiguous, such as contestar which means "answer/respond/reply?
					
//spanish/english regular ER infinitives
verbInfER = new Array( [ 'ser', 'be' ],
					[ 'comer', 'eat' ],
					[ 'beber', 'drink' ],
					[ 'vender', 'sell' ],
					[ 'tener', 'have' ],
					[ 'poder', 'can' ]
);

//sp/eng pronouns
pronouns = new Array( 	[ 'Yo', 'I' ],										
							[ 'T&uacute;', 'You' ],
							[ '&Eacute;l', 'He' ],
							[ 'Nosotros', 'We' ],									//nosotras?
							[ 'Ellos', 'They' ]										//ellas?
																					//usted, ustedes, vosotros etc?
);

//regular spanish infinitive endings - one for each group
//IR																				//these could be contained in another array for each ending perhaps
																					//also I could probably do away with pronoun repetition
infEndingsIR = new Array( 	[ 'Yo', 'o' ],
								[ 'T&uacute;', 'es' ],
								[ '&Eacute;l', 'e' ],
								[ 'Nosotros', 'imos' ],
								[ 'Ellos', 'en' ]
);

//AR
infEndingsAR = new Array( 	[ 'Yo', 'o' ],
								[ 'T&uacute;', 'as' ],
								[ '&Eacute;l', 'a' ],
								[ 'Nosotros', 'amos' ],
								[ 'Ellos', 'an' ]
);


infEndingsER = new Array( 	[ 'Yo', 'o' ],
								[ 'T&uacute;', 'es' ],
								[ '&Eacute;l', 'e' ],
								[ 'Nosotros', 'emos' ],
								[ 'Ellos', 'en' ]
);

//irregular infinitive overrides
irregOverrides = new Array( 	
							[ 'ser',
								[ 'Yo', 'soy' ], [ 'T&uacute;', 'eres' ], [ '&Eacute;l', 'es' ], [ 'Nosotros', 'somos' ], [ 'Ellos', 'son' ]
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
							]
);

stemChangers = new Array(
	[ 'tener', 'e-ie' ],
	[ 'tener', 'o-ue' ],
	[ 'decir', 'e-i' ]
);

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
		
		for( q = 0; q < stemChangers.length; q++ ) {	//check if on stem changers list
			this.stemChangeType = stemChangers[ q ][ 1 ];
		}
	},
	getEngInf: function() {
		switch( this.ending ) {
			case "ir":
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
		
		//stem changers
		//etc
		conjugations = this.getIrregOverrides( conjugations );
		this.conjugations = conjugations;
	},
	stemChange: function( stem, pronoun ) {
		if( pronoun != 'Nosotros' && pronoun != 'Vosotros' ) {		//when Vosotros is actually introduced, this might fail. Untested.
			if( this.stemChangeType ) {
				if( this.stemChangeType == 'e-ie' ) {
					stem = stem.replace( 'e', 'ie' );
				} else if( this.stemChangeType == 'e-i' ) {
					stem = stem.replace( 'e', 'i' );
				} else if( this.stemChangeType == 'o-ue' ) {
					stem = stem.replace( 'o', 'ue' );
				}
			}
		}
		return stem;
	},
	getIrregOverrides: function( conjugations ) {
		for( i = 0; i < irregOverrides.length; i++ ) {
			if( this.spanishInf == irregOverrides[ i ][ 0 ] ) {
				for( k = 1; k < irregOverrides[ i ].length; k++ ) {
					for( j = 0; j < pronouns.length; j++ ) {
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
		for( i = 0; i < rules.length; i++ ) {
			output.push( this.stemChange( this.stem, rules[ i ][ 0 ] ) + rules[ i ][ 1 ] );
		}
		return output;
	},
	displayOutput: function() {
		var outputStr = '';
		if( this.conjugations.length > 0 ) {
			for( i = 0; i < this.conjugations.length; i++ ) {
				outputStr += '<li>' + pronouns[i][0] + ' ' + this.conjugations[i] + '</li>';
			}
			return '<ul>' + outputStr + '</ul>';
		}
		return false;
	}
}

//helpers for operation														//could do with better org here, better naming, etc
function searchDictByKey( dict, key ) {
	for(  i = 0; i < dict.length; i++ ) {
		if( key == dict[ i ][ 0 ] ) {
 			return dict[ i ][ 1 ];
		}
	}
	return false;
}

function inputBtnClick() {
	$( '.verbInput' ).on( 'submit', function( e ) {
		e.preventDefault();
		var theVerb = new Verb( getInputVerb() );
		theVerb.getStemAndEnding();
		theVerb.getEngInf();
		theVerb.getConjugation();
		displayOutput( theVerb.displayOutput() );
	} );
}

function getInputVerb() {
	return $( '.verbInput input' ).val();
}

function displayOutput( output ) {
	$( '.output' ).html( output );
}

//main!
$( document ).ready( function() {
	inputBtnClick();
} );