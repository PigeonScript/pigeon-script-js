// New one by SilversApprentice
var stack = [],

utils = {

  pop : function() {

    if (stack.length) {

      return utils.tryNum(stack.pop());

    } else {

      return utils.tryNum(prompt('Input value:'));

    }

  },

  tryNum : function(value) {

    if (isNaN(Number(value))) {

      return value;

    } else {

      return Number(value);

    }

  }

},

math = {

  add : function() {

    with (utils) {

     if (stack.length == 1) {

        stack.push(pop() * 2);

      } else {

        stack.push(pop() + pop());

      }

    }

  },

  sub : function() {

    with (utils) {

      if (stack.length == 1) {

        stack.push(-1 * pop());

      } else {

        stack.push(-1 * (pop() - pop()));

      }

    }

  },

  mult : function() {

    with (utils) {

      if (stack.length == 1) {

        stack.push(Math.pow(pop(), 2));

      } else {

        stack.push(pop() * pop());

      }

    }

  },

  div : function() {

    with (utils) {

      if (stack.length == 1) {

        stack.push(1 / pop());

      } else {

        stack.push(1 / pop() / pop());

      }

    }

  },

  fact : function() {

    with (utils) {

      let n = pop();

      for (let i = n; i >= 1; i--) {

        n *= i;

      }

      stack.push(n);

    }

  },

  exp : function() {

    with (utils) {

      if (stack.length == 1) {

        let a = pop();

        stack.push(Math.pow(a, a));

      } else {

        let a = pop(),

          b = pop();

        stack.push(Math.pow(b, a));

      }

    }

  },

  mod : function() {

    with (utils) {

      let a = pop();

        b = pop();

      stack.push(b % a);

    }

  }

},

executed = {

  '+' : math.add,

  '-' : math.sub,

  '*' : math.mult,

  '/' : math.div,

  '!' : math.fact,

  '^' : math.exp,

  '%' : math.mod

},

pushed = {

  digits : [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ,9 ]

},

parsing = {

  actions : {

    push : 'Action: Push',

    func : 'Action: Execute'

  },

  data : {

    //type : 'null',

    value : null

  },

  mode : 'standard',

  parseData : [],

  parse : function (codePiece) {

    if (codePiece in pushed.digits) {

      this.parseData.push([this.actions.push, codePiece]);

    } else if (codePiece in executed) {

      this.parseData.push([this.actions.func, executed[codePiece]]);

    }

  }

};

function run(code) {

  stack = [];

  (function Parsing_The_Code () {

    let pointer = 0;

    codePoint = function() {

      return code.charAt(pointer);

    };

    while (pointer < code.length) {

      let oldParsedLength = parsing.parseData.length;

      parsing.parse(codePoint());

      pointer++;

    }

  })();

  (function Executing_The_Code () {

    for (let i = 0; i < parsing.parseData.length; i++) {

      if (/Push/.test(parsing.parseData[i][0])) {

        stack.push(parsing.parseData[i][1]);

      } else {

        parsing.parseData[i][1]();

      }

    }

  })();

  (function Finalizing () {

    if (stack.length) {

      for (let i = 0; i < stack.length; i++) {

        console.log(stack[i]);

      }

    }

  })();

}
