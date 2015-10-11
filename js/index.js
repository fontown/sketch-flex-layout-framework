//vars and conf
var currentClass = '';
var noRepeat = false;

var zero    = '0';
var simple  = 1;
var single  = 16;
var double  = single * 2;
var middle  = single / 2;
var medium  = single * 4;
var big     = single * 8;

var confFixed = {
  'flex': {
    'width': ['1', '2'],
    'all' : [zero, single, double, middle, medium],
    'attr': {
      'margin' : ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
      'padding' : ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
      'rotate': {
        'alignItems': ['center'],
        'justifyContent': ['center', 'space-around', 'space-between'],
        'flexDirection': ['row']
      },
      'fixed': {
        'margin': {
          'marginRight':[zero, simple, single, double, middle, medium, big],
          'marginLeft':[zero],
          'marginBottom': [zero, simple, single, double, middle, medium, big],
          'marginTop': [zero],
          'margin': [simple, single, double, middle, medium]
        },
        'padding': {
          'padding': [zero, simple, single, double, middle, medium, big],
          'paddingTop': [zero],
          'paddingBottom': [zero, simple, single, double, middle, medium, big]
        },
        'position': {
          'left': [single, double],
          'right': [single, double],
          'top': [single, double],
          'bottom': [single, double]
        }
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


function returnNameVars(name) {
  switch(name) {
    case simple:
        return 'simple';
        break;
    case single:
        return 'single';
        break;
     case middle:
        return 'middle';
        break;
     case big:
        return 'big';
        break;
      case medium:
        return 'medium';
        break;
      case double:
        return 'double';
        break;
    default:
       return 'zero';
  }
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
  var count = 0;
  var keyIn = ( key == 'margin' ) ? confFixed.flex.attr.margin : confFixed.flex.attr.padding;
  var attrZeros = '';
  var attrZeroAll = '';
  var classNameAttrZeros = '';
    
  for (; confFixed.flex.all[count];) {
    if ( returnNameVars(confFixed.flex.all[count]) != returnNameVars(measure) ) {
      $.each(keyIn, function(key, value) { 
        attrZeros = '<br \>.all' + toTitleCase(returnNameVars(measure)) + resumeClassName(value) + toTitleCase(returnNameVars(confFixed.flex.all[count])) + '{';
        $.each(keyIn, function(key1, value1) {
          if ( value != value1)
            attrZeros +=  value1 + ':' + measure + '; ';
        });

        attrZeros += value + ':'+  confFixed.flex.all[count] + ';}';
        attrZeroAll += attrZeros;

      });
    }
    count++;
  }
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
                    
          if ( classFixed == 'top' || classFixed == 'left' || classFixed == 'right' || classFixed == 'bottom') {
            classNameOutFlex  = '.' + classWidth + toTitleCase(classRotateKey) + toTitleCase(classRotateValue.replace('-', '')) + classFixedSimple + toTitleCase(returnNameVars(objetive[i])) + '\n{\n';
            classContentFlex  = '\t position:absolute;' + classKey + ':' + classWidth + ';\n' + '\t' + classRotateKey + ':' + classRotateValue + ';\n' + '\t' + classFixed + ':' + objetive[i] + ';\n' + '\n}\n';
          } else {
            classNameOutFlex  = '.' + classWidth + toTitleCase(classRotateKey) + toTitleCase(classRotateValue.replace('-', '')) + classFixedSimple + toTitleCase(returnNameVars(objetive[i])) + '\n{\n';
            classContentFlex  = '\t' + classKey + ':' + classWidth + ';\n' + '\t' + classRotateKey + ':' + classRotateValue + ';\n' + '\t' + classFixed + ':' + objetive[i] + ';\n' + '\n}\n';
          }          
          
          
          if ( classFixed == 'top' || classFixed == 'left' || classFixed == 'right' || classFixed == 'bottom') {
            classNameOut      = '<br\>.' + classRotateKey.toLowerCase() + toTitleCase(classRotateValue.replace('-', '')) + classFixedSimple + toTitleCase(returnNameVars(objetive[i])) + '\n{\n';
            classContent      = '\t position:absolute;' + classRotateKey + ':' + classRotateValue + ';\n' + '\t' + classFixed + ':' + objetive[i] + ';\n' + '\n}\n';
          } else {
            classNameOut      = '<br\>.' + classRotateKey.toLowerCase() + toTitleCase(classRotateValue.replace('-', '')) + classFixedSimple + toTitleCase(returnNameVars(objetive[i])) + '\n{\n';
            classContent      = '\t' + classRotateKey + ':' + classRotateValue + ';\n' + '\t' + classFixed + ':' + objetive[i] + ';\n' + '\n}\n';
          }
          
          if ( currentClass != classFixed + toTitleCase(returnNameVars(objetive[i])) ) {
            cssFixedSimple        = '<br\>.' + classFixedSimple + toTitleCase(returnNameVars(objetive[i])) + '\n{\n';
            if ( classFixed == 'top' || classFixed == 'left' || classFixed == 'right' || classFixed == 'bottom') {
               cssContentFixedSimple = '\t position:absolute; ' + classFixed + ':' + objetive[i] + ';\n' + '\n}\n';           
            } else {
              cssContentFixedSimple = '\t' + classFixed + ':' + objetive[i] + ';\n' + '\n}\n';            
            }
            
            if ( classFixed == 'margin' || classFixed == 'padding') {
              cssOutFixedSimple = cssFixedSimple + cssContentFixedSimple + basicZeros(objetive[i], classFixed);
              noRepeat = true;
            } else {
              cssOutFixedSimple = cssFixedSimple + cssContentFixedSimple;
            }
          }
           
          cssOutFlex        = classNameOutFlex + classContentFlex;
          cssOut            = classNameOut + classContent;
          
          cssAll = ( currentClass != classFixed + toTitleCase(returnNameVars(objetive[i])) ) ? cssOutFlex + cssOut + cssOutFixedSimple : cssOutFlex + cssOut;
          
          print('.result', cssAll);
          
          currentClass = classFixed + toTitleCase(returnNameVars(objetive[i]));
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