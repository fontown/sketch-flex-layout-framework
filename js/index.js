//vars and conf
var currentClass = '';

var simple  = 1;
var single  = 16;
var middle  = single / 2;
var big     = single * 2;

var confFixed = {
  'flex': {
    'width': ['1', '2'],
    'attr': {
      'margin' : ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
      'padding' : ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
      'rotate': {
        'justifyContent': ['center'],
        'flexDirection': ['row']
      },
      'fixed': {
        'margin': {
          'marginRight': [middle],
          'marginLeft': [middle],
          'marginBottom': [single, middle, big, simple],
        },
        'padding': {
          'padding': [single]
        },
      }
    }
  }
}

//Functions
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

//Append css in div
function print(divIn, cssIn) {
  $(divIn).append(cssIn + '<br\>');
}

//Iteration for lvl of a json
function recorrerJsonLevel(lvl) {
  $.each(lvl, function(key, value) {
    if (value.length) {
      if (typeof value === 'object') {
        recorrerObj(value, key);
      } else {
        console.info('string ' + value);
      }
    } else {
      $.each(lvl[key], function(key, value) {
        recorrerObj(value, key);
      });
    }
  });
};


function resumeClassName(className) {
  //working with name class in basic case, for example MR8 = marginRight:8;
  classFixedUppercaseFirstLetter  = className.charAt(0).toUpperCase() + className.slice(1);
  classFixedArray                 = classFixedUppercaseFirstLetter.split(/(?=[A-Z])/);
  classFixedSimple                = ( classFixedArray.length > 1 ) ? classFixedArray[0].charAt(0) + classFixedArray[1].charAt(0) : classFixedArray[0].charAt(0);
  return classFixedSimple;
}


function basicZeros(measure, key) {
  var i = 0;
  var keyIn = ( key == 'margin' ) ? confFixed.flex.attr.margin : confFixed.flex.attr.padding;
  var attrZeros = '';
  var attrZeroAll = '';
  var classNameAttrZeros = '';
  
  $.each(keyIn, function(key, value) {
    attrZeros = '<br \>.' + resumeClassName(value) + '0 { ';
    $.each(keyIn, function(key1, value1) {
        if ( value != value1)
          attrZeros +=  value1 + ':' + measure + '; ';
    });
  
    attrZeros += value + ':0; }';
    attrZeroAll += attrZeros;
  
  });

  return attrZeroAll;
};


//Iteration for json
function recorrerObj(objetive, key) {
  classFixed = key;

  resumeClassName(classFixed);
   
  var cssOutFixedSimple = '';
  
  var i = 0;
  
  //Now iteration for attr fixed of json
  for (; objetive[i];) {
    $.each(confFixed.flex.width, function(keyWidth, valueWidth) {
      $.each(confFixed.flex.attr.rotate, function(keyRotate, valueRotate) {
        var u = 0;
        for (; valueRotate[u];) {
            
          //Save de name and attr of css in vars for build de finish output framework
          classKey          = Object.keys(confFixed)[0];
          classWidth        = keyWidth + 1;
          classRotateKey    = keyRotate;
          classRotateValue  = valueRotate[u];
          
          classNameOutFlex  = '.' + classWidth + toTitleCase(classRotateKey) + toTitleCase(classRotateValue.replace('-', '')) + classFixedSimple + objetive[i] + '\n{\n';
          classContentFlex  = '\t' + classKey + ':' + classWidth + ';\n' + '\t' + classRotateKey + ':' + classRotateValue + ';\n' + '\t' + classFixed + ':' + objetive[i] + ';\n' + '\n}\n';
          
          classNameOut      = '<br\>.' + classRotateKey.toLowerCase() + toTitleCase(classRotateValue.replace('-', '')) + classFixedSimple + objetive[i] + '\n{\n';
          classContent      = '\t' + classRotateKey + ':' + classRotateValue + ';\n' + '\t' + classFixed + ':' + objetive[i] + ';\n' + '\n}\n';
          
          if ( currentClass != classFixed + objetive[i] ) {
            cssFixedSimple        = '<br\>.' + classFixedSimple + objetive[i] + '\n{\n';
            cssContentFixedSimple = '\t' + classFixed + ':' + objetive[i] + ';\n' + '\n}\n';
            cssOutFixedSimple = cssFixedSimple + cssContentFixedSimple;
            if ( classFixed == 'margin' || classFixed == 'padding' )
              cssOutFixedSimple = cssFixedSimple + cssContentFixedSimple + basicZeros(objetive[i], classFixed);
            else
              cssOutFixedSimple = cssFixedSimple + cssContentFixedSimple;
          }
           
          cssOutFlex        = classNameOutFlex + classContentFlex;
          cssOut            = classNameOut + classContent;
          
          cssAll = ( currentClass != classFixed + objetive[i] ) ? cssOutFlex + cssOut + cssOutFixedSimple : cssOutFlex + cssOut;
          
          print('.result', cssAll);
          
          currentClass = classFixed + objetive[i];
          u++;
        }
        u = 0;
      });
    });
    i++;
  };
  i = 0;
}

function contructor() {
  recorrerJsonLevel(confFixed.flex.attr.fixed);
}

contructor();