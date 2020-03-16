function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let ops = {
        '+': (x, y) => x + y,
        '-': (x, y) => x - y,
        '*': (x, y) => x * y,
        '/': function (x, y) {
            if (y === 0) {
                throw new Error('TypeError: Division by zero.')
            }
            return x / y
        },
    }

    let priority = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    }

    //разделятор

    let newArr = [];
    let newChar = [];

    expr = expr.split(' ').join('').split('');

    for (let char of expr) {
        if (!isNaN(char)) {
            newChar.push(char);
        } else {
            newArr.push(newChar.join(''));
            newArr.push(char);
            newChar = [];
        }
    }

    expr = newArr.concat(newChar.join(''));
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] == '') expr.splice(i, 1);
    }

    if (expr.filter(x => x == '(').length != expr.filter(x => x == ')').length) throw new Error('ExpressionError: Brackets must be paired');

    let input = [];
    let stack = [];

    //формулятор

    let isInBracket = false;
    let numOfBrackets = 0;
    if (numOfBrackets > 0) {
        isInBracket = true;
    } else {
        isInBracket = false;
    }

    for (let char of expr) {

        if (!isNaN(char)) {
            input.push(Number(char));
        } else {
            if (char == '(') {
                numOfBrackets++;
                stack.push(char);
            } else if (isInBracket == true) {
                stack.push(char);
            } else if (char == ')') {
                while (stack[stack.length - 1] != '(') {
                    input.push(stack.pop());
                }
                stack.splice(-1, 1);
                numOfBrackets--;
            } else if (isInBracket == false) {

                while (priority[char] <= priority[stack[stack.length - 1]]) {
                    input.push(stack.pop());
                }

                stack.push(char)
            }
        }

    }
    input = input.concat(stack.reverse());

    // вычислятор

    let final = [];
    for (let i = 0; i < input.length; i++) {

        if (isNaN(input[i])) {

            let ass = final.pop();
            let ass2 = final.pop();
            final.push(ops[input[i]](ass2, ass));
        } else {
            final.push(input[i])
        }
    }
    return final[0];
}

module.exports = {
    expressionCalculator
}