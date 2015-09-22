var i, u = 0;

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

//Iteration for json
function recorrerObj(objetive, key) {
  classFixed = key;
  for (; objetive[i];) {
    $.each(confFixed.flex.width, function(keyWidth, valueWidth) {
      $.each(confFixed.flex.attr.rotate, function(keyRotate, valueRotate) {
        for (; valueRotate[u];) {
          classKey = Object.keys(confFixed)[0];
          classWidth = keyWidth + 1;
          classRotateKey = keyRotate;
          classRotateValue = valueRotate[u];
          classNameOutFlex = '.' + classKey + classWidth + toTitleCase(classRotateKey) + toTitleCase(classRotateValue.replace('-', '')) + toTitleCase(classFixed) + toTitleCase(objetive[i]) + '\n { \n';
          classContentFlex = '\t' + classKey + ' : ' + classWidth + ';\n' + '\t' + classRotateKey + ' : ' + classRotateValue + ';\n' + '\t' + classFixed + ' : $' + objetive[i] + ';\n' + '\n } \n';
          classNameOut = '<br\>.' + classRotateKey.toLowerCase() + toTitleCase(classRotateValue.replace('-', '')) + toTitleCase(classFixed) + toTitleCase(objetive[i]) + '\n { \n';
          classContent = '\t' + classRotateKey + ' : ' + classRotateValue + ';\n' + '\t' + classFixed + ' : $' + objetive[i] + ';\n' + '\n } \n';
          cssOutFlex = classNameOutFlex + classContentFlex;
          cssOut = classNameOut + classContent;
          print('.result', cssOutFlex + cssOut);
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

var confFixed = {
  'flex': {
    'width': ['1', '2'],
    'attr': {
      'rotate': {
        'justifyContent': ['center'],
        'alignContent': ['center'],
        'flexDirection': ['row']
      },
      'fixed': {
        'margin': {
          'marginRight': ['middle'],
          'marginLeft': ['middle'],
          'marginTop': ['single', 'middle']
        },
        'padding': {
          'padding': ['middle', 'single']
        },
      }
    }
  }
}

contructor();