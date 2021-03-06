/**
 * Copyright (c) Apache License 2016 awk888
 **/

// The patterns for the JavaScript code.
var find_function = /var|function|return|new|for/g;
var find_string = /\"([^\"]+)\"|\'([^\']+)\'/g;
var find_parameter = /\(([^\(]+)\(/g;
var find_keyword = /this|RegExp|Object|prototype|true|false|document|Date|undefined|null|Array|Math|JSON|try|default|break|throw|NaN/g;
var find_operator = /^\s*(?:\+|\-|\*|\\)/g;
var find_comment = /^\/\//g;
var find_number = /^\s*(?:-?\d+(?:\.\d+)?)\b/g;

// The patterns for the HTML code.
var find_html = /<\s+[^>]+>/g;
var find_html_attr = /style|class|id|type|name|placeHolder|ng-app|ng-repeat|ng-src|ng-app-data|ng-[^n]|ng-app-[^n]|ng-app-data-[^n]/g;
var find_html_string = find_string;

// The patterns for Python code.
var find_PY_function = /from|inport|print|def|pass|in|function/g;
var find_PY_comment = /\#+[^#]/g;
var find_PY_string = find_string;
var find_PY_operator = /\+|\%|\=|\-|\*/g;
var find_PY_number = find_number;

// The main highlighting function.
var highlight = function(string, codeType) {
    this.ct = codeType || "HTML";
    
    switch(this.ct){
        // This only runs if the codeType is "JavaScript".
        case "JavaScript":
            string = string.replace(find_function, "<span class='fn'>$&</span>"); // Finds all the functions.
            string = string.replace(find_string, "<span class='st'>$&</span>"); // Finds all the strings.
            string = string.replace(find_keyword, "<span class='kw'>$&</span>"); // Finds all the key words.
            string = string.replace(find_operator, "<span class='op'>$&</span>"); // Finds all the operators.
            string = string.replace(find_comment, "<span class='cm'>$&</span>"); // Finds all the comments.
            string = string.replace(find_number, "<span class='pr'>$&</span>"); // Finds all the numbers.
        break;
        
        // This only runs if the codeType is "HTML".
        case "HTML":
            string = string.replace(find_html, "<span class='html-tag'>$&</span>"); // Finds all the tags.
            string = string.replace(find_html_attr, "<span class='html-attr'>$&</span>"); // Finds all the attrs.
            string = string.replace(find_html_string, "<span class='string'>$&</span>"); // Finds all the strings.
        break;
        
        // This only runs if the codeType is "Python".
        case "Python":
            string = string.replace(find_PY_function, "<span class='function'>$&</span>"); // Finds all the functions.
            string = string.replace(find_PY_string, "<span class='string'>$&</span>"); // Finds all the strings.
            string = string.replace(find_PY_operator, "<span class='operator'>$&</sapn>"); // Find all the operators.
            string = string.replace(find_PY_number, "<span class'number'>$&</span>"); // Finds all the numbers.
        break;
     }
            
    return string;
};

// Only works with jQuery.
var createCode = function(string, type, place, codeType) {
    this.str = string || 'Put code here.';
    this.type = type || 'code';
    this.place = place || 'body';
    this.CT = codeType || 'JavaScript';
    
    $('<' + this.type + '>').html(highlight(this.str, this.CT)).addClass('code').appendTo(this.place);
};

creatCode();
